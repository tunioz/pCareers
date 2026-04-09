import { NextResponse } from 'next/server';
import { queryOne, queryAll, execute, transaction } from '@/lib/db';
import { validatePost } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import { createUniqueSlug } from '@/lib/slugify';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';
import type { Post, Tag } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const postId = parseInt(id, 10);

    if (isNaN(postId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid post ID' },
        { status: 400 }
      );
    }

    const user = await getAuthUser();
    const post = queryOne<Post>('SELECT * FROM posts WHERE id = ?', [postId]);

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Only admin can see drafts
    if (!post.is_published && !user) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    const tags = queryAll<Tag>(
      'SELECT t.name FROM tags t JOIN post_tags pt ON t.id = pt.tag_id WHERE pt.post_id = ?',
      [postId]
    );

    return NextResponse.json({
      success: true,
      data: {
        ...post,
        tags: tags.map((t) => t.name),
      },
    });
  } catch (error) {
    console.error('Get post error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const postId = parseInt(id, 10);

    if (isNaN(postId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid post ID' },
        { status: 400 }
      );
    }

    const existing = queryOne<Post>('SELECT * FROM posts WHERE id = ?', [postId]);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Re-generate slug if title changed and slug not explicitly set
    if (body.title && body.title !== existing.title && !body.slug) {
      body.slug = createUniqueSlug(body.title, (slug) => {
        const found = queryOne<Post>('SELECT id FROM posts WHERE slug = ? AND id != ?', [slug, postId]);
        return !!found;
      });
    }

    // Merge existing data with updates for validation
    const merged = {
      title: body.title ?? existing.title,
      slug: body.slug ?? existing.slug,
      content: body.content ?? existing.content,
      excerpt: body.excerpt !== undefined ? body.excerpt : existing.excerpt,
      category: body.category ?? existing.category,
      author: body.author ?? existing.author,
      author_title: body.author_title !== undefined ? body.author_title : existing.author_title,
      author_image: body.author_image !== undefined ? body.author_image : existing.author_image,
      cover_image: body.cover_image !== undefined ? body.cover_image : existing.cover_image,
      read_time: body.read_time !== undefined ? body.read_time : existing.read_time,
      is_featured: body.is_featured !== undefined ? body.is_featured : existing.is_featured,
      is_published: body.is_published !== undefined ? body.is_published : existing.is_published,
    };

    const validation = validatePost(merged);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;
    const tagIds: number[] | undefined = Array.isArray(body.tagIds) ? body.tagIds : undefined;

    transaction(() => {
      execute(
        `UPDATE posts SET
          title = ?, slug = ?, content = ?,
          excerpt = ?, category = ?, author = ?,
          author_title = ?, author_image = ?, cover_image = ?, read_time = ?,
          is_featured = ?, is_published = ?, updated_at = datetime('now')
         WHERE id = ?`,
        [
          data.title,
          data.slug,
          data.content,
          data.excerpt || null,
          data.category,
          data.author,
          data.author_title || null,
          data.author_image || null,
          data.cover_image || null,
          data.read_time || null,
          data.is_featured || 0,
          data.is_published || 0,
          postId,
        ]
      );

      // Update post_tags if provided
      if (tagIds !== undefined) {
        execute('DELETE FROM post_tags WHERE post_id = ?', [postId]);
        for (const tagId of tagIds) {
          execute(
            'INSERT OR IGNORE INTO post_tags (post_id, tag_id) VALUES (?, ?)',
            [postId, tagId]
          );
        }
      }
    });

    const updated = queryOne<Post>('SELECT * FROM posts WHERE id = ?', [postId]);
    const tags = queryAll<Tag>(
      'SELECT t.name FROM tags t JOIN post_tags pt ON t.id = pt.tag_id WHERE pt.post_id = ?',
      [postId]
    );

    logAudit({
      userId: user.userId,
      userUsername: user.username,
      action: 'update',
      entityType: 'post',
      entityId: postId,
      details: { title: updated?.title, slug: updated?.slug },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json({
      success: true,
      data: {
        ...updated,
        tags: tags.map((t) => t.name),
      },
    });
  } catch (error) {
    console.error('Update post error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const postId = parseInt(id, 10);

    if (isNaN(postId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid post ID' },
        { status: 400 }
      );
    }

    const existing = queryOne<Post>('SELECT id, title, slug FROM posts WHERE id = ?', [postId]);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // CASCADE will delete post_tags automatically
    execute('DELETE FROM posts WHERE id = ?', [postId]);

    logAudit({
      userId: user.userId,
      userUsername: user.username,
      action: 'delete',
      entityType: 'post',
      entityId: postId,
      details: { title: existing.title, slug: existing.slug },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json({
      success: true,
      data: { message: 'Post deleted successfully' },
    });
  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

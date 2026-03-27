import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute, transaction } from '@/lib/db';
import { validatePost } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import { createUniqueSlug } from '@/lib/slugify';
import type { Post, PostWithTags, Tag } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const perPage = Math.min(50, Math.max(1, parseInt(searchParams.get('perPage') || '10', 10)));
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    // Check if user is authenticated (for seeing drafts)
    const user = await getAuthUser();
    const isAdmin = !!user;

    const whereClauses: string[] = [];
    const queryParams: unknown[] = [];

    if (!isAdmin) {
      whereClauses.push('p.is_published = 1');
    }

    if (category) {
      whereClauses.push('p.category = ?');
      queryParams.push(category);
    }

    if (search) {
      whereClauses.push('(p.title LIKE ? OR p.content LIKE ?)');
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm);
    }

    if (featured === 'true' || featured === '1') {
      whereClauses.push('p.is_featured = 1');
    }

    if (tag) {
      whereClauses.push('p.id IN (SELECT pt.post_id FROM post_tags pt JOIN tags t ON pt.tag_id = t.id WHERE t.name = ?)');
      queryParams.push(tag);
    }

    const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Count total
    const countResult = queryOne<{ total: number }>(
      `SELECT COUNT(*) as total FROM posts p ${whereSQL}`,
      queryParams
    );
    const total = countResult?.total || 0;
    const totalPages = Math.ceil(total / perPage);
    const offset = (page - 1) * perPage;

    // Fetch posts
    const posts = queryAll<Post>(
      `SELECT p.* FROM posts p ${whereSQL} ORDER BY p.created_at DESC LIMIT ? OFFSET ?`,
      [...queryParams, perPage, offset]
    );

    // Fetch tags for all posts in batch
    const postsWithTags: PostWithTags[] = posts.map((post) => {
      const tags = queryAll<Tag>(
        'SELECT t.name FROM tags t JOIN post_tags pt ON t.id = pt.tag_id WHERE pt.post_id = ?',
        [post.id]
      );
      return {
        ...post,
        tags: tags.map((t) => t.name),
      };
    });

    return NextResponse.json({
      success: true,
      data: postsWithTags,
      meta: {
        page,
        perPage,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Auto-generate slug from title if not provided
    if (!body.slug && body.title) {
      body.slug = createUniqueSlug(body.title, (slug) => {
        return !!queryOne('SELECT 1 FROM posts WHERE slug = ?', [slug]);
      });
    }

    const validation = validatePost(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    // Extract tag IDs if provided
    const tagIds: number[] = Array.isArray(body.tagIds) ? body.tagIds : [];

    const result = transaction(() => {
      const insertResult = execute(
        `INSERT INTO posts (title, slug, content, excerpt, category, author, author_title, author_image, cover_image, read_time, is_featured, is_published)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        ]
      );

      const postId = insertResult.lastInsertRowid;

      // Insert post_tags
      for (const tagId of tagIds) {
        execute(
          'INSERT OR IGNORE INTO post_tags (post_id, tag_id) VALUES (?, ?)',
          [postId, tagId]
        );
      }

      return postId;
    });

    const newPost = queryOne<Post>('SELECT * FROM posts WHERE id = ?', [result]);
    const tags = queryAll<Tag>(
      'SELECT t.name FROM tags t JOIN post_tags pt ON t.id = pt.tag_id WHERE pt.post_id = ?',
      [result]
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          ...newPost,
          tags: tags.map((t) => t.name),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

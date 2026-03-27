import { NextResponse } from 'next/server';
import { queryOne, queryAll } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import type { Post, Tag } from '@/types';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const post = queryOne<Post>('SELECT * FROM posts WHERE slug = ?', [slug]);

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Only admin can see drafts
    if (!post.is_published) {
      const user = await getAuthUser();
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Post not found' },
          { status: 404 }
        );
      }
    }

    const tags = queryAll<Tag>(
      'SELECT t.name FROM tags t JOIN post_tags pt ON t.id = pt.tag_id WHERE pt.post_id = ?',
      [post.id]
    );

    return NextResponse.json({
      success: true,
      data: {
        ...post,
        tags: tags.map((t) => t.name),
      },
    });
  } catch (error) {
    console.error('Get post by slug error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

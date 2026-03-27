import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import type { TagWithCount, Tag } from '@/types';

export async function GET() {
  try {
    const tags = queryAll<TagWithCount>(
      `SELECT t.*, IFNULL(pt_count.cnt, 0) as post_count
       FROM tags t
       LEFT JOIN (
         SELECT tag_id, COUNT(*) as cnt
         FROM post_tags
         GROUP BY tag_id
       ) pt_count ON t.id = pt_count.tag_id
       ORDER BY t.name ASC`
    );

    return NextResponse.json({
      success: true,
      data: tags,
    });
  } catch (error) {
    console.error('Get tags error:', error);
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
    const name = typeof body.name === 'string' ? body.name.trim() : '';

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Tag name is required' },
        { status: 400 }
      );
    }

    // Check for duplicate
    const existing = queryOne<Tag>('SELECT id FROM tags WHERE name = ?', [name]);
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Tag already exists' },
        { status: 400 }
      );
    }

    const result = execute('INSERT INTO tags (name) VALUES (?)', [name]);

    const newTag = queryOne<Tag>('SELECT * FROM tags WHERE id = ?', [result.lastInsertRowid]);

    return NextResponse.json(
      { success: true, data: newTag },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create tag error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

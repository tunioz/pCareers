import { NextResponse } from 'next/server';
import { execute, transaction } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

interface ReorderItem {
  id: number;
  sort_order: number;
}

export async function PUT(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!Array.isArray(body.items)) {
      return NextResponse.json(
        { success: false, error: 'items array is required' },
        { status: 400 }
      );
    }

    const items: ReorderItem[] = body.items;

    // Validate each item
    for (const item of items) {
      if (typeof item.id !== 'number' || typeof item.sort_order !== 'number') {
        return NextResponse.json(
          { success: false, error: 'Each item must have numeric id and sort_order' },
          { status: 400 }
        );
      }
    }

    transaction(() => {
      for (const item of items) {
        execute(
          'UPDATE team_members SET sort_order = ? WHERE id = ?',
          [item.sort_order, item.id]
        );
      }
    });

    return NextResponse.json({
      success: true,
      data: { message: 'Team members reordered successfully' },
    });
  } catch (error) {
    console.error('Reorder team error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

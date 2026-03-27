import { NextResponse } from 'next/server';
import { execute, transaction } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

interface ReorderItem {
  id: number;
  step_number: number;
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
      if (typeof item.id !== 'number' || typeof item.step_number !== 'number') {
        return NextResponse.json(
          { success: false, error: 'Each item must have numeric id and step_number' },
          { status: 400 }
        );
      }
    }

    transaction(() => {
      for (const item of items) {
        execute(
          'UPDATE process_steps SET step_number = ?, updated_at = datetime(\'now\') WHERE id = ?',
          [item.step_number, item.id]
        );
      }
    });

    return NextResponse.json({
      success: true,
      data: { message: 'Process steps reordered successfully' },
    });
  } catch (error) {
    console.error('Reorder process steps error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

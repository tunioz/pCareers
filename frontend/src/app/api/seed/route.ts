import { NextResponse } from 'next/server';
import { seed } from '@/lib/seed';

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { success: false, error: 'Seed is not available in production' },
      { status: 403 }
    );
  }

  try {
    await seed();

    return NextResponse.json({
      success: true,
      data: { message: 'Database seeded successfully' },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { success: false, error: `Seed failed: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { saveUploadedFile } from '@/lib/upload';

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const ALLOWED_SUB_DIRS = ['images', 'cv', 'candidate-attachments', 'tasks'];
    const rawSubDir = (formData.get('subDir') as string) || 'images';
    const subDir = ALLOWED_SUB_DIRS.includes(rawSubDir) ? rawSubDir : 'images';

    if (!file || file.size === 0) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    const result = await saveUploadedFile(file, subDir);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Upload failed' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          url: result.publicUrl,
          path: result.filePath,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

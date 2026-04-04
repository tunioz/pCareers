import path from 'node:path';
import fs from 'node:fs';
import { randomUUID } from 'node:crypto';

const UPLOAD_DIR = path.resolve(process.cwd(), 'public', 'uploads');
const MAX_FILE_SIZE = parseInt(process.env.MAX_UPLOAD_SIZE || '10485760', 10); // 10MB default

const ALLOWED_SUB_DIRS = ['images', 'cv', 'candidate-attachments', 'tasks'] as const;
type AllowedSubDir = typeof ALLOWED_SUB_DIRS[number];

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'image/svg+xml',
];

const ALLOWED_CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export interface UploadResult {
  success: boolean;
  filePath?: string;
  publicUrl?: string;
  error?: string;
}

/**
 * Ensure the upload directory exists.
 */
function ensureUploadDir(subDir?: string): string {
  const dir = subDir ? path.join(UPLOAD_DIR, subDir) : UPLOAD_DIR;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

/**
 * Generate a unique filename preserving the original extension.
 */
function generateFilename(originalName: string): string {
  const ext = path.extname(originalName).toLowerCase();
  const id = randomUUID();
  return `${id}${ext}`;
}

/**
 * Save an uploaded file (from FormData) to the uploads directory.
 */
export async function saveUploadedFile(
  file: File,
  subDir: string = 'images'
): Promise<UploadResult> {
  // Validate subDir against allowlist to prevent path traversal
  if (!ALLOWED_SUB_DIRS.includes(subDir as AllowedSubDir)) {
    return {
      success: false,
      error: `Invalid upload directory: ${subDir}`,
    };
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      error: `File size exceeds maximum of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  // Validate file type
  const allowedTypes = subDir === 'cv' ? ALLOWED_CV_TYPES : ALLOWED_IMAGE_TYPES;
  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      error: `File type ${file.type} is not allowed`,
    };
  }

  const dir = ensureUploadDir(subDir);
  const filename = generateFilename(file.name);
  const filePath = path.join(dir, filename);

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${subDir}/${filename}`;

    return {
      success: true,
      filePath,
      publicUrl,
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to save file: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Delete a previously uploaded file by its public URL.
 */
export function deleteUploadedFile(publicUrl: string): boolean {
  try {
    // Convert /uploads/images/xxx.jpg to absolute path
    const relativePath = publicUrl.replace(/^\//, '');
    const absolutePath = path.join(process.cwd(), 'public', relativePath);

    // Prevent path traversal — ensure file is within UPLOAD_DIR
    const resolved = path.resolve(absolutePath);
    if (!resolved.startsWith(path.resolve(UPLOAD_DIR))) {
      console.error('Attempted to delete file outside upload directory:', resolved);
      return false;
    }

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

import fs from 'node:fs';
import path from 'node:path';

/**
 * Extract plain text from a CV file.
 * Supports PDF, DOCX, DOC, TXT, and plain text.
 * Returns empty string on failure (caller should handle gracefully).
 */
export async function extractCvText(cvPath: string): Promise<{ text: string; error?: string }> {
  try {
    // cvPath is stored as public URL like /uploads/cv/xxx.pdf
    const relativePath = cvPath.replace(/^\//, '');
    const absolutePath = path.join(process.cwd(), 'public', relativePath);

    // Security: ensure path is within uploads dir
    const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads');
    const resolved = path.resolve(absolutePath);
    if (!resolved.startsWith(uploadsDir)) {
      return { text: '', error: 'Invalid CV path' };
    }

    if (!fs.existsSync(absolutePath)) {
      return { text: '', error: 'CV file not found on disk' };
    }

    const ext = path.extname(absolutePath).toLowerCase();
    const buffer = fs.readFileSync(absolutePath);

    if (ext === '.pdf') {
      // Dynamic import to avoid loading pdf-parse on every server start
      // The pdf-parse package may be CJS-style depending on version
      const pdfParseModule = await import('pdf-parse');
      const pdfParse: (buffer: Buffer) => Promise<{ text: string }> =
        (pdfParseModule as unknown as { default?: (buffer: Buffer) => Promise<{ text: string }> })
          .default ||
        (pdfParseModule as unknown as (buffer: Buffer) => Promise<{ text: string }>);
      const result = await pdfParse(buffer);
      return { text: result.text };
    }

    if (ext === '.docx') {
      const mammoth = await import('mammoth');
      const result = await mammoth.extractRawText({ buffer });
      return { text: result.value };
    }

    if (ext === '.doc') {
      // .doc is legacy Word format; mammoth only supports .docx
      // For .doc, we'd need textract or similar
      return {
        text: '',
        error: 'Legacy .doc format not supported. Please ask candidate to upload .docx or PDF.',
      };
    }

    if (ext === '.txt') {
      return { text: buffer.toString('utf-8') };
    }

    return { text: '', error: `Unsupported file type: ${ext}` };
  } catch (err) {
    return {
      text: '',
      error: err instanceof Error ? err.message : 'Failed to extract CV text',
    };
  }
}

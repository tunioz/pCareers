'use client';

import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import styles from '@/styles/admin.module.scss';

interface FileUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  subDir?: string;
  accept?: string;
  label?: string;
}

export default function FileUpload({
  value,
  onChange,
  subDir = 'images',
  accept = 'image/*',
  label = 'Click or drag to upload image',
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('subDir', subDir);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();

      if (json.success && json.data?.url) {
        onChange(json.data.url);
      } else {
        setError(json.error || 'Upload failed');
      }
    } catch {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      {value ? (
        <div className={styles.fileUploadPreview}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Uploaded file" />
          <button className={styles.fileUploadRemove} onClick={handleRemove} type="button">
            <X size={12} />
          </button>
        </div>
      ) : (
        <div
          className={styles.fileUpload}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <Upload size={24} color="#adb5bd" />
          <p>{uploading ? 'Uploading...' : label}</p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />
      {error && <p className={styles.formError}>{error}</p>}
    </div>
  );
}

'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  Heading4,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote,
  Minus,
  Code,
  Highlighter,
  Undo,
  Redo,
  Type,
  Unlink,
} from 'lucide-react';
import styles from './RichTextEditor.module.scss';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export interface RichTextEditorHandle {
  insertText: (text: string) => void;
  insertImage: (url: string, alt?: string) => void;
  focus: () => void;
}

// ---------------------------------------------------------------------------
// Link Input Modal
// ---------------------------------------------------------------------------

function LinkModal({
  initialUrl,
  onConfirm,
  onRemove,
  onCancel,
}: {
  initialUrl: string;
  onConfirm: (url: string) => void;
  onRemove: () => void;
  onCancel: () => void;
}) {
  const [url, setUrl] = useState(initialUrl);

  return (
    <div className={styles.linkModal} onClick={onCancel}>
      <div className={styles.linkModalCard} onClick={(e) => e.stopPropagation()}>
        <h3>Insert Link</h3>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (url.trim()) onConfirm(url.trim());
            }
            if (e.key === 'Escape') onCancel();
          }}
        />
        <div className={styles.linkModalActions}>
          {initialUrl && (
            <button className={styles.linkModalBtnDanger} onClick={onRemove}>
              Remove Link
            </button>
          )}
          <button className={styles.linkModalBtnSecondary} onClick={onCancel}>
            Cancel
          </button>
          <button
            className={styles.linkModalBtnPrimary}
            onClick={() => {
              if (url.trim()) onConfirm(url.trim());
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Image Modal — upload a file or paste a URL
// ---------------------------------------------------------------------------

function ImageModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: (url: string) => void;
  onCancel: () => void;
}) {
  const [url, setUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        setUploadError('Please choose an image file.');
        return;
      }
      setUploading(true);
      setUploadError(null);
      try {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('subDir', 'images');
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (data.success && data.data?.url) {
          onConfirm(data.data.url);
        } else {
          setUploadError(data.error || 'Upload failed');
        }
      } catch {
        setUploadError('Upload failed');
      } finally {
        setUploading(false);
      }
    },
    [onConfirm]
  );

  return (
    <div className={styles.linkModal} onClick={onCancel}>
      <div className={styles.linkModalCard} onClick={(e) => e.stopPropagation()}>
        <h3>Insert Image</h3>
        <button
          type="button"
          className={styles.linkModalBtnSecondary}
          style={{ width: '100%', marginBottom: 12 }}
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? 'Uploading…' : 'Upload from computer'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = '';
          }}
        />
        <div style={{ fontSize: 12, color: '#6b7280', margin: '4px 0 8px' }}>or paste a URL</div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (url.trim()) onConfirm(url.trim());
            }
            if (e.key === 'Escape') onCancel();
          }}
        />
        {uploadError && (
          <div style={{ color: '#dc2626', fontSize: 12, marginTop: 8 }}>{uploadError}</div>
        )}
        <div className={styles.linkModalActions}>
          <button className={styles.linkModalBtnSecondary} onClick={onCancel}>
            Cancel
          </button>
          <button
            className={styles.linkModalBtnPrimary}
            disabled={!url.trim() || uploading}
            onClick={() => {
              if (url.trim()) onConfirm(url.trim());
            }}
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main RichTextEditor
// ---------------------------------------------------------------------------

const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(function RichTextEditor({
  value,
  onChange,
  placeholder = 'Start writing...',
  minHeight = '300px',
}, ref) {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        codeBlock: {},
        horizontalRule: {},
        hardBreak: {},
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      Image.configure({ inline: false }),
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      Highlight.configure({ multicolor: false }),
      TextStyle,
      Color,
    ],
    content: value,
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
    immediatelyRender: false,
  });

  // Sync value when it changes externally (e.g. form reset)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
    // Only run when value changes from outside, not on every keystroke
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useImperativeHandle(
    ref,
    () => ({
      insertText: (text: string) => {
        if (!editor) return;
        editor.chain().focus().insertContent(text).run();
      },
      insertImage: (url: string, alt?: string) => {
        if (!editor) return;
        editor.chain().focus().setImage({ src: url, alt }).run();
      },
      focus: () => editor?.chain().focus().run(),
    }),
    [editor]
  );

  // ---- Link handling ----
  const openLinkModal = useCallback(() => {
    if (!editor) return;
    const existingHref = editor.getAttributes('link').href || '';
    setLinkUrl(existingHref);
    setShowLinkModal(true);
  }, [editor]);

  const confirmLink = useCallback(
    (url: string) => {
      if (!editor) return;
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
      setShowLinkModal(false);
    },
    [editor]
  );

  const removeLink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
    setShowLinkModal(false);
  }, [editor]);

  // ---- Image handling ----
  const confirmImage = useCallback(
    (url: string) => {
      if (!editor) return;
      editor.chain().focus().setImage({ src: url }).run();
      setShowImageModal(false);
    },
    [editor]
  );

  if (!editor) {
    return (
      <div className={styles.editorContainer}>
        <div className={styles.toolbar} />
        <div style={{ minHeight, padding: '16px', color: '#adb5bd', fontStyle: 'italic', fontSize: '14px' }}>
          Loading editor...
        </div>
      </div>
    );
  }

  // ---- Toolbar button helper ----
  const btn = (
    icon: React.ReactNode,
    action: () => void,
    isActive: boolean,
    disabled = false,
    title = ''
  ) => (
    <button
      type="button"
      className={`${styles.toolbarBtn} ${isActive ? styles.toolbarBtnActive : ''}`}
      onClick={(e) => {
        e.preventDefault();
        action();
      }}
      disabled={disabled}
      title={title}
    >
      {icon}
    </button>
  );

  return (
    <div className={styles.editorContainer}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        {/* Text formatting */}
        <div className={styles.toolbarGroup}>
          {btn(<Bold size={16} />, () => editor.chain().focus().toggleBold().run(), editor.isActive('bold'), false, 'Bold')}
          {btn(<Italic size={16} />, () => editor.chain().focus().toggleItalic().run(), editor.isActive('italic'), false, 'Italic')}
          {btn(<UnderlineIcon size={16} />, () => editor.chain().focus().toggleUnderline().run(), editor.isActive('underline'), false, 'Underline')}
          {btn(<Strikethrough size={16} />, () => editor.chain().focus().toggleStrike().run(), editor.isActive('strike'), false, 'Strikethrough')}
        </div>

        {/* Headings */}
        <div className={styles.toolbarGroup}>
          {btn(<Type size={16} />, () => editor.chain().focus().setParagraph().run(), editor.isActive('paragraph'), false, 'Paragraph')}
          {btn(<Heading2 size={16} />, () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive('heading', { level: 2 }), false, 'Heading 2')}
          {btn(<Heading3 size={16} />, () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive('heading', { level: 3 }), false, 'Heading 3')}
          {btn(<Heading4 size={16} />, () => editor.chain().focus().toggleHeading({ level: 4 }).run(), editor.isActive('heading', { level: 4 }), false, 'Heading 4')}
        </div>

        {/* Alignment */}
        <div className={styles.toolbarGroup}>
          {btn(<AlignLeft size={16} />, () => editor.chain().focus().setTextAlign('left').run(), editor.isActive({ textAlign: 'left' }), false, 'Align left')}
          {btn(<AlignCenter size={16} />, () => editor.chain().focus().setTextAlign('center').run(), editor.isActive({ textAlign: 'center' }), false, 'Align center')}
          {btn(<AlignRight size={16} />, () => editor.chain().focus().setTextAlign('right').run(), editor.isActive({ textAlign: 'right' }), false, 'Align right')}
        </div>

        {/* Lists */}
        <div className={styles.toolbarGroup}>
          {btn(<List size={16} />, () => editor.chain().focus().toggleBulletList().run(), editor.isActive('bulletList'), false, 'Bullet list')}
          {btn(<ListOrdered size={16} />, () => editor.chain().focus().toggleOrderedList().run(), editor.isActive('orderedList'), false, 'Ordered list')}
        </div>

        {/* Insert */}
        <div className={styles.toolbarGroup}>
          {btn(
            editor.isActive('link') ? <Unlink size={16} /> : <LinkIcon size={16} />,
            openLinkModal,
            editor.isActive('link'),
            false,
            'Link'
          )}
          {btn(<ImageIcon size={16} />, () => setShowImageModal(true), false, false, 'Image')}
          {btn(<Quote size={16} />, () => editor.chain().focus().toggleBlockquote().run(), editor.isActive('blockquote'), false, 'Blockquote')}
          {btn(<Minus size={16} />, () => editor.chain().focus().setHorizontalRule().run(), false, false, 'Horizontal rule')}
          {btn(<Code size={16} />, () => editor.chain().focus().toggleCodeBlock().run(), editor.isActive('codeBlock'), false, 'Code block')}
        </div>

        {/* Highlight */}
        <div className={styles.toolbarGroup}>
          {btn(<Highlighter size={16} />, () => editor.chain().focus().toggleHighlight().run(), editor.isActive('highlight'), false, 'Highlight')}
        </div>

        {/* History */}
        <div className={styles.toolbarGroup}>
          {btn(<Undo size={16} />, () => editor.chain().focus().undo().run(), false, !editor.can().undo(), 'Undo')}
          {btn(<Redo size={16} />, () => editor.chain().focus().redo().run(), false, !editor.can().redo(), 'Redo')}
        </div>
      </div>

      {/* Editor content */}
      <div className={styles.editorContent} style={{ minHeight }}>
        <EditorContent editor={editor} />
      </div>

      {/* Modals */}
      {showLinkModal && (
        <LinkModal
          initialUrl={linkUrl}
          onConfirm={confirmLink}
          onRemove={removeLink}
          onCancel={() => setShowLinkModal(false)}
        />
      )}
      {showImageModal && (
        <ImageModal
          onConfirm={confirmImage}
          onCancel={() => setShowImageModal(false)}
        />
      )}
    </div>
  );
});

export default RichTextEditor;

'use client';

import { useState } from 'react';
import { Plus, X as XIcon } from 'lucide-react';
import styles from '@/styles/admin.module.scss';

interface MultiSelectPillsProps {
  label: string;
  availableItems: { id: number; name: string }[];
  selectedNames: string[];
  onToggle: (name: string) => void;
  onAddNew: (name: string) => Promise<void>;
  addPlaceholder: string;
  helperText?: string;
}

export default function MultiSelectPills({
  label,
  availableItems,
  selectedNames,
  onToggle,
  onAddNew,
  addPlaceholder,
  helperText,
}: MultiSelectPillsProps) {
  const [newItemName, setNewItemName] = useState('');
  const [adding, setAdding] = useState(false);

  const handleAddNew = async () => {
    const trimmed = newItemName.trim();
    if (!trimmed) return;

    const exists = availableItems.some(
      (item) => item.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      const existingName = availableItems.find(
        (item) => item.name.toLowerCase() === trimmed.toLowerCase()
      )!.name;
      if (!selectedNames.includes(existingName)) {
        onToggle(existingName);
      }
      setNewItemName('');
      return;
    }

    setAdding(true);
    try {
      await onAddNew(trimmed);
      setNewItemName('');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel}>{label}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
        {availableItems.map((item) => {
          const isSelected = selectedNames.includes(item.name);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggle(item.name)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: '16px',
                border: isSelected ? '1.5px solid #0066ff' : '1px solid #d0d5dd',
                backgroundColor: isSelected ? '#e8f0fe' : '#fff',
                color: isSelected ? '#0052cc' : '#344054',
                fontSize: '13px',
                fontWeight: isSelected ? 500 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {item.name}
              {isSelected && <XIcon size={12} />}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          className={styles.formInput}
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder={addPlaceholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddNew();
            }
          }}
          style={{ flex: 1 }}
        />
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={handleAddNew}
          disabled={adding || !newItemName.trim()}
          style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <Plus size={14} />
          Add
        </button>
      </div>
      {helperText && (
        <span style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px', display: 'block' }}>
          {helperText}
        </span>
      )}
    </div>
  );
}

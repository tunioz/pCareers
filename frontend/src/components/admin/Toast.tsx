'use client';

import { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import styles from '@/styles/admin.module.scss';

interface ToastMessage {
  id: number;
  type: 'success' | 'error';
  message: string;
}

interface ToastContextValue {
  showToast: (type: 'success' | 'error', message: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let toastIdCounter = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((type: 'success' | 'error', message: string) => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
    return () => clearTimeout(timer);
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}
        >
          {toast.type === 'success' ? <CheckCircle /> : <XCircle />}
          {toast.message}
        </div>
      ))}
    </ToastContext.Provider>
  );
}

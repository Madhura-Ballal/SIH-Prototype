import React from 'react';
import { ToastMessage } from '../types';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
}) => {
  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-md w-full px-4"
      id="toast-container"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-inverse-surface text-inverse-on-surface px-space-md py-space-sm rounded-lg shadow-2xl text-xs md:text-sm font-medium flex items-center justify-between gap-space-xs transition-all duration-300 border border-inverse-on-surface/10 animate-in slide-in-from-bottom-2 fade-in"
        >
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[20px] text-primary-fixed shrink-0">
              {toast.type === 'warning' ? 'warning' : 'info'}
            </span>
            <span>{toast.text}</span>
          </div>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="text-inverse-on-surface/60 hover:text-inverse-on-surface ml-2 cursor-pointer p-1"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dimmed backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div 
        role="dialog" 
        aria-modal="true"
        className={`relative w-full ${maxWidthClasses[maxWidth]} bg-[#FBF9F5] border border-[#E7E2D8] shadow-2xl p-6 sm:p-8 md:p-10 z-10 my-auto text-left`}
      >
        <div className="flex items-start justify-between border-b border-[#E7E2D8] pb-4 mb-6">
          <div>
            {subtitle && (
              <p className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#5D6853] mb-1">
                {subtitle}
              </p>
            )}
            {title && (
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#181716]">
                {title}
              </h3>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#757069] hover:text-[#181716] transition-colors rounded-none hover:bg-[#F2EDE4]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto pr-1">
          {children}
        </div>
      </div>
    </div>
  );
};


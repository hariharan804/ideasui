'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Copy, X } from 'lucide-react';

import { MarkdownIcon } from '@/components/docs-ui/icons';

interface CopyDropdownModalProps {
  readonly isOpen: boolean;
  readonly pageTitle: string;
  readonly rawMarkdown: string;
  readonly onClose: () => void;
  readonly onCopyContent: (text: string, label: string) => Promise<void>;
}

export function CopyDropdownModal({
  isOpen,
  pageTitle,
  rawMarkdown,
  onClose,
  onCopyContent,
}: Readonly<CopyDropdownModalProps>) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            animate={{ opacity: 1 }}
            className="bg-background/50 absolute inset-0 backdrop-blur-md"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Box */}
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-surface/95 relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl shadow-2xl backdrop-blur-xl"
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4">
              <h3 className="text-content-primary flex items-center gap-2 text-sm font-semibold">
                <MarkdownIcon className="text-primary size-4.5" />
                <span>Markdown View — {pageTitle}</span>
              </h3>
              <button
                aria-label="Close modal"
                className="text-content-secondary hover:bg-surface-subtle hover:text-content-primary cursor-pointer rounded-lg p-1 transition-colors"
                type="button"
                onClick={onClose}
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Body */}
            <div className="text-content-secondary flex-1 overflow-y-auto p-6 text-xs leading-relaxed">
              <div className="relative">
                <button
                  className="bg-surface/85 text-content-secondary hover:bg-surface hover:text-content-primary absolute top-3 right-3 z-10 inline-flex cursor-pointer items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold shadow-sm transition-all duration-200 active:scale-95"
                  type="button"
                  onClick={() => onCopyContent(rawMarkdown, 'Markdown content')}
                >
                  <Copy className="size-3" />
                  <span>Copy Code</span>
                </button>
                <pre className="bg-surface-subtle text-content-secondary max-h-[55vh] overflow-x-auto rounded-xl p-5 font-mono text-[11px] leading-relaxed select-text">
                  <code>{rawMarkdown}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

import { ChatGPTIcon, ClaudeIcon, MarkdownIcon } from '@/components/docs-ui/icons';

interface CopyDropdownMenuProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onViewMarkdown: () => void;
  readonly onOpenInChatGPT: () => void;
  readonly onOpenInClaude: () => void;
}

export function CopyDropdownMenu({
  isOpen,
  onViewMarkdown,
  onOpenInChatGPT,
  onOpenInClaude,
}: Readonly<CopyDropdownMenuProps>) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-surface/95 absolute top-full right-0 z-[999] mt-2 w-72 rounded-2xl p-1.5 shadow-xl backdrop-blur-xl"
          exit={{ opacity: 0, y: 6, scale: 0.95 }}
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          <div className="flex flex-col gap-0.5">
            {/* View as Markdown */}
            <button
              className="group hover:bg-surface-subtle focus-visible:bg-surface-subtle flex w-full cursor-pointer items-start gap-3 rounded-xl p-2.5 text-left transition-all duration-200 outline-none"
              onClick={onViewMarkdown}
            >
              <div className="bg-surface-subtle text-content-secondary group-hover:bg-primary-subtle/15 group-hover:text-primary mt-0.5 rounded-lg p-1.5 transition-colors">
                <MarkdownIcon className="size-4 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="flex flex-col">
                <span className="text-content-primary text-xs font-semibold">View as Markdown</span>
                <span className="text-content-tertiary mt-0.5 text-[10px] leading-snug">
                  View page as Markdown format
                </span>
              </div>
            </button>

            <div className="bg-content-secondary/10 my-1.5 h-[1px]" />

            {/* Open in ChatGPT */}
            <button
              className="group hover:bg-surface-subtle focus-visible:bg-surface-subtle flex w-full cursor-pointer items-start gap-3 rounded-xl p-2.5 text-left transition-all duration-200 outline-none"
              onClick={onOpenInChatGPT}
            >
              <div className="bg-surface-subtle text-content-secondary group-hover:bg-primary-subtle/15 group-hover:text-primary mt-0.5 rounded-lg p-1.5 transition-colors">
                <ChatGPTIcon className="size-4 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-content-primary text-xs font-semibold">
                    Open in ChatGPT
                  </span>
                  <ExternalLink className="text-content-tertiary size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <span className="text-content-tertiary mt-0.5 text-[10px] leading-snug">
                  Ask questions about this page
                </span>
              </div>
            </button>

            {/* Open in Claude */}
            <button
              className="group hover:bg-surface-subtle focus-visible:bg-surface-subtle flex w-full cursor-pointer items-start gap-3 rounded-xl p-2.5 text-left transition-all duration-200 outline-none"
              onClick={onOpenInClaude}
            >
              <div className="bg-surface-subtle text-content-secondary group-hover:bg-primary-subtle/15 group-hover:text-primary mt-0.5 rounded-lg p-1.5 transition-colors">
                <ClaudeIcon className="size-4 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-content-primary text-xs font-semibold">Open in Claude</span>
                  <ExternalLink className="text-content-tertiary size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <span className="text-content-tertiary mt-0.5 text-[10px] leading-snug">
                  Ask questions about this page
                </span>
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { createPortal } from 'react-dom';

import { ChatGPTIcon, ClaudeIcon, GeminiIcon, MarkdownIcon } from '@/components/docs-ui/icons';

interface CopyDropdownMenuProps {
  readonly isOpen: boolean;
  readonly buttonRect: DOMRect | null;
  readonly onClose: () => void;
  readonly onViewMarkdown: () => void;
  readonly onOpenInChatGPT: () => void;
  readonly onOpenInClaude: () => void;
  readonly onOpenInGemini: () => void;
}

const MENU_WIDTH = 288; // w-72
const MENU_OFFSET = 8;
const MOBILE_BREAKPOINT = 640; // sm

export function CopyDropdownMenu({
  isOpen,
  buttonRect,
  onViewMarkdown,
  onOpenInChatGPT,
  onOpenInClaude,
  onOpenInGemini,
}: Readonly<CopyDropdownMenuProps>) {
  if (!buttonRect) return null;

  const viewportWidth = globalThis.window === undefined ? 1024 : window.innerWidth;
  const top = buttonRect.bottom + MENU_OFFSET;
  const isMobile = viewportWidth < MOBILE_BREAKPOINT;

  let style: React.CSSProperties;

  if (isMobile) {
    // Full width with 8px margins on each side, centered
    style = {
      position: 'fixed',
      top,
      left: 8,
      right: 8,
      zIndex: 99_999,
    };
  } else {
    // Right-align with the button's right edge; clamp so left edge stays ≥ 8px
    const distanceFromRight = viewportWidth - buttonRect.right;
    const needsLeftAlign = buttonRect.right - MENU_WIDTH < 8;

    style = {
      position: 'fixed',
      top,
      zIndex: 99_999,
      width: MENU_WIDTH,
      ...(needsLeftAlign
        ? { left: Math.max(8, buttonRect.left) }
        : { right: Math.max(0, distanceFromRight) }),
    };
  }

  const menu = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-surface rounded-2xl p-1.5 shadow-xl backdrop-blur-xl"
          exit={{ opacity: 0, y: 6, scale: 0.95 }}
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          style={style}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          <div className="flex flex-col gap-0.5">
            {/* View as Markdown */}
            <button
              className="group hover:bg-surface-subtle focus-visible:bg-surface-subtle flex w-full cursor-pointer items-start gap-3 rounded-xl p-2.5 text-left transition-all duration-200 outline-none"
              type="button"
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
              type="button"
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
              type="button"
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

            {/* Open in Gemini */}
            <button
              className="group hover:bg-surface-subtle focus-visible:bg-surface-subtle flex w-full cursor-pointer items-start gap-3 rounded-xl p-2.5 text-left transition-all duration-200 outline-none"
              type="button"
              onClick={onOpenInGemini}
            >
              <div className="bg-surface-subtle text-content-secondary group-hover:bg-primary-subtle/15 group-hover:text-primary mt-0.5 rounded-lg p-1.5 transition-colors">
                <GeminiIcon className="size-4 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-content-primary text-xs font-semibold">Open in Gemini</span>
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

  // Render into body to fully escape any stacking context (e.g. sticky TOC)
  return typeof document === 'undefined' ? null : createPortal(menu, document.body);
}

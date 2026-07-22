'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronDown } from 'lucide-react';
import { cn } from '@ideasui/utils';

import { CopyDropdownMenu } from './copy-dropdown-menu';
import { CopyDropdownModal } from './copy-dropdown-modal';

interface CopyDropdownProperties {
  readonly rawMarkdown: string;
  readonly pageTitle: string;
}

export function CopyDropdown({ rawMarkdown, pageTitle }: CopyDropdownProperties) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dropdownReference = useRef<HTMLDivElement>(null);
  const splitButtonRef = useRef<HTMLDivElement>(null);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);

  const updateRect = useCallback(() => {
    if (splitButtonRef.current) {
      setButtonRect(splitButtonRef.current.getBoundingClientRect());
    }
  }, []);

  const isLocal =
    globalThis.window !== undefined &&
    (globalThis.location.hostname === 'localhost' ||
      globalThis.location.hostname === '127.0.0.1' ||
      globalThis.location.hostname.endsWith('.local'));

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownReference.current && !dropdownReference.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keep rect fresh while open so dropdown tracks scroll/resize
  useEffect(() => {
    if (!isOpen) return;
    updateRect();
    window.addEventListener('scroll', updateRect, true);
    window.addEventListener('resize', updateRect);

    return () => {
      window.removeEventListener('scroll', updateRect, true);
      window.removeEventListener('resize', updateRect);
    };
  }, [isOpen, updateRect]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(rawMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy markdown:', error);
    }
  };

  const handleCopyContent = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast(`Copied ${label} to clipboard!`);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleOpenInAI = async (aiName: 'Claude' | 'ChatGPT', targetUrl: string) => {
    const queryParameter = aiName === 'ChatGPT' ? 'prompt' : 'q';

    setIsOpen(false);

    if (isLocal) {
      const prompt = `I am building a web app using IdeasUI (React component library built with Tailwind CSS v4 and React Aria).\nHere is the documentation page for "${pageTitle}":\n\`\`\`markdown\n${rawMarkdown}\n\`\`\`\nI have the above context. Please help me with my task or question regarding this component:`;

      try {
        await navigator.clipboard.writeText(prompt);
        setToast(
          `Copied context! Paste it when ${aiName} opens (Localhost cannot be read by AIs).`,
        );
        setTimeout(() => window.open(targetUrl, '_blank'), 800);
      } catch (error) {
        console.error('Failed to copy prompt:', error);
      }

      return;
    }

    const pathname = globalThis.location.pathname.replace(/\/$/, '');
    const rawDocUrl = `${globalThis.location.origin}${pathname.replace(/^\/react\/docs/, '/api/raw-doc')}.mdx`;
    const aiPrompt = `Read ${rawDocUrl}, I want to ask questions about it.`;
    const fullUrl = `${targetUrl}?${queryParameter}=${encodeURIComponent(aiPrompt)}`;

    setToast(`Opening ${aiName} with raw doc reference...`);
    setTimeout(() => window.open(fullUrl, '_blank'), 800);
  };

  return (
    <div ref={dropdownReference} className="relative inline-flex max-w-full">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-surface-subtle text-content-primary fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium shadow-xl backdrop-blur-md"
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <Check className="text-success size-4" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Split Button */}
      <div
        ref={splitButtonRef}
        className="bg-surface-subtle inline-flex max-w-full items-center overflow-hidden rounded-3xl p-0.5 shadow-[0_1px_3px_rgba(0,0,0,0.01)] transition-all duration-300"
      >
        {/* Copy Markdown */}
        <button
          aria-label="Copy page as Markdown"
          className="text-content-secondary hover:text-content-primary focus-visible:ring-primary/40 inline-flex min-w-0 cursor-pointer items-center gap-1.5 rounded-l-2xl px-3.5 py-1.5 text-[11px] font-medium transition-all duration-200 outline-none select-none focus-visible:ring-1 active:scale-[0.98]"
          onClick={handleCopyMarkdown}
        >
          {copied ? (
            <>
              <Check className="animate-in fade-in zoom-in text-success size-3.5 shrink-0 duration-200" />
              <span className="text-success min-w-0 truncate font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5 shrink-0" />
              <span className="min-w-0 truncate">Copy Markdown</span>
            </>
          )}
        </button>

        <div className="bg-content-secondary/15 h-3 w-[1px]" />

        {/* Dropdown Toggle */}
        <button
          aria-expanded={isOpen}
          aria-label="Toggle extra copy/share actions"
          className={cn(
            'text-content-secondary hover:text-content-primary focus-visible:ring-primary/40 inline-flex cursor-pointer items-center justify-center rounded-r-2xl p-1.5 transition-all duration-200 outline-none select-none focus-visible:ring-1 active:scale-[0.95]',
            isOpen ? 'text-content-primary rotate-180' : '',
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown className="size-3.5 transition-transform duration-300" />
        </button>
      </div>

      {/* Dropdown Menu — fixed positioning escapes all stacking contexts */}
      <CopyDropdownMenu
        buttonRect={buttonRect}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpenInChatGPT={() => handleOpenInAI('ChatGPT', 'https://chatgpt.com/')}
        onOpenInClaude={() => handleOpenInAI('Claude', 'https://claude.ai/new')}
        onViewMarkdown={() => {
          setIsModalOpen(true);
          setIsOpen(false);
        }}
      />

      {/* Markdown Modal */}
      <CopyDropdownModal
        isOpen={isModalOpen}
        pageTitle={pageTitle}
        rawMarkdown={rawMarkdown}
        onClose={() => setIsModalOpen(false)}
        onCopyContent={handleCopyContent}
      />
    </div>
  );
}

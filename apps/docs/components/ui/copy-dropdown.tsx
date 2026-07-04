'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Check,
  ChevronDown,
  ExternalLink,
  X,
  Terminal,
  Monitor,
  MessageSquareCode,
} from 'lucide-react';
import { cn } from '@ideasui/utils';

interface CopyDropdownProperties {
  rawMarkdown: string;
  pageTitle: string;
}

// Brand SVG Icons
const CursorIcon = (properties: React.SVGProps<SVGSVGElement>) => (
  <svg className={properties.className} fill="currentColor" viewBox="0 0 24 24" {...properties}>
    <path d="M5.5 2v20l5.83-5.83 5.34 5.34 2.83-2.83-5.34-5.34L20 7.5z" />
  </svg>
);

const VSCodeIcon = (properties: React.SVGProps<SVGSVGElement>) => (
  <svg className={properties.className} fill="currentColor" viewBox="0 0 24 24" {...properties}>
    <path d="M23.985 6.53a.5.5 0 0 0-.07-.17l-3.3-3.2a.5.5 0 0 0-.68-.03L12 10.92 5.065 3.13a.5.5 0 0 0-.68.03l-3.3 3.2a.5.5 0 0 0-.07.17.5.5 0 0 0 .15.5L5.4 12l-4.235 4.77a.5.5 0 0 0-.15.5.5.5 0 0 0 .07.17l3.3 3.2a.5.5 0 0 0 .68.03L12 13.08l6.935 7.79a.5.5 0 0 0 .68-.03l3.3-3.2a.5.5 0 0 0 .07-.17.5.5 0 0 0-.15-.5L18.6 12l4.235-4.77a.5.5 0 0 0 .15-.5z" />
  </svg>
);

const ChatGPTIcon = (properties: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    height="16"
    role="img"
    viewBox="0 0 24 24"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    {...properties}
  >
    <title>OpenAI</title>
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
  </svg>
);

const ClaudeIcon = (properties: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    height="16"
    role="img"
    viewBox="0 0 16 16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    {...properties}
  >
    <path
      d="M3.74677 10.3076L6.50057 8.76276L6.54712 8.62846L6.50057 8.55386H6.36705L5.90589 8.52577L4.33266 8.48364L2.96762 8.42658L1.64563 8.35636L1.31183 8.28527L1 7.87448L1.03162 7.66909L1.31271 7.48125L1.71239 7.51636L2.5987 7.57693L3.92772 7.66909L4.89133 7.72527L6.31961 7.87448H6.54712L6.57874 7.78232L6.50057 7.72527L6.44083 7.66909L5.06525 6.73693L3.57636 5.75298L2.79721 5.18596L2.37558 4.89893L2.16213 4.63034L2.07077 4.04226L2.45288 3.62094L2.96675 3.65605L3.09851 3.69116L3.6194 4.09141L4.73234 4.95248L6.18522 6.02157L6.39779 6.19887L6.483 6.13918L6.49354 6.09618L6.39779 5.9373L5.60723 4.51009L4.76396 3.05743L4.388 2.4553L4.28874 2.09455C4.25153 1.95591 4.23147 1.81323 4.22901 1.66972L4.6647 1.07812L4.90538 1L5.48689 1.07812L5.73196 1.29053L6.09299 2.11561L6.678 3.41467L7.58539 5.18245L7.85067 5.70646L7.99297 6.19185L8.04568 6.34107H8.13791V6.25592L8.21257 5.26056L8.35048 4.03875L8.48576 2.46583L8.53144 2.02345L8.75104 1.49241L9.1876 1.20539L9.52754 1.36865L9.80776 1.7689L9.76823 2.02696L9.60133 3.10658L9.27632 4.80063L9.06287 5.93292H9.1876L9.32903 5.79248L9.9035 5.0306L10.8671 3.82633L11.2923 3.34796L11.7886 2.82044L12.1074 2.56853H12.71L13.1536 3.22771L12.9551 3.90796L12.334 4.69354L11.8202 5.35975L11.0832 6.3516L10.6229 7.14508L10.6651 7.20828L10.7749 7.19774L12.4412 6.84401L13.3407 6.68075L14.415 6.49643L14.9007 6.72288L14.9534 6.95373L14.762 7.4242L13.6139 7.70771L12.2673 7.97718L10.261 8.45116L10.2364 8.46871L10.2645 8.50382L11.1684 8.58984L11.5549 8.61091H12.5009L14.2621 8.74257L14.7233 9.04627L15 9.41843L14.9534 9.70194L14.2446 10.0627L11.0551 9.3052L10.2891 9.11386H10.1837V9.17793L10.8214 9.80113L11.9906 10.8562L13.4549 12.2167L13.5287 12.5529L13.3407 12.8179L13.1422 12.7898L11.8562 11.8234L11.3599 11.3872L10.2355 10.4419H10.1618V10.5411L10.4209 10.9203L11.7886 12.9742L11.8588 13.6044L11.7604 13.8098L11.4056 13.9335L11.0156 13.8633L10.2153 12.7398L9.38964 11.4759L8.72293 10.3427L8.64124 10.3892L8.24771 14.6208L8.06325 14.8367L7.6381 15L7.2841 14.7305L7.09612 14.2952L7.2841 13.435L7.51073 12.3115L7.69519 11.4197L7.86209 10.3111L7.96047 9.94244L7.95344 9.91787L7.87263 9.9284L7.03551 11.0756L5.76358 12.7934L4.75693 13.8703L4.51625 13.966L4.09725 13.7492L4.13678 13.363L4.37044 13.0207L5.76358 11.2494L6.60334 10.1522L7.14531 9.51762L7.1418 9.42545H7.11018L3.41034 11.827L2.75154 11.9112L2.46693 11.6461L2.50207 11.2108L2.63734 11.0686L3.75028 10.3041L3.74677 10.3076Z"
      fill="currentColor"
    />
  </svg>
);

const MarkdownIcon = (properties: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={properties.className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...properties}
  >
    <rect height="18" rx="2" width="18" x="3" y="3" />
    <path d="M7 8v8M7 8l3 4L13 8v8M17 8v5h2L16.5 17 13.5 13H16V8" />
  </svg>
);

export function CopyDropdown({ rawMarkdown, pageTitle }: CopyDropdownProperties) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Modal states
  const [activeModal, setActiveModal] = useState<'markdown' | 'cursor' | 'vscode' | null>(null);

  const dropdownReference = useRef<HTMLDivElement>(null);
  const mcpUrl =
    globalThis.window === undefined
      ? ''
      : `${globalThis.location.protocol}//${globalThis.location.host}/api/mcp`;

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownReference.current && !dropdownReference.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toast auto-dismissal
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

  const handleOpenInAI = async (aiName: 'Claude' | 'ChatGPT', targetUrl: string) => {
    const prompt = `I am building a web app using IdeasUI (React component library built with Tailwind CSS v4 and React Aria).
Here is the documentation page for "${pageTitle}":

\`\`\`markdown
${rawMarkdown}
\`\`\`

I have the above context. Please help me with my task or question regarding this component:`;

    const isLocal =
      globalThis.window !== undefined &&
      (globalThis.location.hostname === 'localhost' ||
        globalThis.location.hostname === '127.0.0.1' ||
        globalThis.location.hostname.endsWith('.local'));

    if (isLocal) {
      try {
        await navigator.clipboard.writeText(prompt);

        setToast(
          `Copied context! Paste it when ${aiName} opens (Localhost cannot be read by AIs).`,
        );

        setIsOpen(false);

        setTimeout(() => {
          window.open(targetUrl, '_blank');
        }, 800);
      } catch (error) {
        console.error('Failed to copy prompt to clipboard:', error);
      }
    } else {
      const pathname =
        globalThis.window === undefined ? '' : globalThis.location.pathname.replace(/\/$/, '');

      const rawDocumentUrl =
        globalThis.window === undefined
          ? ''
          : `${globalThis.location.origin}${pathname.replace(/^\/react\/docs/, '/api/raw-doc')}.mdx`;

      const aiPrompt = `Read ${rawDocumentUrl}, I want to ask questions about it.`;

      const encodedPrompt = encodeURIComponent(aiPrompt);

      const queryParameter = aiName === 'ChatGPT' ? 'prompt' : 'q';

      const fullUrl = `${targetUrl}?${queryParameter}=${encodedPrompt}`;

      setToast(`Opening ${aiName} with raw doc reference...`);

      setIsOpen(false);

      setTimeout(() => {
        window.open(fullUrl, '_blank');
      }, 800);
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast(`Copied ${label} to clipboard!`);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <div ref={dropdownReference} className="relative inline-flex">
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

      {/* Main Split Button Container */}
      <div className="bg-surface-subtle inline-flex items-center rounded-3xl p-0.5 shadow-[0_1px_3px_rgba(0,0,0,0.01)] transition-all duration-300">
        {/* Left: Copy Main Button */}
        <button
          aria-label="Copy page as Markdown"
          className="text-content-secondary hover:text-content-primary focus-visible:ring-primary/40 inline-flex cursor-pointer items-center gap-1.5 rounded-l-2xl px-3.5 py-1.5 text-[11px] font-medium transition-all duration-200 outline-none select-none focus-visible:ring-1 active:scale-[0.98]"
          onClick={handleCopyMarkdown}
        >
          {copied ? (
            <>
              <Check className="animate-in fade-in zoom-in text-success size-3.5 duration-200" />
              <span className="text-success font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Copy Markdown</span>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="bg-content-secondary/15 h-3 w-[1px]" />

        {/* Right: Dropdown Toggle */}
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

      {/* Dropdown Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-surface/90 absolute top-full right-0 z-40 mt-2 w-72 rounded-2xl p-1.5 shadow-[0_12px_38px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {/* Options */}
            <div className="flex flex-col gap-0.5">
              {/* Option 1: View as Markdown */}
              <button
                className="group hover:bg-surface-subtle focus-visible:bg-surface-subtle flex w-full cursor-pointer items-start gap-3 rounded-xl p-2.5 text-left transition-all duration-200 outline-none"
                onClick={() => {
                  setActiveModal('markdown');
                  setIsOpen(false);
                }}
              >
                <div className="bg-surface-subtle text-content-secondary group-hover:bg-primary-subtle/15 group-hover:text-primary mt-0.5 rounded-lg p-1.5 transition-colors">
                  <MarkdownIcon className="size-4 transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex flex-col">
                  <span className="text-content-primary text-xs font-semibold">
                    View as Markdown
                  </span>
                  <span className="text-content-tertiary mt-0.5 text-[10px] leading-snug">
                    View page as Markdown format
                  </span>
                </div>
              </button>

              {/* Option 2: Add to Cursor (Temporarily Hidden)
              <button
                className="hover:bg-surface-muted/60 group focus-visible:bg-surface-muted/60 flex w-full cursor-pointer items-start gap-3 rounded-xl p-2.5 text-left transition-all duration-200 outline-none"
                onClick={() => {
                  setActiveModal('cursor');
                  setIsOpen(false);
                }}
              >
                <div className="bg-surface-muted/50 text-content-secondary group-hover:bg-primary-subtle/15 group-hover:text-primary mt-0.5 rounded-lg p-1.5 transition-colors">
                  <CursorIcon className="size-4 transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex flex-col">
                  <span className="text-content-primary text-xs font-semibold">Add to Cursor</span>
                  <span className="text-content-tertiary mt-0.5 text-[10px] leading-snug">
                    Install MCP Server on Cursor
                  </span>
                </div>
              </button>
              */}

              {/* Option 3: Add to VS Code (Temporarily Hidden)
              <button
                className="hover:bg-surface-muted/60 group focus-visible:bg-surface-muted/60 flex w-full cursor-pointer items-start gap-3 rounded-xl p-2.5 text-left transition-all duration-200 outline-none"
                onClick={() => {
                  setActiveModal('vscode');
                  setIsOpen(false);
                }}
              >
                <div className="bg-surface-muted/50 text-content-secondary group-hover:bg-primary-subtle/15 group-hover:text-primary mt-0.5 rounded-lg p-1.5 transition-colors">
                  <VSCodeIcon className="size-4 transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex flex-col">
                  <span className="text-content-primary text-xs font-semibold">Add to VS Code</span>
                  <span className="text-content-tertiary mt-0.5 text-[10px] leading-snug">
                    Install MCP Server on VS Code
                  </span>
                </div>
              </button>
              */}

              {/* Separator */}
              <div className="bg-content-secondary/10 my-1.5 h-[1px]" />

              {/* Option 4: Open in ChatGPT */}
              <button
                className="group hover:bg-surface-subtle focus-visible:bg-surface-subtle flex w-full cursor-pointer items-start gap-3 rounded-xl p-2.5 text-left transition-all duration-200 outline-none"
                onClick={() => handleOpenInAI('ChatGPT', 'https://chatgpt.com/')}
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

              {/* Option 5: Open in Claude */}
              <button
                className="group hover:bg-surface-subtle focus-visible:bg-surface-subtle flex w-full cursor-pointer items-start gap-3 rounded-xl p-2.5 text-left transition-all duration-200 outline-none"
                onClick={() => handleOpenInAI('Claude', 'https://claude.ai/new')}
              >
                <div className="bg-surface-subtle text-content-secondary group-hover:bg-primary-subtle/15 group-hover:text-primary mt-0.5 rounded-lg p-1.5 transition-colors">
                  <ClaudeIcon className="size-4 transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-content-primary text-xs font-semibold">
                      Open in Claude
                    </span>
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

      {/* Modals & Overlays */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              animate={{ opacity: 1 }}
              className="bg-background/50 absolute inset-0 backdrop-blur-md"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
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
                  {activeModal === 'markdown' && (
                    <>
                      <MarkdownIcon className="text-primary size-4.5" />
                      <span>Markdown View — {pageTitle}</span>
                    </>
                  )}
                  {activeModal === 'cursor' && (
                    <>
                      <CursorIcon className="text-primary size-4.5" />
                      <span>Install MCP Server on Cursor</span>
                    </>
                  )}
                  {activeModal === 'vscode' && (
                    <>
                      <VSCodeIcon className="text-primary size-4.5" />
                      <span>Install MCP Server on VS Code</span>
                    </>
                  )}
                </h3>
                <button
                  className="text-content-secondary hover:bg-surface-subtle hover:text-content-primary cursor-pointer rounded-lg p-1 transition-colors"
                  onClick={() => setActiveModal(null)}
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Body */}
              <div className="text-content-secondary flex-1 overflow-y-auto p-6 text-xs leading-relaxed">
                {activeModal === 'markdown' && (
                  <div className="relative">
                    <button
                      className="bg-surface/85 text-content-secondary hover:bg-surface hover:text-content-primary absolute top-3 right-3 z-10 inline-flex cursor-pointer items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold shadow-sm transition-all duration-200 active:scale-95"
                      onClick={() => copyToClipboard(rawMarkdown, 'Markdown content')}
                    >
                      <Copy className="size-3" />
                      <span>Copy Code</span>
                    </button>
                    <pre className="bg-surface-subtle text-content-secondary max-h-[55vh] overflow-x-auto rounded-xl p-5 font-mono text-[11px] leading-relaxed select-text">
                      <code>{rawMarkdown}</code>
                    </pre>
                  </div>
                )}

                {activeModal === 'cursor' && (
                  <div className="space-y-4">
                    <p className="text-content-secondary text-[13px] leading-normal">
                      Adding the **IdeasUI MCP Server** to Cursor enables the AI composer or agent
                      to dynamically consult component source codes and design tokens right from
                      your editor.
                    </p>

                    <div className="bg-surface-subtle space-y-3 rounded-xl p-4">
                      <h4 className="text-content-primary flex items-center gap-1.5 font-semibold">
                        <Terminal className="text-primary size-4" />
                        <span>MCP SSE Endpoint URL</span>
                      </h4>
                      <div className="flex items-center gap-2">
                        <code className="bg-surface-subtle text-content-primary flex-1 rounded-lg px-3 py-2 font-mono text-[11px] select-all">
                          {mcpUrl}
                        </code>
                        <button
                          className="bg-primary hover:bg-primary-600 inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-lg px-3 py-2 font-semibold text-white transition-all active:scale-95"
                          onClick={() => copyToClipboard(mcpUrl, 'MCP URL')}
                        >
                          <Copy className="size-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 space-y-2.5">
                      <h4 className="text-content-primary flex items-center gap-1.5 font-semibold">
                        <Monitor className="text-primary size-4" />
                        <span>Configuration Steps</span>
                      </h4>
                      <ol className="list-inside list-decimal space-y-2 pl-1.5">
                        <li>
                          Open Cursor **Settings** (
                          <kbd className="bg-surface-subtle rounded px-1.5 py-0.5 text-[10px]">
                            Cmd/Ctrl + ,
                          </kbd>
                          ).
                        </li>
                        <li>Navigate to **Features** in the sidebar, then scroll to **MCP**.</li>
                        <li>Click **+ Add New MCP Server**.</li>
                        <li>
                          Set the fields:
                          <ul className="text-content-tertiary mt-1 list-inside list-disc space-y-1 pl-4">
                            <li>
                              Name: <code className="bg-surface-subtle rounded px-1">IdeasUI</code>
                            </li>
                            <li>
                              Type: <code className="bg-surface-subtle rounded px-1">SSE</code>
                            </li>
                            <li>URL: Paste the copied endpoint URL from above</li>
                          </ul>
                        </li>
                        <li>
                          Click **Save** and wait for Cursor to successfully establish the
                          connection.
                        </li>
                      </ol>
                    </div>
                  </div>
                )}

                {activeModal === 'vscode' && (
                  <div className="space-y-4">
                    <p className="text-content-secondary text-[13px] leading-normal">
                      Install the **IdeasUI MCP Server** in VS Code (under extensions like Cline,
                      Roo Code, or other MCP-compatible clients) to give your AI assistants live
                      access to docs and styles.
                    </p>

                    <div className="bg-surface-subtle space-y-3 rounded-xl p-4">
                      <h4 className="text-content-primary flex items-center gap-1.5 font-semibold">
                        <MessageSquareCode className="text-primary size-4" />
                        <span>Cline/Roo Code Configuration</span>
                      </h4>
                      <p className="text-content-tertiary text-[11px] leading-snug">
                        Paste the following configuration into your MCP settings file (typically at{' '}
                        <code className="bg-surface-subtle rounded px-1 font-mono select-all">
                          ~/Library/Application
                          Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json
                        </code>
                        ):
                      </p>

                      <div className="relative">
                        <button
                          className="bg-surface/85 text-content-secondary hover:bg-surface hover:text-content-primary absolute top-3 right-3 z-10 inline-flex cursor-pointer items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold shadow-sm transition-all duration-200 active:scale-95"
                          onClick={() => {
                            const configString = JSON.stringify(
                              {
                                mcpServers: {
                                  'ideasui-mcp': {
                                    type: 'sse',
                                    url: mcpUrl,
                                  },
                                },
                              },
                              null,
                              2,
                            );

                            copyToClipboard(configString, 'VS Code configuration JSON');
                          }}
                        >
                          <Copy className="size-3" />
                          <span>Copy Config</span>
                        </button>
                        <pre className="bg-surface-muted/50 text-content-secondary overflow-x-auto rounded-xl p-4 font-mono text-[10px]">
                          <code>
                            {JSON.stringify(
                              {
                                mcpServers: {
                                  'ideasui-mcp': {
                                    type: 'sse',
                                    url: mcpUrl,
                                  },
                                },
                              },
                              null,
                              2,
                            )}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

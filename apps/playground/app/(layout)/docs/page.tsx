'use client';
import type { JSX, ReactNode } from 'react';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  FileText,
  Book,
  ExternalLink,
  Search,
  Loader,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Menu,
  X,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@ideasui/button';
import { cn } from '@ideasui/utils';

interface DocumentFile {
  name: string;
  path: string;
  description: string;
}

const DOC_FILES: DocumentFile[] = [
  {
    name: 'README.md',
    path: '../../README.md',
    description: 'Main project architecture & package map overview',
  },
  {
    name: 'ARCHITECTURE.md',
    path: '../../ARCHITECTURE.md',
    description: 'System architecture & allowed dependency flow',
  },
  {
    name: 'COMPONENT_CHECKLIST.md',
    path: '../../docs/COMPONENT_CHECKLIST.md',
    description: 'Step-by-step component creation & release checklist',
  },
  {
    name: 'design-tokens.md',
    path: '../../rules/design-tokens.md',
    description: 'OKLCH color system & design token usage rules',
  },
  {
    name: 'component-development.md',
    path: '../../rules/component-development.md',
    description: 'Component anatomy, slots, and ref forwarding patterns',
  },
  {
    name: 'accessibility.md',
    path: '../../rules/accessibility.md',
    description: 'WCAG 2.1 AA accessibility rules & React Aria integration',
  },
  {
    name: 'project-structure.md',
    path: '../../rules/project-structure.md',
    description: 'Package map & folder structure standards',
  },
  {
    name: 'tailwind-theme.md',
    path: '../../rules/tailwind-theme.md',
    description: 'Tailwind CSS v4 plugin & recipe styling guide',
  },
  {
    name: 'naming-conventions.md',
    path: '../../rules/naming-conventions.md',
    description: 'Naming conventions for props, types, and CSS classes',
  },
  {
    name: 'code-quality.md',
    path: '../../rules/code-quality.md',
    description: 'Code quality metrics, complexity, and file size limits',
  },
  {
    name: 'typescript-quality.md',
    path: '../../rules/typescript-quality.md',
    description: 'TypeScript strict mode standards & JSDoc guidelines',
  },
];

interface CodeSnippetProperties {
  readonly children?: ReactNode;
  readonly className?: string;
}

function CodeSnippet({ children, className }: Readonly<CodeSnippetProperties>): JSX.Element {
  const [copied, setCopied] = useState(false);
  const codeText = String(children ?? '').replace(/\n$/, '');

  const onCopy = (): void => {
    void navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isInline = !className?.includes('language-');

  if (isInline) {
    return (
      <code className="bg-primary-subtle text-primary border-primary/20 rounded-md border px-1.5 py-0.5 font-mono text-xs font-semibold">
        {children}
      </code>
    );
  }

  const lang = className?.replace('language-', '') ?? '';

  return (
    <div className="group relative my-6 overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950 text-slate-100 shadow-md">
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/80 px-4 py-2 text-xs text-slate-400">
        <span className="font-mono font-semibold text-slate-300">{lang || 'code'}</span>
        <Button
          isIconOnly
          aria-label={copied ? 'Copied code' : 'Copy code'}
          className="text-slate-400 hover:text-white"
          size="sm"
          variant="ghost"
          onPress={onCopy}
        >
          {copied ? <Check className="text-success size-3.5" /> : <Copy className="size-3.5" />}
        </Button>
      </div>
      <pre className="custom-scrollbar overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-200">
        <code>{codeText}</code>
      </pre>
    </div>
  );
}

/* Stable markdown components object defined OUTSIDE DocsPage component to prevent re-renders & flickering */
const markdownComponents = {
  code: CodeSnippet,
  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="text-content-primary border-border/60 mt-2 mb-6 border-b pb-3 text-3xl font-extrabold tracking-tight md:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="text-content-primary border-border/40 mt-8 mb-4 border-b pb-2 text-2xl font-bold tracking-tight">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="text-content-primary mt-6 mb-3 text-xl font-bold">{children}</h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="text-content-secondary my-3 text-base leading-relaxed">{children}</p>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="text-content-secondary my-3 list-disc space-y-1.5 pl-6">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="text-content-secondary my-3 list-decimal space-y-1.5 pl-6">{children}</ol>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="border-primary bg-primary-subtle/30 text-content-secondary my-6 rounded-r-2xl border-l-4 px-5 py-3 font-medium italic shadow-2xs">
      {children}
    </blockquote>
  ),
  table: ({ children }: { children?: ReactNode }) => (
    <div className="border-border bg-surface my-6 overflow-x-auto rounded-2xl border shadow-xs">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: ReactNode }) => (
    <thead className="bg-surface-subtle text-content-primary border-border border-b font-bold">
      {children}
    </thead>
  ),
  th: ({ children }: { children?: ReactNode }) => (
    <th className="text-content-primary px-4 py-3 font-bold">{children}</th>
  ),
  td: ({ children }: { children?: ReactNode }) => (
    <td className="border-border-subtle/40 text-content-secondary border-b px-4 py-3">
      {children}
    </td>
  ),
  a: ({ href, children }: { href?: string; children?: ReactNode }) => (
    <a
      className="text-primary font-semibold underline underline-offset-4 transition-opacity hover:opacity-80"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  ),
};

export default function DocsPage(): JSX.Element {
  const [selectedDocument, setSelectedDocument] = useState<DocumentFile>(DOC_FILES[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [documentContent, setDocumentContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [docCopied, setDocCopied] = useState(false);

  // In-memory cache for instant document switching without blinking
  const docCacheReference = useRef<Map<string, string>>(new Map());

  const getDocument = useCallback(async (docPath: string) => {
    // Return cached document content instantly if available
    const cached = docCacheReference.current.get(docPath);

    if (cached) {
      setDocumentContent(cached);
      setLoading(false);

      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/docs?file=${encodeURIComponent(docPath)}`);

      if (!res.ok) {
        throw new Error('Failed to load document');
      }

      const data = await res.json();

      docCacheReference.current.set(docPath, data.content);
      setDocumentContent(data.content);
    } catch (error_) {
      setError(error_ instanceof Error ? error_.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDocument.path) {
      void getDocument(selectedDocument.path);
    }
  }, [getDocument, selectedDocument.path]);

  const onCopyDocument = (): void => {
    if (documentContent) {
      void navigator.clipboard.writeText(documentContent);
      setDocCopied(true);
      setTimeout(() => setDocCopied(false), 2000);
    }
  };

  const filteredDocs = DOC_FILES.filter(
    (document_) =>
      document_.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document_.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      className={cn(
        'text-content-primary min-h-screen transition-colors duration-300 ease-in-out',
        isFullScreen && 'bg-background fixed inset-0 z-50 overflow-y-auto p-4 md:p-8',
      )}
    >
      <div
        className={cn(
          'animate-in fade-in slide-in-from-bottom-4 mx-auto flex flex-col gap-6 duration-700 lg:flex-row',
          isFullScreen ? 'max-w-full' : 'max-w-7xl p-4 md:p-8',
        )}
      >
        {/* Sidebar */}
        <div
          className={cn(
            sidebarOpen ? 'block' : 'hidden',
            'w-full lg:block lg:w-80',
            isFullScreen && 'hidden lg:hidden',
          )}
        >
          <div className="border-border-subtle bg-surface/80 sticky top-6 rounded-3xl border p-6 shadow-sm backdrop-blur-md transition-all duration-300">
            {/* Header */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="from-primary to-secondary shadow-primary/20 rounded-xl bg-gradient-to-br p-2.5 shadow-md">
                  <FileText className="text-on-primary size-5" />
                </div>
                <h3 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-xl font-bold tracking-tight text-transparent">
                  Documentation
                </h3>
              </div>
              <p className="text-content-tertiary text-xs font-semibold tracking-widest uppercase">
                Browse project guides
              </p>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="text-content-tertiary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <input
                className="border-border-subtle bg-surface text-content-primary placeholder:text-content-muted focus:border-border-focus focus:ring-primary/20 w-full rounded-xl border py-2.5 pr-4 pl-10 text-sm font-medium transition-all outline-none focus:ring-2"
                placeholder="Search docs..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* File List */}
            <div className="custom-scrollbar max-h-96 space-y-1.5 overflow-y-auto pr-2">
              {filteredDocs.map((document_) => (
                <button
                  key={document_.name}
                  className={`w-full rounded-xl border p-3.5 text-left transition-all duration-200 ${
                    selectedDocument.name === document_.name
                      ? 'border-border-focus bg-primary-subtle shadow-sm'
                      : 'hover:border-border-subtle hover:bg-surface-muted border-transparent'
                  }`}
                  type="button"
                  onClick={() => setSelectedDocument(document_)}
                >
                  <div className="flex items-start gap-3">
                    <FileText
                      className={`mt-0.5 size-4.5 flex-shrink-0 transition-colors ${
                        selectedDocument.name === document_.name
                          ? 'text-primary'
                          : 'text-content-tertiary'
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <div
                        className={`truncate text-sm font-bold transition-colors ${
                          selectedDocument.name === document_.name
                            ? 'text-primary'
                            : 'text-content-secondary hover:text-content-primary'
                        }`}
                      >
                        {document_.name}
                      </div>
                      <div className="text-content-tertiary mt-1 line-clamp-2 text-xs font-medium">
                        {document_.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
              {filteredDocs.length === 0 && (
                <div className="text-content-tertiary py-6 text-center text-sm font-medium">
                  No docs found
                </div>
              )}
            </div>

            {/* External Links */}
            <div className="border-border-subtle mt-8 border-t pt-6">
              <h4 className="text-content-tertiary mb-4 text-xs font-bold tracking-widest uppercase">
                Resources
              </h4>
              <a
                className="text-content-secondary hover:text-primary flex items-center gap-2.5 text-sm font-semibold transition-colors"
                href="https://github.com/ideas2logic-lab/ideasui"
                rel="noopener noreferrer"
                target="_blank"
              >
                <ExternalLink className="size-4.5" />
                GitHub Repository
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="min-w-0 flex-1">
          {/* Reader Header */}
          <div className="border-border-subtle bg-surface mb-6 rounded-3xl border p-6 shadow-sm transition-all duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="from-primary to-secondary shadow-primary/20 rounded-xl bg-gradient-to-br p-3 shadow-md">
                  <Book className="text-on-primary size-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-content-primary text-2xl font-extrabold tracking-tight md:text-3xl">
                      {selectedDocument.name}
                    </h1>
                    {loading ? <Loader className="text-primary size-4 animate-spin" /> : null}
                  </div>
                  <p className="text-content-tertiary mt-1 text-xs font-medium sm:text-sm">
                    {selectedDocument.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button color="neutral" size="sm" variant="soft" onPress={onCopyDocument}>
                  {docCopied ? (
                    <Check className="text-success size-4" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                  <span className="hidden sm:inline">{docCopied ? 'Copied' : 'Copy MD'}</span>
                </Button>

                <Button
                  isIconOnly
                  aria-label={isFullScreen ? 'Exit Full Screen' : 'Full Screen View'}
                  color="neutral"
                  size="sm"
                  variant="soft"
                  onPress={() => setIsFullScreen(!isFullScreen)}
                >
                  {isFullScreen ? (
                    <Minimize2 className="size-4" />
                  ) : (
                    <Maximize2 className="size-4" />
                  )}
                </Button>

                {!isFullScreen && (
                  <Button
                    isIconOnly
                    aria-label={sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
                    className="lg:hidden"
                    color="neutral"
                    size="sm"
                    variant="ghost"
                    onPress={() => setSidebarOpen(!sidebarOpen)}
                  >
                    {sidebarOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Reader Container */}
          <div className="border-border-subtle bg-surface relative min-h-[65vh] overflow-hidden rounded-3xl border shadow-sm transition-all duration-300">
            {/* Error State */}
            {error && !loading ? (
              <div className="border-border-danger bg-danger-subtle/30 border-b p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-danger shadow-danger/40 mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full shadow-sm" />
                  <div>
                    <h3 className="text-on-danger-subtle font-bold">Error loading document</h3>
                    <p className="text-on-danger-subtle/80 mt-1.5 text-sm font-medium">{error}</p>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Smooth Non-Blinking Content Container */}
            <div
              className={cn(
                'prose prose-base text-content-primary max-w-none p-6 transition-opacity duration-200 md:p-10',
                loading && 'pointer-events-none opacity-60',
              )}
            >
              <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                {documentContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

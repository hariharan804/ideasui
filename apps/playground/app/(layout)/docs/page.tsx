'use client';
import type { JSX } from 'react';

import { useState, useEffect, useCallback } from 'react';
import { FileText, Book, ExternalLink, Search, Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface DocumentFile {
  name: string;
  path: string;
  description: string;
}

const DOC_FILES: DocumentFile[] = [
  { name: 'README.md', path: '../../README.md', description: 'Main project documentation' },
  { name: 'ARCHITECTURE.md', path: '../../ARCHITECTURE.md', description: 'System Architecture' },
  {
    name: 'CONTRIBUTING.md',
    path: '../../CONTRIBUTING.md',
    description: 'Contribution guidelines',
  },
  {
    name: 'DESIGN_TOKEN_RULES.md',
    path: '../../docs/DESIGN_TOKEN_RULES.md',
    description: 'CSS variables and theming rules',
  },
  {
    name: 'COMPONENT_STANDARDS.md',
    path: '../../docs/COMPONENT_STANDARDS.md',
    description: 'Component development standards',
  },
  {
    name: 'DEVELOPMENT_SETUP.md',
    path: '../../docs/DEVELOPMENT_SETUP.md',
    description: 'Local development guide',
  },
  {
    name: 'TESTING_GUIDE.md',
    path: '../../docs/TESTING_GUIDE.md',
    description: 'Quality assurance guide',
  },
];

export default function DocsPage(): JSX.Element {
  const [selectedDocument, setSelectedDocument] = useState<DocumentFile>(DOC_FILES[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [documentContent, setDocumentContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getDocument = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/docs?file=${encodeURIComponent(selectedDocument.path)}`);

      if (!res.ok) {
        throw new Error('Failed to load document');
      }

      const data = await res.json();

      setDocumentContent(data.content);
    } catch (error_) {
      setError(error_ instanceof Error ? error_.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [selectedDocument.path]);

  useEffect(() => {
    if (selectedDocument.path) {
      const timer = setTimeout(() => {
        getDocument();
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [getDocument, selectedDocument.path]);

  const filteredDocs = DOC_FILES.filter(
    (document_) =>
      document_.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document_.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="text-content-primary min-h-screen transition-colors duration-300 ease-in-out">
      <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto flex max-w-7xl flex-col gap-6 p-4 duration-700 md:p-8 lg:flex-row">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} w-full lg:block lg:w-80`}>
          <div className="border-border-subtle bg-surface/80 sticky top-6 rounded-3xl border p-8 shadow-sm backdrop-blur-md transition-all duration-300">
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
          {/* Header */}
          <div className="border-border-subtle bg-surface mb-6 rounded-3xl border p-8 shadow-sm transition-all duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="from-primary to-secondary shadow-primary/20 rounded-xl bg-gradient-to-br p-3 shadow-md">
                  <Book className="text-on-primary size-6" />
                </div>
                <div>
                  <h1 className="text-content-primary text-3xl font-extrabold tracking-tight md:text-4xl">
                    {selectedDocument.name}
                  </h1>
                  <p className="text-content-tertiary mt-2 text-sm font-medium">
                    {selectedDocument.description}
                  </p>
                </div>
              </div>
              <button
                className="border-border-subtle bg-surface-muted text-content-secondary hover:bg-surface-strong hover:text-content-primary rounded-lg border px-4 py-2 text-sm font-bold transition-colors lg:hidden"
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? 'Hide' : 'Show'} Sidebar
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="border-border-subtle bg-surface min-h-[60vh] overflow-hidden rounded-3xl border shadow-sm transition-all duration-300">
            {/* Loading State */}
            {loading ? (
              <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                  <Loader className="text-primary mx-auto mb-4 h-8 w-8 animate-spin" />
                  <p className="text-content-secondary text-sm font-semibold">
                    Loading documentation...
                  </p>
                </div>
              </div>
            ) : null}

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

            {/* Content */}
            {!loading && !error && (
              <div className="prose prose-base prose-headings:scroll-mt-24 prose-h1:text-4xl prose-h1:font-extrabold prose-h1:text-content-primary prose-h1:tracking-tight prose-h1:mt-2 prose-h1:mb-8 prose-h2:text-3xl prose-h2:font-bold prose-h2:text-content-primary prose-h2:tracking-tight prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-border-base prose-h2:pb-4 prose-h3:text-2xl prose-h3:font-bold prose-h3:text-content-primary prose-h3:mt-8 prose-h3:mb-4 prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-code:bg-primary-subtle prose-code:text-primary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-lg prose-code:font-mono prose-code:text-[0.9em] prose-code:font-bold prose-code:before:content-none prose-code:after:content-none prose-pre:bg-surface-inverse prose-pre:text-content-inverse prose-pre:border prose-pre:border-border-base prose-pre:rounded-2xl prose-pre:shadow-lg prose-pre:p-6 prose-pre:my-8 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-surface-subtle prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:text-content-secondary prose-blockquote:font-medium prose-blockquote:italic prose-blockquote:shadow-sm prose-strong:text-content-primary prose-strong:font-bold prose-ul:list-disc prose-ol:list-decimal prose-li:text-content-secondary prose-li:marker:text-primary prose-p:text-content-secondary prose-p:leading-relaxed prose-p:text-lg prose-table:border-collapse prose-table:w-full prose-table:my-8 prose-table:text-left prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-sm prose-table:border prose-table:border-border-base prose-thead:bg-surface-subtle prose-th:border-b-2 prose-th:border-border prose-th:px-6 prose-th:py-4 prose-th:font-bold prose-th:text-content-primary prose-td:border-b prose-td:border-border-base prose-td:px-6 prose-td:py-4 prose-td:text-content-secondary prose-tr:transition-colors hover:prose-tr:bg-surface-subtle/50 prose-img:rounded-2xl prose-img:border prose-img:border-border-base prose-img:shadow-sm max-w-none p-8 transition-colors md:p-12">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{documentContent}</ReactMarkdown>
              </div>
            )}

            {/* Footer */}
          </div>
        </div>
      </div>
    </div>
  );
}

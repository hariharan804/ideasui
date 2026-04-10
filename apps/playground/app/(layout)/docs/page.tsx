'use client';
import type { JSX } from 'react';

import { useState, useEffect, useCallback } from 'react';
import { FileText, Book, ExternalLink, Search, Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface DocFile {
  name: string;
  path: string;
  description: string;
}

const DOC_FILES: DocFile[] = [
  { name: 'README.md', path: 'README.md', description: 'Main project documentation' },
  {
    name: 'CONTRIBUTING.md',
    path: '../../../../CONTRIBUTING.md',
    description: 'Contribution guidelines',
  },
  // {
  //   name: "COMPONENT_GUIDELINES.md",
  //   path: "docs/COMPONENT_GUIDELINES.md",
  //   description: "Component development standards",
  // },
  {
    name: 'NAMING_CONVENTIONS.md',
    path: '../../docs/NAMING_CONVENTIONS.md',
    description: 'Naming rules and cases',
  },
  {
    name: 'TESTING_STRATEGY.md',
    path: 'docs/TESTING_STRATEGY.md',
    description: 'Quality assurance guide',
  },
  { name: 'BUILD_DEPLOYMENT.md', path: 'docs/BUILD_DEPLOYMENT.md', description: 'Release process' },
  {
    name: 'API_DOCUMENTATION.md',
    path: 'docs/API_DOCUMENTATION.md',
    description: 'Component reference',
  },
];

export default function DocsPage(): JSX.Element {
  const [selectedDoc, setSelectedDoc] = useState<DocFile>(DOC_FILES[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [docContent, setDocContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getDoc = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/docs?file=${encodeURIComponent(selectedDoc.path)}`);

      if (!res.ok) {
        throw new Error('Failed to load document');
      }

      const data = await res.json();

      setDocContent(data.content);
    } catch (error_) {
      setError(error_ instanceof Error ? error_.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [selectedDoc.path]);

  useEffect(() => {
    if (selectedDoc.path) {
      getDoc();
    }
  }, [getDoc, selectedDoc.path]);

  const filteredDocs = DOC_FILES.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="text-content-primary min-h-screen transition-colors duration-300 ease-in-out">
      <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto flex max-w-7xl flex-col gap-6 p-4 duration-700 md:p-8 lg:flex-row">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} w-full lg:block lg:w-80`}>
          <div className="border-default bg-surface-elevated/80 sticky top-6 rounded-3xl border p-8 shadow-sm backdrop-blur-md transition-all duration-300">
            {/* Header */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="from-primary-500 to-secondary-500 shadow-primary-500/20 rounded-xl bg-gradient-to-br p-2.5 shadow-md">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h3 className="from-primary-600 to-secondary-600 bg-gradient-to-r bg-clip-text text-xl font-bold tracking-tight text-transparent">
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
                className="border-default bg-surface-base text-content-primary focus:border-primary-500 focus:ring-primary-500/20 placeholder:text-content-muted w-full rounded-xl border py-2.5 pr-4 pl-10 text-sm font-medium transition-all outline-none focus:ring-2"
                placeholder="Search docs..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* File List */}
            <div className="custom-scrollbar max-h-96 space-y-1.5 overflow-y-auto pr-2">
              {filteredDocs.map((doc) => (
                <button
                  key={doc.name}
                  className={`w-full rounded-xl border p-3.5 text-left transition-all duration-200 ${
                    selectedDoc.name === doc.name
                      ? 'border-primary-300 bg-primary-subtle shadow-sm'
                      : 'hover:border-default hover:bg-surface-muted border-transparent'
                  }`}
                  onClick={() => setSelectedDoc(doc)}
                >
                  <div className="flex items-start gap-3">
                    <FileText
                      className={`mt-0.5 h-4.5 w-4.5 flex-shrink-0 transition-colors ${
                        selectedDoc.name === doc.name ? 'text-primary-600' : 'text-content-tertiary'
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <div
                        className={`truncate text-sm font-bold transition-colors ${
                          selectedDoc.name === doc.name
                            ? 'text-primary-700'
                            : 'text-content-secondary hover:text-content-primary'
                        }`}
                      >
                        {doc.name}
                      </div>
                      <div className="text-content-tertiary mt-1 line-clamp-2 text-xs font-medium">
                        {doc.description}
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
            <div className="border-default mt-8 border-t pt-6">
              <h4 className="text-content-tertiary mb-4 text-xs font-bold tracking-widest uppercase">
                Resources
              </h4>
              <a
                className="text-content-secondary hover:text-primary-500 flex items-center gap-2.5 text-sm font-semibold transition-colors"
                href="https://github.com/ideas2logic-lab/ideasui"
                rel="noopener noreferrer"
                target="_blank"
              >
                <ExternalLink className="h-4.5 w-4.5" />
                GitHub Repository
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="border-default bg-surface-elevated mb-6 rounded-3xl border p-8 shadow-sm transition-all duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="from-primary-500 to-secondary-500 shadow-primary-500/20 rounded-xl bg-gradient-to-br p-3 shadow-md">
                  <Book className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-content-primary text-3xl font-extrabold tracking-tight md:text-4xl">
                    {selectedDoc.name}
                  </h1>
                  <p className="text-content-tertiary mt-2 text-sm font-medium">
                    {selectedDoc.description}
                  </p>
                </div>
              </div>
              <button
                className="bg-surface-muted border-default text-content-secondary hover:bg-surface-strong hover:text-content-primary rounded-lg border px-4 py-2 text-sm font-bold transition-colors lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? 'Hide' : 'Show'} Sidebar
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="border-default bg-surface-base min-h-[60vh] overflow-hidden rounded-3xl border shadow-sm transition-all duration-300">
            {/* Loading State */}
            {loading ? (
              <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                  <Loader className="text-primary-500 mx-auto mb-4 h-8 w-8 animate-spin" />
                  <p className="text-content-secondary text-sm font-semibold">
                    Loading documentation...
                  </p>
                </div>
              </div>
            ) : null}

            {/* Error State */}
            {error && !loading ? (
              <div className="border-danger-subtle bg-danger-subtle/30 border-b p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-danger-500 shadow-danger-500/40 mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full shadow-sm" />
                  <div>
                    <h3 className="text-danger-700 font-bold">Error loading document</h3>
                    <p className="text-danger-600 mt-1.5 text-sm font-medium">{error}</p>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Content */}
            {!loading && !error && (
              <div className="prose prose-sm prose-headings:scroll-mt-24 prose-h1:text-4xl prose-h1:font-extrabold prose-h1:text-content-primary prose-h1:tracking-tight prose-h1:mt-10 prose-h1:mb-6 prose-h2:text-3xl prose-h2:font-bold prose-h2:text-content-primary prose-h2:tracking-tight prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-2xl prose-h3:font-bold prose-h3:text-content-secondary prose-h3:mt-6 prose-h3:mb-3 prose-a:text-info-500 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-code:bg-surface-muted prose-code:text-primary-600 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-semibold prose-pre:bg-surface-inverse prose-pre:text-content-inverse prose-pre:border prose-pre:border-default prose-pre:shadow-inner prose-pre:rounded-xl prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-surface-sunken prose-blockquote:py-1 prose-blockquote:pl-5 prose-blockquote:text-content-secondary prose-blockquote:font-medium prose-blockquote:italic prose-strong:text-content-primary prose-strong:font-bold prose-li:text-content-secondary prose-p:text-content-secondary prose-p:leading-relaxed prose-table:border-collapse prose-table:w-full prose-table:my-8 prose-th:bg-surface-muted prose-th:border-b-2 prose-th:border-default prose-th:px-5 prose-th:py-3 prose-th:font-semibold prose-th:text-content-primary prose-th:text-left prose-td:border-b prose-td:border-default prose-td:px-5 prose-td:py-4 prose-td:text-content-secondary max-w-none p-8 md:p-12">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{docContent}</ReactMarkdown>
              </div>
            )}

            {/* Footer */}
            {/* {!loading && !error && (
              <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 md:px-8">
                <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-600">
                  <div>
                    Found an issue?{" "}
                    <a href="#" className="font-medium text-blue-600 hover:underline">
                      Edit on GitHub
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="font-medium text-blue-600 transition-colors hover:text-blue-700">
                      Share
                    </button>
                    <button className="font-medium text-blue-600 transition-colors hover:text-blue-700">
                      Print
                    </button>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

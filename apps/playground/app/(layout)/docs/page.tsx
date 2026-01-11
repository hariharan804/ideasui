'use client';

import { useState, useEffect } from 'react';
import { FileText, Book, ExternalLink, Search, Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useCallback } from 'react';

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

export default function DocsPage() {
  const [selectedDoc, setSelectedDoc] = useState<DocFile>(DOC_FILES[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [docContent, setDocContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getDoc = useCallback(() => {
    setLoading(true);
    setError('');

    fetch(`/api/docs?file=${encodeURIComponent(selectedDoc.path)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load document');
        return res.json();
      })
      .then((data) => setDocContent(data.content))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedDoc.path]);

  useEffect(() => {
    if (selectedDoc.path) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getDoc();
    }
  }, [getDoc, selectedDoc.path]);

  const filteredDocs = DOC_FILES.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 md:p-8 lg:flex-row">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} w-full lg:block lg:w-80`}>
          <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg backdrop-blur-sm">
            {/* Header */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 p-2">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent">
                  Documentation
                </h3>
              </div>
              <p className="text-xs text-slate-500">Browse project guides</p>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search docs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-200 py-2 pr-4 pl-10 text-sm transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* File List */}
            <div className="max-h-96 space-y-2 overflow-y-auto">
              {filteredDocs.map((doc) => (
                <button
                  key={doc.name}
                  onClick={() => setSelectedDoc(doc)}
                  className={`w-full rounded-lg border p-3 text-left transition-all ${
                    selectedDoc.name === doc.name
                      ? 'border-blue-300 bg-gradient-to-r from-blue-100 to-purple-100 shadow-sm'
                      : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <FileText
                      className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                        selectedDoc.name === doc.name ? 'text-blue-600' : 'text-slate-400'
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <div
                        className={`truncate text-sm font-medium ${
                          selectedDoc.name === doc.name ? 'text-blue-700' : 'text-slate-700'
                        }`}
                      >
                        {doc.name}
                      </div>
                      <div className="mt-1 line-clamp-2 text-xs text-slate-500">
                        {doc.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
              {filteredDocs.length === 0 && (
                <div className="py-4 text-center text-sm text-slate-500">No docs found</div>
              )}
            </div>

            {/* External Links */}
            <div className="mt-6 border-t border-slate-200 pt-6">
              <h4 className="mb-3 text-xs font-semibold tracking-wide text-slate-700 uppercase">
                Resources
              </h4>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-blue-600"
              >
                <ExternalLink className="h-4 w-4" />
                GitHub Repository
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 p-2">
                  <Book className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                    {selectedDoc.name}
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">{selectedDoc.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 lg:hidden"
              >
                {sidebarOpen ? 'Hide' : 'Show'} Sidebar
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
            {/* Loading State */}
            {loading && (
              <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                  <Loader className="mx-auto mb-3 h-8 w-8 animate-spin text-blue-500" />
                  <p className="text-slate-600">Loading documentation...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="border-b border-red-200 bg-red-50 p-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-red-500" />
                  <div>
                    <h3 className="font-semibold text-red-900">Error loading document</h3>
                    <p className="mt-1 text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            {!loading && !error && (
              <div className="prose prose-sm prose-headings:scroll-mt-20 prose-h1:text-3xl prose-h1:font-bold prose-h1:text-slate-900 prose-h1:mt-8 prose-h1:mb-4 prose-h2:text-2xl prose-h2:font-bold prose-h2:text-slate-800 prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-xl prose-h3:font-semibold prose-h3:text-slate-700 prose-h3:mt-4 prose-h3:mb-2 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:bg-slate-100 prose-code:text-red-600 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:border prose-pre:border-slate-700 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:pl-4 prose-blockquote:text-slate-700 prose-strong:text-slate-900 prose-strong:font-semibold prose-li:text-slate-700 prose-table:border-collapse prose-table:w-full prose-th:bg-slate-100 prose-th:border prose-th:border-slate-300 prose-th:px-4 prose-th:py-2 prose-td:border prose-td:border-slate-300 prose-td:px-4 prose-td:py-2 max-w-none p-6 md:p-8">
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

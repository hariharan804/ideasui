import type { JSX } from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Grid, List } from 'lucide-react';

// ### IMPORT COMPONENT HERE ###

interface ComponentItem {
  name: string;
  category?: string;
}

/**
 * Add your components here...
 */
const COMPONENT_LIST: ComponentItem[] = [
  // ### APPEND COMPONENT HERE ###

  {
    name: 'Button',
    category: 'Form',
  },
];

const categories = Array.from(new Set(COMPONENT_LIST.map((item) => item.category).filter(Boolean)));

function Playground(): JSX.Element {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const navigateToComponent = (name: string): void => {
    router.push(`/playground/${name.toLowerCase()}`);
  };

  const filteredComponents = COMPONENT_LIST.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-background text-content-primary relative min-h-screen overflow-hidden pt-12 transition-colors duration-500">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden outline-none">
        <div className="bg-primary-500/10 absolute -top-[10%] left-[20%] h-[600px] w-[600px] animate-pulse rounded-full opacity-50 mix-blend-normal blur-3xl transition-all duration-[4000ms] dark:mix-blend-screen" />
      </div>

      <div className="relative z-10">
        {/* Header Title Section */}
        <div className="animate-slideIn container mx-auto mb-10 px-6 text-center sm:text-left">
          <h1 className="text-content-primary mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Components
          </h1>
          <p className="text-content-secondary max-w-2xl text-lg">
            Browse our collection of interactive, fully accessible UI components built with the
            IdeasUI design system.
          </p>
        </div>

        {/* Filters */}
        <div className="container mx-auto px-6 pb-8">
          <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative max-w-md flex-1">
              <Search className="text-content-muted absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform" />
              <input
                className="border-border-subtle bg-surface-subtle text-content-primary placeholder:text-content-muted focus:border-primary-500 focus:ring-primary-500/20 w-full rounded-2xl border py-3.5 pr-4 pl-12 text-base shadow-sm transition-all focus:ring-4 focus:outline-none"
                placeholder="Search components..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Category Filter */}
              <select
                className="border-border-subtle bg-surface-subtle text-content-primary focus:border-primary-500 focus:ring-primary-500/20 cursor-pointer rounded-2xl border px-5 py-3.5 text-base shadow-sm transition-all focus:ring-4 focus:outline-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="border-border-subtle bg-surface-subtle flex items-center rounded-2xl border p-1.5 shadow-sm">
                <button
                  className={`rounded-xl p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-primary-500 text-white shadow-md' : 'text-content-muted hover:bg-surface hover:text-content-primary'}`}
                  title="Grid View"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="size-5" />
                </button>
                <button
                  className={`rounded-xl p-2.5 transition-colors ${viewMode === 'list' ? 'bg-primary-500 text-white shadow-md' : 'text-content-muted hover:bg-surface hover:text-content-primary'}`}
                  title="List View"
                  onClick={() => setViewMode('list')}
                >
                  <List className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Components Grid/List */}
        <main className="container mx-auto px-6 pb-16">
          {filteredComponents.length === 0 ? (
            <div className="border-border-subtle bg-surface-subtle mt-4 rounded-2xl border py-20 text-center backdrop-blur-sm">
              <Search className="text-content-muted mx-auto mb-4 h-12 w-12 opacity-50" />
              <h3 className="text-content-primary mb-2 text-xl font-bold tracking-tight">
                No components found
              </h3>
              <p className="text-content-secondary">
                Try adjusting your search or category filter.
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
                  : 'mt-4 space-y-4'
              }
            >
              {filteredComponents.map((item, index) => (
                <div
                  key={item.name}
                  className={`group border-border-default animate-slideIn bg-surface-subtle hover:border-primary-500 hover:bg-surface-muted hover:shadow-primary-500/20 cursor-pointer overflow-hidden rounded-2xl border p-6 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-8 ${
                    viewMode === 'list' ? 'flex items-center gap-6' : 'flex h-full flex-col'
                  }`}
                  role="button"
                  style={{ animationDelay: `${index * 50}ms` }}
                  tabIndex={0}
                  onClick={() => navigateToComponent(item.name)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      navigateToComponent(item.name);
                    }
                  }}
                >
                  <div
                    className={`${viewMode === 'list' ? 'flex flex-1 items-center justify-between' : 'flex flex-1 flex-col justify-between'}`}
                  >
                    <div
                      className={`${viewMode === 'list' ? 'flex items-center gap-4' : 'mb-6 flex items-start justify-between'}`}
                    >
                      <h3 className="text-content-primary group-hover:text-primary-500 text-2xl font-bold tracking-tight transition-colors">
                        {item.name}
                      </h3>
                      {item.category ? (
                        <span className="border-primary-500/20 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full border px-3 py-1 text-xs font-bold tracking-wider uppercase">
                          {item.category}
                        </span>
                      ) : null}
                    </div>

                    <div className="border-border-subtle bg-surface text-content-primary group-hover:bg-primary-500 flex items-center gap-2 self-start rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 group-hover:border-transparent group-hover:text-white group-hover:shadow-md">
                      View Component
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Playground;

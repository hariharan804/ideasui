import type { JSX } from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Grid, List, Sparkles, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';
import { Button } from '@ideasui/button';

// ### IMPORT COMPONENT HERE ###

interface ComponentItem {
  name: string;
  category?: string;
  description?: string;
  status?: 'stable' | 'beta' | 'new';
}

/**
 * Add your components here...
 */
const COMPONENT_LIST: ComponentItem[] = [
  // ### APPEND COMPONENT HERE ###

  {
    name: 'Radio',
    category: 'Core',
  },

  {
    name: 'Checkbox',
    category: 'Core',
  },

  {
    name: 'InputField',
    category: 'Core',
  },

  {
    name: 'Text',
    category: 'Core',
  },

  {
    name: 'Button',
    category: 'Form',
    description: 'High-performance interactive trigger button with React Aria accessibility.',
    status: 'stable',
  },
];

const categories = [
  'All',
  ...new Set(COMPONENT_LIST.map((item) => item.category).filter(Boolean) as string[]),
];

function Playground(): JSX.Element {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const navigateToComponent = (name: string): void => {
    router.push(`/playground/${name.toLowerCase()}`);
  };

  const filteredComponents = COMPONENT_LIST.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Boolean(item.description?.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return Boolean(matchesSearch && matchesCategory);
  });

  return (
    <div className="bg-background text-content-primary relative min-h-[calc(100vh-4rem)] overflow-hidden pt-8 pb-16 transition-colors duration-300">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden outline-none">
        <div className="bg-primary/10 absolute -top-[10%] right-[10%] size-[500px] animate-pulse rounded-full opacity-40 blur-3xl" />
        <div className="bg-secondary/10 absolute top-[40%] -left-[10%] size-[600px] animate-pulse rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="bg-primary-subtle text-primary mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold shadow-2xs">
              <Sparkles className="size-3.5" />
              <span>Interactive Component Explorer</span>
            </div>
            <h1 className="text-content-primary text-3xl font-extrabold tracking-tight sm:text-4xl">
              Component Showcase
            </h1>
            <p className="text-content-secondary mt-1 max-w-2xl text-base">
              Explore accessible, production-ready React components powered by IdeasUI design
              tokens.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              color="primary"
              size="sm"
              variant="soft"
              onPress={() => router.push('/design-system')}
            >
              <Layers className="size-4" />
              <span>Design Tokens</span>
            </Button>
          </div>
        </div>

        {/* Filter Controls Bar (Borderless) */}
        <div className="bg-surface/80 mb-8 rounded-3xl p-4 shadow-sm backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="text-content-muted absolute top-1/2 left-4 size-4.5 -translate-y-1/2" />
              <input
                className="bg-surface-subtle text-content-primary placeholder:text-content-muted focus:ring-primary/20 w-full rounded-2xl border-none py-3 pr-4 pl-11 text-sm shadow-inner transition-all focus:ring-2 focus:outline-none"
                placeholder="Search components..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery ? (
                <button
                  className="text-content-muted hover:text-content-primary absolute top-1/2 right-3 -translate-y-1/2 text-xs font-medium"
                  type="button"
                  onClick={() => setSearchQuery('')}
                >
                  Clear
                </button>
              ) : null}
            </div>

            {/* Category Pills & View Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 md:justify-end">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-on-primary shadow-xs'
                        : 'text-content-secondary hover:bg-surface-muted hover:text-content-primary'
                    }`}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="bg-surface-subtle flex items-center rounded-2xl p-1 shadow-2xs">
                <button
                  className={`rounded-xl p-2 transition-all ${
                    viewMode === 'grid'
                      ? 'bg-surface text-primary shadow-xs'
                      : 'text-content-muted hover:text-content-primary'
                  }`}
                  title="Grid View"
                  type="button"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="size-4" />
                </button>
                <button
                  className={`rounded-xl p-2 transition-all ${
                    viewMode === 'list'
                      ? 'bg-surface text-primary shadow-xs'
                      : 'text-content-muted hover:text-content-primary'
                  }`}
                  title="List View"
                  type="button"
                  onClick={() => setViewMode('list')}
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Components Grid / List (Borderless Cards) */}
        {filteredComponents.length === 0 ? (
          <div className="bg-surface/80 my-12 rounded-3xl p-12 text-center shadow-xs backdrop-blur-md">
            <Search className="text-content-muted mx-auto mb-3 size-10 opacity-40" />
            <h3 className="text-content-primary mb-1 text-lg font-bold">No matching components</h3>
            <p className="text-content-secondary text-sm">
              Try adjusting your search criteria or select &quot;All&quot; categories.
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
                : 'flex flex-col gap-4'
            }
          >
            {filteredComponents.map((item) => (
              <div
                key={item.name}
                className="bg-surface/80 hover:bg-surface group relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 shadow-xs backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Header info */}
                <div>
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary-subtle text-primary rounded-lg px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider uppercase shadow-2xs">
                        {item.category || 'Component'}
                      </span>
                      {item.status ? (
                        <span className="bg-success-subtle text-success flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-semibold">
                          <CheckCircle2 className="size-3" />
                          {item.status}
                        </span>
                      ) : null}
                    </div>

                    <ArrowRight className="text-content-muted group-hover:text-primary size-4 transition-all duration-200 group-hover:translate-x-1" />
                  </div>

                  <h2 className="text-content-primary group-hover:text-primary mb-2 text-2xl font-extrabold transition-colors">
                    {item.name}
                  </h2>
                  <p className="text-content-secondary text-sm leading-relaxed">
                    {item.description ||
                      'Explore interactive props, accessibility features, and live preview.'}
                  </p>
                </div>

                {/* Footer preview action */}
                <div className="mt-8 flex items-center justify-between pt-4">
                  <span className="text-content-muted font-mono text-xs">
                    @ideasui/{item.name.toLowerCase()}
                  </span>
                  <Button
                    color="primary"
                    size="sm"
                    variant="soft"
                    onClick={() => navigateToComponent(item.name)}
                  >
                    Open Sandbox
                    <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Playground;

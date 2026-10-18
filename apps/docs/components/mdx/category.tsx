'use client';

import * as React from 'react';
import { Search, X, Layers } from 'lucide-react';
import { cn } from '@ideasui/utils';
import { InputField } from '@ideasui/react';
import type { StatusChipStatus } from './status-chip';
import { Item } from './item';
import { getComponentInfo } from '@/components-registry';

const COMPONENT_GROUPS = [
  {
    category: 'Buttons',
    title: 'Buttons & Actions',
    components: ['button', 'button-group', 'close-button', 'toggle-button', 'toggle-button-group'],
  },
  {
    category: 'Forms',
    title: 'Forms & Inputs',
    components: [
      'checkbox',
      'checkbox-group',
      'description',
      'error-message',
      'form',
      'input',
      'input-field',
      'input-otp',
      'label',
      'radio',
      'radio-group',
      'search-field',
      'switch',
      'textfield',
      'textarea',
    ],
  },
  {
    category: 'Media',
    title: 'Media & Display',
    components: ['image', 'avatar', 'divider'],
  },
  {
    category: 'Typography',
    title: 'Typography',
    components: ['text', 'kbd'],
  },
  {
    category: 'Navigation',
    title: 'Navigation',
    components: ['accordion', 'breadcrumbs', 'disclosure', 'link', 'pagination', 'tabs'],
  },
  {
    category: 'Feedback',
    title: 'Feedback',
    components: ['alert', 'meter', 'progressbar', 'progresscircle', 'skeleton', 'spinner'],
  },
  {
    category: 'Layout',
    title: 'Layout',
    components: ['card', 'separator', 'surface', 'toolbar'],
  },
] as const;

interface ComponentWithStatus {
  component: NonNullable<ReturnType<typeof getComponentInfo>>;
  status?: StatusChipStatus;
}

interface ActiveGroup {
  category: string;
  title: string;
  components: ComponentWithStatus[];
}

interface CategoryProperties {
  category?: string;
}

function getComponentWithStatus(name: string): ComponentWithStatus | null {
  const componentInfo = getComponentInfo(name);

  if (!componentInfo) return null;

  const status: StatusChipStatus | undefined = componentInfo.status
    ? (componentInfo.status as StatusChipStatus)
    : undefined;

  return { component: componentInfo, status };
}

function filterGroupComponents(
  groups: readonly {
    readonly category: string;
    readonly title: string;
    readonly components: readonly string[];
  }[],
  searchQuery: string,
): ActiveGroup[] {
  const query = searchQuery.trim().toLowerCase();

  return groups
    .map((group) => {
      const items = group.components
        .map((element) => getComponentWithStatus(element))
        .filter((item): item is ComponentWithStatus => {
          if (!item) return false;
          if (!query) return true;
          const { name, title, description } = item.component;

          return (
            name.toLowerCase().includes(query) ||
            title.toLowerCase().includes(query) ||
            description.toLowerCase().includes(query)
          );
        });

      return {
        category: group.category,
        title: group.title,
        components: items,
      };
    })
    .filter((g) => g.components.length > 0);
}

function CategoryToolbar({
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount,
}: Readonly<{
  searchQuery: string;
  onSearchChange: (val: string) => void;
  totalCount: number;
  filteredCount: number;
}>) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="w-full max-w-sm">
        <InputField
          aria-label="Filter components"
          endContent={
            searchQuery ? (
              <button
                aria-label="Clear filter"
                className="text-content-tertiary hover:text-content-primary cursor-pointer p-0.5 transition-colors"
                type="button"
                onClick={() => onSearchChange('')}
              >
                <X className="h-4 w-4" />
              </button>
            ) : null
          }
          placeholder="Filter components..."
          size="sm"
          startContent={<Search className="text-content-tertiary h-4 w-4 shrink-0" />}
          value={searchQuery}
          variant="outline"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="text-content-muted flex items-center gap-2 text-xs font-medium">
        <Layers className="h-3.5 w-3.5" />
        <span>
          {filteredCount === totalCount
            ? `${totalCount} components available`
            : `${filteredCount} of ${totalCount} components`}
        </span>
      </div>
    </div>
  );
}

function CategoryTabs({
  tabs,
  selectedTab,
  onTabSelect,
}: Readonly<{
  tabs: { id: string; label: string; count: number }[];
  selectedTab: string;
  onTabSelect: (id: string) => void;
}>) {
  return (
    <div className="border-border/40 flex flex-wrap items-center gap-1.5 border-b pb-3">
      {tabs.map((tab) => {
        const isSelected = selectedTab === tab.id;

        return (
          <button
            key={tab.id}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
              isSelected
                ? 'bg-primary-subtle text-primary shadow-xs'
                : 'text-content-muted hover:text-content-primary hover:bg-surface-subtle/40',
            )}
            type="button"
            onClick={() => onTabSelect(tab.id)}
          >
            <span>{tab.label}</span>
            <span
              className={cn(
                'py-0.2 rounded-full px-1.5 text-[10px] font-semibold',
                isSelected ? 'bg-primary/10 text-primary' : 'bg-surface text-content-muted',
              )}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function Category(properties: Readonly<CategoryProperties>) {
  const { category } = properties;
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedTab, setSelectedTab] = React.useState('all');

  const baseGroups = React.useMemo(() => {
    return filterGroupComponents(COMPONENT_GROUPS, '');
  }, []);

  const totalCount = React.useMemo(() => {
    return baseGroups.reduce((acc, g) => acc + g.components.length, 0);
  }, [baseGroups]);

  const activeGroups = React.useMemo(() => {
    const filtered = filterGroupComponents(COMPONENT_GROUPS, searchQuery);

    if (category && category !== 'all') {
      return filtered.filter((g) => g.category.toLowerCase() === category.toLowerCase());
    }
    if (selectedTab !== 'all') {
      return filtered.filter((g) => g.category.toLowerCase() === selectedTab.toLowerCase());
    }

    return filtered;
  }, [category, selectedTab, searchQuery]);

  const filteredCount = React.useMemo(() => {
    return activeGroups.reduce((acc, g) => acc + g.components.length, 0);
  }, [activeGroups]);

  const tabs = React.useMemo(() => {
    const list = [{ id: 'all', label: 'All', count: totalCount }];

    for (const g of baseGroups) {
      list.push({ id: g.category.toLowerCase(), label: g.title, count: g.components.length });
    }

    return list;
  }, [baseGroups, totalCount]);

  if (baseGroups.length === 0) return null;

  return (
    <div className="not-prose my-6 flex flex-col gap-6">
      <CategoryToolbar
        filteredCount={filteredCount}
        searchQuery={searchQuery}
        totalCount={totalCount}
        onSearchChange={setSearchQuery}
      />

      {(!category || category === 'all') && (
        <CategoryTabs selectedTab={selectedTab} tabs={tabs} onTabSelect={setSelectedTab} />
      )}

      {activeGroups.length === 0 ? (
        <div className="border-border/60 rounded-2xl border border-dashed p-8 text-center">
          <p className="text-content-muted text-sm">
            No components found matching &ldquo;{searchQuery}&rdquo;
          </p>
          <button
            className="text-primary mt-2 text-xs font-medium hover:underline"
            type="button"
            onClick={() => setSearchQuery('')}
          >
            Clear filter
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {activeGroups.map(({ category: groupCategory, title, components }) => (
            <div key={groupCategory} className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <h2 className="text-content-primary text-base font-semibold tracking-tight">
                  {title}
                </h2>
                <span className="text-content-muted bg-surface-subtle rounded-full px-2 py-0.5 text-xs font-medium">
                  {components.length}
                </span>
              </div>

              <div
                className="grid gap-5"
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                }}
              >
                {components.map(({ component, status }) => (
                  <Item
                    key={component.name}
                    component={component}
                    openInNewTab={false}
                    status={status}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Category.displayName = 'IdeasUI.Category';

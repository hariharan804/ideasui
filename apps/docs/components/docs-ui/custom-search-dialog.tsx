'use client';

import { useI18n } from 'fumadocs-ui/contexts/i18n';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  TagsList,
  TagsListItem,
} from 'fumadocs-ui/components/dialog/search';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { fetchClient } from 'fumadocs-core/search/client/fetch';
import { useMemo, useState } from 'react';

interface CustomSearchDialogProps extends Omit<
  React.ComponentProps<typeof SearchDialog>,
  'children' | 'search' | 'onSearchChange'
> {
  readonly api?: string;
  readonly defaultTag?: string;
  readonly delayMs?: number;
  readonly allowClear?: boolean;
  readonly tags?: { name: string; value: string }[];
  readonly links?: [string, string][];
  readonly footer?: React.ReactNode;
}

export function CustomSearchDialog({
  api,
  defaultTag,
  tags = [],
  delayMs,
  allowClear = false,
  links = [],
  footer,
  ...props
}: Readonly<CustomSearchDialogProps>) {
  const { locale } = useI18n();
  const [tag, setTag] = useState(defaultTag);

  const client = useMemo(
    () =>
      fetchClient({
        api,
        locale,
        tag,
      }),
    [api, locale, tag],
  );

  const { search, setSearch, query } = useDocsSearch({
    client,
    delayMs,
  });

  const defaultItems = useMemo(() => {
    const activeLinks =
      links.length > 0
        ? links
        : [
            ['Button Component', '/react/docs/components/button'],
            ['Button Group', '/react/docs/components/button-group'],
            ['Installation Guide', '/react/docs/start/installation'],
            ['Design Tokens', '/react/docs/start/tokens'],
            ['Dark Mode Integration', '/react/docs/start/dark-mode'],
          ];

    return activeLinks.map(([name, link]) => ({
      type: 'page' as const,
      id: name,
      content: name,
      url: link,
    }));
  }, [links]);

  return (
    <SearchDialog isLoading={query.isLoading} search={search} onSearchChange={setSearch} {...props}>
      {/* Overlay */}
      <SearchDialogOverlay className="data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fd-fade-out bg-pure/60 fixed inset-0 z-[99999] backdrop-blur-2xl transition-opacity" />

      {/* Dialog Card */}
      <SearchDialogContent className="ideasui-search-dialog text-content-primary data-[state=closed]:animate-fd-fade-out data-[state=open]:animate-fd-fade-in fixed inset-0 top-0 right-0 bottom-0 left-0 z-[99999] m-auto flex h-fit max-h-[85vh] w-[calc(100vw-2rem)] max-w-2xl translate-x-0 translate-y-0 flex-col overflow-hidden rounded-2xl border-0 shadow-2xl backdrop-blur-2xl transition-all sm:max-h-[80vh]">
        {/* ── Search Header ── */}
        <SearchDialogHeader className="ideasui-search-header flex flex-row items-center gap-3 px-4 py-3.5">
          {/* Icon with gradient ring on focus */}
          <div className="ideasui-search-icon-wrap relative flex shrink-0 items-center justify-center">
            <SearchDialogIcon className="text-primary relative z-10 size-[18px] shrink-0 transition-all duration-200" />
          </div>

          {/* Input */}
          <SearchDialogInput
            className="text-content-primary placeholder:text-content-tertiary/60 w-0 flex-1 bg-transparent text-sm font-medium outline-none sm:text-base"
            placeholder="Search docs, components, tokens…"
          />

          {/* Loading indicator */}
          {query.isLoading && (
            <span className="flex items-center gap-1">
              <span className="bg-primary/50 size-1.5 animate-bounce rounded-full [animation-delay:0ms]" />
              <span className="bg-primary/50 size-1.5 animate-bounce rounded-full [animation-delay:150ms]" />
              <span className="bg-primary/50 size-1.5 animate-bounce rounded-full [animation-delay:300ms]" />
            </span>
          )}

          {/* ESC close badge */}
          <SearchDialogClose className="ideasui-search-close text-content-tertiary hover:text-content-primary rounded-md border-0 px-1.5 py-0.5 font-mono text-[10px] font-semibold transition-all" />
        </SearchDialogHeader>

        {/* ── Divider ── */}
        <div className="ideasui-search-divider mx-4 h-px shrink-0" />

        {/* ── Results area ── */}
        <div className="ideasui-search-list flex-1 overflow-y-auto px-2 py-2">
          {/* Section label when showing quick links */}
          {!search && (
            <p className="text-content-tertiary/70 mb-1.5 px-2 text-[10px] font-semibold tracking-widest uppercase">
              Quick Navigation
            </p>
          )}
          <SearchDialogList items={query.data === 'empty' ? defaultItems : query.data} />
        </div>

        {/* ── Footer ── */}
        <SearchDialogFooter className="ideasui-search-footer flex items-center justify-between px-4 py-2.5">
          {tags.length > 0 && (
            <TagsList allowClear={allowClear} tag={tag} onTagChange={setTag}>
              {tags.map((t) => (
                <TagsListItem key={t.value} value={t.value}>
                  {t.name}
                </TagsListItem>
              ))}
            </TagsList>
          )}

          {/* Keyboard shortcuts */}
          <span className="flex items-center gap-3 text-[10px]">
            {(
              [
                ['↑↓', 'Navigate'],
                ['↵', 'Select'],
                ['ESC', 'Close'],
              ] as const
            ).map(([key, label]) => (
              <span
                key={label}
                className="text-content-tertiary flex items-center gap-1 font-medium"
              >
                <kbd className="ideasui-kbd rounded px-1.5 py-[3px] font-mono text-[9px] font-bold">
                  {key}
                </kbd>
                {label}
              </span>
            ))}
          </span>

          {/* Branding */}
          <span className="text-content-tertiary/50 hidden text-[10px] font-semibold tracking-widest uppercase sm:block">
            {footer ?? 'IdeasUI'}
          </span>
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  );
}

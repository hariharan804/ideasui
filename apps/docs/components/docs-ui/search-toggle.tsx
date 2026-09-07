'use client';

import type { ButtonProps } from 'fumadocs-ui/components/ui/button';
import type { ComponentProps } from 'react';

import { useEffect, useMemo, useRef } from 'react';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { useTranslations } from '@fuma-translate/react';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { cn } from '@ideasui/utils';

import { Search } from '@/components/docs-ui/icons';

interface SearchToggleProperties extends Omit<ComponentProps<'button'>, 'color'>, ButtonProps {
  readonly hideIfDisabled?: boolean;
}

export function SearchToggle({
  color = 'ghost',
  hideIfDisabled,
  size = 'icon-sm',
  ...properties
}: Readonly<SearchToggleProperties>) {
  const { enabled, setOpenSearch } = useSearchContext();

  if (hideIfDisabled && !enabled) {
    return null;
  }

  return (
    <button
      aria-label="Open Search"
      className={cn(
        buttonVariants({
          color,
          size,
        }),
        properties.className,
      )}
      data-search=""
      type="button"
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search />
    </button>
  );
}

export function DynamicSearchToggle({
  hideIfDisabled,
  ...properties
}: ComponentProps<'button'> & {
  hideIfDisabled?: boolean;
}) {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();
  const t = useTranslations({ note: 'search trigger' });
  const textReference = useRef<HTMLSpanElement>(null);
  const cursorReference = useRef<HTMLSpanElement>(null);

  const placeholders = useMemo(
    () => [
      t('Search'),
      'Search components',
      'Search buttons',
      'Search tables',
      'Search hooks',
      'Search themes',
    ],
    [t],
  );

  useEffect(() => {
    let placeholderIndex = 0;
    let displayText = '';
    let isDeleting = false;
    let typingSpeed = 150;
    let timer: ReturnType<typeof setTimeout>;

    const handleTyping = () => {
      const currentPhrase = placeholders[placeholderIndex];

      if (isDeleting) {
        displayText = currentPhrase.slice(0, Math.max(0, displayText.length - 1));
        typingSpeed = 50;
      } else {
        displayText = currentPhrase.slice(0, Math.max(0, displayText.length + 1));
        typingSpeed = 100;
      }

      if (textReference.current) {
        textReference.current.textContent = displayText;
      }

      if (cursorReference.current) {
        cursorReference.current.style.display = displayText ? 'inline-block' : 'none';
      }

      if (!isDeleting && displayText === currentPhrase) {
        // Pause at the end
        isDeleting = true;
        typingSpeed = 2000;
      } else if (isDeleting && displayText === '') {
        isDeleting = false;
        placeholderIndex = (placeholderIndex + 1) % placeholders.length;
        typingSpeed = 500; // Small pause before starting next word
      }

      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [placeholders]);

  if (hideIfDisabled && !enabled) {
    return null;
  }

  return (
    <button
      data-search-full=""
      type="button"
      {...properties}
      className={cn(
        'group bg-surface-muted text-content-secondary hover:text-content-primary inline-flex h-8 w-full max-w-[320px] items-center gap-2 rounded-full px-3 text-xs font-medium backdrop-blur-md transition-all duration-200 select-none hover:scale-105 sm:text-sm',
        properties.className,
      )}
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search className="text-content-tertiary group-hover:text-content-primary size-4 shrink-0 transition-transform duration-200 group-hover:scale-105" />
      <span className="text-content-tertiary relative flex min-w-0 flex-1 items-center overflow-hidden whitespace-nowrap">
        <span ref={textReference} className="truncate whitespace-nowrap" />
        <span
          ref={cursorReference}
          className="bg-content-tertiary ml-0.5 inline-block h-3.5 w-0.5 shrink-0 animate-pulse rounded-xs"
        />
      </span>
      <div className="ms-auto flex shrink-0 items-center gap-1 transition-opacity">
        {hotKey.map((k) => (
          <kbd
            key={String(k.display)}
            className="bg-surface text-content-tertiary inline-flex h-5 min-w-5 items-center justify-center rounded-md px-1.5 font-mono text-[10px] font-semibold tracking-wider uppercase shadow-2xs"
          >
            {k.display === 'Control' ? 'Ctrl' : k.display}
          </kbd>
        ))}
      </div>
    </button>
  );
}

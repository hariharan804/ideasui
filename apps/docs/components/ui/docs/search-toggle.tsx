/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-syntax */
'use client';

import type { ButtonProps } from 'fumadocs-ui/components/ui/button';
import type { ComponentProps } from 'react';

import { useState, useEffect, useMemo } from 'react';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { cn } from '@ideasui/utils';

import { Search } from '@/components/ui/docs/icons';

interface SearchToggleProps extends Omit<ComponentProps<'button'>, 'color'>, ButtonProps {
  hideIfDisabled?: boolean;
}

export function SearchToggle({
  color = 'ghost',
  hideIfDisabled,
  size = 'icon-sm',
  ...props
}: SearchToggleProps) {
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
        props.className,
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
  ...props
}: ComponentProps<'button'> & {
  hideIfDisabled?: boolean;
}) {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();
  const { text } = useI18n();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const placeholders = useMemo(
    () => [
      text.search,
      'Search components',
      'Search buttons',
      'Search tables',
      'Search hooks',
      'Search themes',
    ],
    [text.search],
  );

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = placeholders[placeholderIndex];

      if (isDeleting) {
        setDisplayText((prev) => prev.substring(0, prev.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        setTypingSpeed(100);
      }

      if (!isDeleting && displayText === currentPhrase) {
        // Pause at the end
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        setTypingSpeed(500); // Small pause before starting next word
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, placeholderIndex, placeholders, typingSpeed]);

  if (hideIfDisabled && !enabled) {
    return null;
  }

  return (
    <button
      data-search-full=""
      type="button"
      {...props}
      className={cn(
        'bg-background text-content-secondary hover:text-content-primary group inline-flex w-full max-w-[320px] items-center gap-2.5 rounded-xl px-4 py-1.5 text-sm shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md',
        props.className,
      )}
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search className="size-4 opacity-70 transition-opacity duration-300 group-hover:scale-110 group-hover:opacity-100" />
      <span className="text-content-secondary/70 font-medium transition-all duration-300">
        {displayText}
        {displayText ? (
          <span className="bg-content-tertiary absolute ml-0.5 inline-block h-4 w-0.5 animate-pulse rounded-xs" />
        ) : null}
      </span>
      <div className="ms-auto flex items-center gap-1 transition-opacity">
        {hotKey.map((k, i) => (
          <kbd
            key={i}
            className="bg-surface text-content-secondary inline-flex h-5 min-w-5 items-center justify-center rounded-md px-1.5 text-xs font-bold tracking-wider uppercase"
          >
            {k.display === 'Control' ? 'Ctrl' : k.display}
          </kbd>
        ))}
      </div>
    </button>
  );
}

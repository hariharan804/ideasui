'use client';

import type { ButtonProps } from 'fumadocs-ui/components/ui/button';
import type { ComponentProps } from 'react';

import { useEffect, useMemo, useRef } from 'react';
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
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

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
    let placeholderIndex = 0;
    let displayText = '';
    let isDeleting = false;
    let typingSpeed = 150;
    let timer: ReturnType<typeof setTimeout>;

    const handleTyping = () => {
      const currentPhrase = placeholders[placeholderIndex];

      if (isDeleting) {
        displayText = currentPhrase.substring(0, displayText.length - 1);
        typingSpeed = 50;
      } else {
        displayText = currentPhrase.substring(0, displayText.length + 1);
        typingSpeed = 100;
      }

      if (textRef.current) {
        textRef.current.textContent = displayText;
      }

      if (cursorRef.current) {
        cursorRef.current.style.display = displayText ? 'inline-block' : 'none';
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
      {...props}
      className={cn(
        'bg-background text-content-secondary hover:text-content-primary group inline-flex w-full max-w-[320px] items-center gap-2.5 rounded px-2 py-1.5 text-sm shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md',
        props.className,
      )}
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search className="size-4 opacity-70 transition-opacity duration-300 group-hover:scale-110 group-hover:opacity-100" />
      <span className="text-content-secondary/70 relative font-medium transition-all duration-300">
        <span ref={textRef} />
        <span
          ref={cursorRef}
          className="bg-content-tertiary absolute top-[2px] ml-0.5 inline-block h-[14px] w-0.5 animate-pulse rounded-xs"
        />
      </span>
      <div className="ms-auto flex items-center gap-1 transition-opacity">
        {hotKey.map((k) => (
          <kbd
            key={String(k.display)}
            className="bg-surface text-content-secondary inline-flex h-5 min-w-5 items-center justify-center rounded-md px-2 text-xs font-bold tracking-wider uppercase"
          >
            {k.display === 'Control' ? 'Ctrl' : k.display}
          </kbd>
        ))}
      </div>
    </button>
  );
}

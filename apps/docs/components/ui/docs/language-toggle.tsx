'use client';

import type { ComponentProps } from 'react';

import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { cn } from '@ideasui/utils';

export type LanguageSelectProps = ComponentProps<'button'>;

export function LanguageToggle(props: LanguageSelectProps): React.ReactElement {
  const context = useI18n();

  if (!context.locales) {
    throw new Error('Missing `<I18nProvider />`');
  }

  return (
    <Popover>
      <PopoverTrigger
        aria-label={context.text.chooseLanguage}
        {...props}
        className={cn(
          buttonVariants({
            className: 'gap-1.5 p-1.5',
            color: 'ghost',
          }),
          props.className,
        )}
      >
        {props.children}
      </PopoverTrigger>
      <PopoverContent className="flex flex-col overflow-x-hidden p-0">
        <p className="text-content-secondary mb-1 p-2 text-xs font-medium">
          {context.text.chooseLanguage}
        </p>
        {context.locales.map((item) => (
          <button
            key={item.locale}
            className={cn(
              'p-2 text-start text-sm',
              item.locale === context.locale
                ? 'bg-primary/10 text-primary font-medium'
                : 'hover:bg-primary hover:text-on-primary',
            )}
            type="button"
            onClick={() => {
              context.onChange?.(item.locale);
            }}
          >
            {item.name}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export function LanguageToggleText(props: ComponentProps<'span'>) {
  const context = useI18n();
  const text = context.locales?.find((item) => item.locale === context.locale)?.name;

  return <span {...props}>{text}</span>;
}

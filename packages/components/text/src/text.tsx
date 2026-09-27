import type { TextElement, TextProps, TextVariant } from './text.types';
import type { CSSProperties, JSX } from 'react';

import { forwardRef } from 'react';
import { text } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

const VARIANT_ELEMENT_MAP: Record<TextVariant, TextElement> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  lead: 'p',
  label: 'span',
  caption: 'span',
  overline: 'span',
  helper: 'span',
  code: 'code',
};

/**
 * Text renders a theme-aware, semantic typography primitive with responsive variant control.
 *
 * @example
 * ```tsx
 * <Text variant="body" size="md" color="primary">
 *   Hello IdeasUI
 * </Text>
 * ```
 */
export const Text = forwardRef<HTMLElement, TextProps>((props, reference): JSX.Element => {
  const {
    as,
    variant = 'body',
    size,
    weight,
    color,
    align,
    truncate = false,
    lineClamp,
    slot,
    className,
    classNames,
    slotProps,
    style,
    children,
    ...properties
  } = props;

  const defaultComponent = VARIANT_ELEMENT_MAP[variant];
  const Component = as ?? defaultComponent;
  const isLineClamped = typeof lineClamp === 'number' && lineClamp > 0;
  const isTruncated = !isLineClamped && truncate;

  const computedStyle = isLineClamped
    ? ({ ...slotProps?.base?.style, ...style, '--ideasui-line-clamp': lineClamp } as CSSProperties)
    : { ...slotProps?.base?.style, ...style };

  return (
    <Component
      ref={reference}
      {...slotProps?.base}
      {...properties}
      className={cn(
        text({
          variant,
          size,
          weight,
          color,
          align,
          truncate: isTruncated,
          lineClamp: isLineClamped,
        }),
        className,
        classNames?.base,
        slotProps?.base?.className,
      )}
      data-slot="text"
      slot={slot ?? undefined}
      style={computedStyle}
    >
      {children}
    </Component>
  );
});

Text.displayName = 'IdeasUI.Text';

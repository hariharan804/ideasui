'use client';

import { useLayoutEffect, useCallback } from 'react';

export interface UseTextareaAutoResizeOptions {
  readonly autoResize?: boolean;
  readonly minRows?: number;
  readonly maxRows?: number;
  readonly value?: string | number | readonly string[];
}

export function useTextareaAutoResize(
  textareaRef: React.RefObject<HTMLTextAreaElement | null>,
  options: UseTextareaAutoResizeOptions = {},
): () => void {
  const { autoResize = true, minRows = 3, maxRows, value } = options;

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;

    if (!textarea || !autoResize) {
      return;
    }

    const computedStyle = globalThis.getComputedStyle(textarea);
    const lineHeightStr = computedStyle.lineHeight;
    const fontSize = Number.parseFloat(computedStyle.fontSize) || 16;
    const lineHeight =
      lineHeightStr === 'normal'
        ? fontSize * 1.5
        : Number.parseFloat(lineHeightStr) || fontSize * 1.5;

    const paddingTop = Number.parseFloat(computedStyle.paddingTop) || 0;
    const paddingBottom = Number.parseFloat(computedStyle.paddingBottom) || 0;
    const borderTop = Number.parseFloat(computedStyle.borderTopWidth) || 0;
    const borderBottom = Number.parseFloat(computedStyle.borderBottomWidth) || 0;
    const verticalPadding = paddingTop + paddingBottom + borderTop + borderBottom;

    // Reset height temporarily to get accurate scrollHeight
    // eslint-disable-next-line react-compiler/react-compiler
    textarea.style.height = 'auto';

    const scrollHeight = textarea.scrollHeight;
    const minHeight = minRows ? minRows * lineHeight + verticalPadding : 0;
    const maxHeight = maxRows ? maxRows * lineHeight + verticalPadding : Number.POSITIVE_INFINITY;

    const targetHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);

    textarea.style.height = `${targetHeight}px`;

    textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [autoResize, minRows, maxRows, textareaRef]);

  // Adjust on value changes or resize
  useLayoutEffect(() => {
    adjustHeight();
  }, [adjustHeight, value]);

  // Adjust on window resize
  useLayoutEffect(() => {
    if (!autoResize) {
      return;
    }

    const handleWindowResize = (): void => {
      adjustHeight();
    };

    globalThis.addEventListener('resize', handleWindowResize);

    return (): void => {
      globalThis.removeEventListener('resize', handleWindowResize);
    };
  }, [adjustHeight, autoResize]);

  return adjustHeight;
}

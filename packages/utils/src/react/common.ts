import { cn } from '../style/tailwind';
import * as React from 'react';

/**
 * Merge multiple refs into a single ref callback
 * @internal - Use mergeRefs from main utils instead
 */
export function mergeRefs<T = any>(
  ...refs: Array<React.RefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null) {
        (ref as any).current = node;
      }
    });
  };
}

/**
 * Merges multiple props objects together.
 * - Handles `className` and `class` merging via `cn`
 * - Merges `style` objects
 * - Merges `ref` callbacks
 * - Chains event handlers (functions starting with `on`)
 * - Overrides other props with the latest value
 */
export function mergeProps(
  ...objects: Array<Record<string, any> | undefined>
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const obj of objects) {
    if (!obj) continue;

    for (const key in obj) {
      const value = obj[key];

      if (key === 'className' || key === 'class') {
        result.className = cn(result.className, value);
      } else if (key === 'style') {
        result.style = { ...(result.style || {}), ...(value || {}) };
      } else if (key === 'ref') {
        const existing = result.ref;
        result.ref = existing ? mergeRefs(existing, value) : value;
      } else if (key.startsWith('on') && typeof value === 'function') {
        const existing = result[key];
        if (typeof existing === 'function') {
          result[key] = (...args: any[]) => {
            existing(...args);
            value(...args);
          };
        } else {
          result[key] = value;
        }
      } else {
        result[key] = value;
      }
    }
  }

  return result;
}

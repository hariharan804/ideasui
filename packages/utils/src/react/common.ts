/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RefObject, LegacyRef, RefCallback, MutableRefObject } from 'react';

import { cn } from '../style/tailwind';

/**
 * Merge multiple refs into a single ref callback
 * @param {Array<RefObject<T> | LegacyRef<T>>} refs - The refs to merge
 * @returns {RefCallback<T>} A ref callback that updates all passed refs
 * @internal - Use mergeRefs from main utils instead
 */
export function mergeRefs<T>(...refs: Array<RefObject<T> | LegacyRef<T>>): RefCallback<T> {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref !== null && ref !== undefined) {
        (ref as MutableRefObject<T | null>).current = node;
      }
    });
  };
}

function mergePropValue(key: string, value: any, result: Record<string, any>): void {
  if (key === 'className' || key === 'class') {
    result.className = cn(result.className, value as string);
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

/**
 * Merges multiple props objects together.
 * - Handles `className` and `class` merging via `cn`
 * - Merges `style` objects
 * - Merges `ref` callbacks
 * - Chains event handlers (functions starting with `on`)
 * - Overrides other props with the latest value
 * @param {Array<Record<string, any> | undefined>} objects - The props objects to merge
 * @returns {Record<string, any>} The merged props object
 */
export function mergeProps(
  ...objects: Array<Record<string, any> | undefined>
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const obj of objects) {
    if (!obj) {
      continue;
    }

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        mergePropValue(key, obj[key], result);
      }
    }
  }

  return result;
}

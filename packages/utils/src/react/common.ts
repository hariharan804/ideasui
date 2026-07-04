/* eslint-disable sonarjs/deprecation */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RefObject, LegacyRef, RefCallback, MutableRefObject } from 'react';

import { cn } from '../style/tailwind';

/**
 * Merge multiple refs into a single ref callback
 * @param {Array<RefObject<T> | LegacyRef<T>>} refs - The refs to merge
 * @returns {RefCallback<T>} A ref callback that updates all passed refs
 * @internal - Use mergeRefs from main utils instead
 */
export function mergeRefs<T>(...references: Array<RefObject<T> | LegacyRef<T>>): RefCallback<T> {
  return (node: T) => {
    for (const reference of references) {
      if (typeof reference === 'function') {
        reference(node);
      } else if (reference !== null && reference !== undefined) {
        (reference as MutableRefObject<T | null>).current = node;
      }
    }
  };
}

function mergePropertyValue(key: string, value: any, result: Record<string, any>): void {
  switch (key) {
    case 'className':
    case 'class': {
      result.className = cn(result.className, value as string);

      break;
    }
    case 'style': {
      result.style = { ...result.style, ...value };

      break;
    }
    case 'ref': {
      const existing = result.ref;

      result.ref = existing ? mergeRefs(existing, value) : value;

      break;
    }
    default: {
      if (key.startsWith('on') && typeof value === 'function') {
        const existing = result[key];

        result[key] =
          typeof existing === 'function'
            ? (...arguments_: any[]) => {
                existing(...arguments_);

                value(...arguments_);
              }
            : value;
      } else {
        result[key] = value;
      }
    }
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

  for (const object of objects) {
    if (!object) {
      continue;
    }

    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        mergePropertyValue(key, object[key], result);
      }
    }
  }

  return result;
}

/**
 * Merges component props with a context object.
 * Component props take precedence over context values, except for className which is merged.
 * @param {Record<string, any>} props - The component props
 * @param {Record<string, any> | null | undefined} context - The context object
 * @returns {Record<string, any>} The merged props object
 */
export function mergePropsWithContext(
  properties: Record<string, any>,
  context: Record<string, any> | null | undefined,
): Record<string, any> {
  if (!context) {
    return properties;
  }

  return mergeProps(context, properties);
}

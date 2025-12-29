import * as React from "react";

/**
 * Merge multiple refs into a single ref callback
 * @internal - Use mergeRefs from main utils instead
 */
export function mergeRefs<T = any>(...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>): React.RefCallback<T> {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T>).current = node;
      }
    });
  };
}

/**
 * Enhanced mergeProps with conflict resolution
 * @internal - Use mergeProps from main utils instead
 */
export function mergeProps(...objects: Array<Record<string, any> | undefined>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const obj of objects) {
    if (!obj) continue;

    for (const key in obj) {
      const value = obj[key];

      // Handle className merging
      if (key === "className") {
        result[key] = [result[key], value].filter(Boolean).join(" ") || undefined;
      }
      // Handle style merging
      else if (key === "style") {
        result[key] = {...result[key], ...value};
      }
      // Handle event handlers (combine them)
      else if (key.startsWith("on") && typeof value === "function") {
        const existing = result[key];
        if (typeof existing === "function") {
          result[key] = (...args: any[]) => {
            existing(...args);
            value(...args);
          };
        } else {
          result[key] = value;
        }
      }
      // Default: later values override earlier ones
      else {
        result[key] = value;
      }
    }
  }

  return result;
}
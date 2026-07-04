/* eslint-disable no-restricted-syntax */
import type * as React from 'react';

export function mergeRefs<T>(...references: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return (value) => {
    for (const reference of references) {
      if (typeof reference === 'function') {
        reference(value);
      } else if (reference) {
        reference.current = value;
      }
    }
  };
}

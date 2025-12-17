import {cn} from "../style";

/**
 * Generate a unique ID with optional prefix
 * @param prefix
 */
export function getUniqueID(prefix: string = "") {
  return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Merge multiple props objects
 * @param {...any} props
 */
export function mergeProps(...props: Record<string, any>[]): Record<string, any> {
  const result: Record<string, any> = {};

  for (const prop of props) {
    for (const key in prop) {
      if (key === "className" || key === "class") {
        result.className = cn(result.className, prop[key]);
      } else if (typeof prop[key] === "function" && typeof result[key] === "function") {
        const prevHandler = result[key];
        const currentHandler = prop[key];

        result[key] = (...args: any[]) => {
          prevHandler(...args);
          currentHandler(...args);
        };
      } else {
        result[key] = prop[key];
      }
    }
  }

  return result;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

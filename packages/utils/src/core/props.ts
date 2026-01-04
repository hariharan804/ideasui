import {cn} from "../style/tailwind";

/**
 * Merge multiple props objects with smart handling
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
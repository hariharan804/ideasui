import type {ClassValue} from "clsx";

import {tv} from "tailwind-variants";
import {clsx} from "clsx";

export * from "./system";
export * from "./button";
export * from "./input";
export * from "./card";
export * from "./badge";
export * from "./ripple";

// ### EXPORT VARIANT HERE ###

/**
 * Utility function to merge class names
 * @param {...any} inputs
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Create variants with tailwind-variants
 */
export const createVariants = tv;

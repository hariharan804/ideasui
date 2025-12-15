/**
 * @param value - Description of the parameter
 * @returns Description of the return value
 */
export function {{camelCase name}}(value: unknown): boolean {
  // Implement your utility function here
  return !!value;
}

/**
 * Example utility function with multiple parameters
 * 
 * @param a - First parameter
 * @param b - Second parameter (optional)
 * @returns Description of the return value
 */
export function {{camelCase name}}WithParams(a: string, b: number = 0): string {
  return `${a}-${b}`;
}

// Add more utility functions as needed
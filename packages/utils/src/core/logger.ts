/**
 * Component library logger utility
 * - Development: Shows all logs and throws errors
 * - Production: Silent mode, no errors thrown
 */

const isDev = process.env.NODE_ENV === "development";

export const logger = {
  /**
   * Log info message (dev only)
   */
  info: (message: string, ...args: any[]) => {
    if (isDev) {
      console.log(`[IdeasUI] ${message}`, ...args);
    }
  },

  /**
   * Log warning message (dev only)
   */
  warn: (message: string, ...args: any[]) => {
    if (isDev) {
      console.warn(`[IdeasUI] ${message}`, ...args);
    }
  },

  /**
   * Log error message (dev only)
   */
  error: (message: string, ...args: any[]) => {
    if (isDev) {
      console.error(`[IdeasUI] ${message}`, ...args);
    }
  },

  /**
   * Throw error in dev, silent in production
   */
  throw: (message: string) => {
    if (isDev) {
      throw new Error(`[IdeasUI] ${message}`);
    }
  },

  /**
   * Assert condition - throw in dev, silent in production
   */
  assert: (condition: boolean, message: string) => {
    if (!condition && isDev) {
      throw new Error(`[IdeasUI] Assertion failed: ${message}`);
    }
  },
};
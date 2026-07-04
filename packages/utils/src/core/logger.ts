/**
 * Component library logger utility
 * - Development: Shows all logs and throws errors
 * - Production: Silent mode, no errors thrown
 */

/* eslint-disable no-console */
const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  /**
   * Log info message (dev only)
   * @param {string} message - The message to log
   * @param {...unknown[]} args - Additional arguments to log
   */
  info: (message: string, ...arguments_: unknown[]) => {
    if (isDevelopment) {
      console.log(`[IdeasUI] ${message}`, ...arguments_);
    }
  },

  /**
   * Log warning message (dev only)
   * @param {string} message - The warning message
   * @param {...unknown[]} args - Additional arguments to log
   */
  warn: (message: string, ...arguments_: unknown[]) => {
    if (isDevelopment) {
      console.warn(`[IdeasUI] ${message}`, ...arguments_);
    }
  },

  /**
   * Log error message (dev only)
   * @param {string} message - The error message
   * @param {...unknown[]} args - Additional arguments to log
   */
  error: (message: string, ...arguments_: unknown[]) => {
    if (isDevelopment) {
      console.error(`[IdeasUI] ${message}`, ...arguments_);
    }
  },

  /**
   * Throw error in dev, silent in production
   * @param {string} message - The error message to throw
   */
  throw: (message: string) => {
    if (isDevelopment) {
      throw new Error(`[IdeasUI] ${message}`);
    }
  },

  /**
   * Assert condition - throw in dev, silent in production
   * @param {boolean} condition - The condition to check
   * @param {string} message - The error message if assertion fails
   */
  assert: (condition: boolean, message: string) => {
    if (!condition && isDevelopment) {
      throw new Error(`[IdeasUI] Assertion failed: ${message}`);
    }
  },
};

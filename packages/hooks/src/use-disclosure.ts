import { useState, useCallback } from 'react';

export interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

/**
 * Custom hook for managing disclosure state for UI components like modals, dropdowns, and collapsible content
 *
 * @param {boolean} [defaultIsOpen=false] - Initial open state of the disclosure
 * @returns {UseDisclosureReturn} Object containing disclosure state and control functions
 *
 * @default defaultIsOpen false
 *
 * @example
 * ```tsx
 * // Basic usage for modal
 * const {isOpen, onOpen, onClose, onToggle} = useDisclosure()
 *
 * // With initial open state
 * const disclosure = useDisclosure(true)
 *
 * // Usage in component
 * <button onClick={onOpen}>Open Modal</button>
 * <Modal isOpen={isOpen} onClose={onClose}>
 *   <button onClick={onToggle}>Toggle</button>
 * </Modal>
 * ```
 *
 * Perfect for modals, dropdowns, accordions, tooltips, and any show/hide UI patterns
 *
 * @see {@link https://react.dev/reference/react/useState} for useState reference
 * @see {@link https://react.dev/reference/react/useCallback} for useCallback reference
 *
 * @since 1.0.0
 */
export function useDisclosure(defaultIsOpen = false): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const onOpenChange = useCallback((open: boolean) => setIsOpen(open), []);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    onOpenChange,
  };
}

import {useState, useCallback} from "react";

export interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

/**
 * Custom hook for managing disclosure state (modals, dropdowns, etc.)
 *
 * @param defaultIsOpen - Initial open state
 * @returns Disclosure state and handlers
 *
 * @example
 * ```tsx
 * const {isOpen, onOpen, onClose, onToggle} = useDisclosure()
 * ```
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
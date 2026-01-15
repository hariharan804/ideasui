import type {
  HTMLAttributes,
  ElementType,
  ReactNode,
  ReactElement,
  Ref,
  RefAttributes,
  ClassAttributes,
  MutableRefObject,
  RefCallback,
} from 'react';

import { cloneElement, createElement, isValidElement, Children, Fragment } from 'react';
import { forwardRef as polymorphicForwardRef } from '@ideasui/utils';

/**
 * Props for Slot component
 */
export interface SlotProps extends HTMLAttributes<HTMLElement> {
  /**
   * Element or component to render as
   * @default "div"
   */
  as?: ElementType;

  /**
   * Merge props with the first child instead of rendering wrapper
   * @default false
   */
  asChild?: boolean;

  /**
   * Content to render inside the slot
   */
  children?: ReactNode;
}

// ============================================================================
// React Version Compatibility Utilities
// ============================================================================

/**
 * Get element ref compatible with React 18/19
 *
 * React <=18: accessing element.props.ref throws warning, use element.ref
 * React 19: accessing element.ref throws warning, use element.props.ref
 * This utility detects the warning and uses the correct method
 * @param {ReactElement} element - The React element to check
 * @returns {Ref<unknown> | undefined} The ref of the element
 */
function getElementRef(element: ReactElement): Ref<unknown> | undefined {
  // React <=18 in DEV - check if props.ref getter has warning
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get;
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;

  if (mayWarn) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (element as RefAttributes<unknown> | ClassAttributes<unknown> as any).ref;
  }

  // React 19 in DEV - check if element.ref getter has warning
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get;
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element.props as { ref?: Ref<unknown> }).ref;
  }

  // Production mode - try both methods as fallback
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (element.props as { ref?: Ref<unknown> }).ref ?? (element as any).ref;
}

// ============================================================================
// Prop Merging Utilities
// ============================================================================

// Cache regex for better performance
const EVENT_HANDLER_REGEX = /^on[A-Z]/;

/**
 * Merge props with intelligent handling of special cases
 *
 * - Event handlers: Compose both handlers (child first, then slot)
 * - Styles: Merge objects (slot styles override child styles)
 * - ClassNames: Concatenate with space separator
 * - Other props: Slot props override child props
 * @param {Record<string, unknown>} slotProps - Props from the Slot component
 * @param {Record<string, unknown>} childProps - Props from the child element
 * @returns {Record<string, any>} Merged props object
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
function mergeProps(
  slotProps: Record<string, any>,
  childProps: Record<string, any>,
): Record<string, any> {
  // Early return if no slot props to merge
  if (!slotProps || Object.keys(slotProps).length === 0) {
    return { ...childProps };
  }

  // Start with child props as base
  const overrideProps = { ...childProps };

  // Get all unique prop names from both objects
  const childKeys = Object.keys(childProps);
  const slotKeys = Object.keys(slotProps);
  const allPropNames = [...childKeys, ...slotKeys.filter((key) => !childKeys.includes(key))];

  // Process each prop for intelligent merging
  for (const propName of allPropNames) {
    const slotPropValue = slotProps[propName];

    const childPropValue = childProps[propName];

    // Skip if neither object has this prop
    if (!(propName in slotProps) && !(propName in childProps)) {
      continue;
    }

    // Event handlers (onClick, onFocus, etc.) - compose both functions
    if (EVENT_HANDLER_REGEX.test(propName)) {
      if (slotPropValue && childPropValue) {
        // Call child handler first, then slot handler

        overrideProps[propName] = (...args: unknown[]) => {
          const result = childPropValue(...args);

          slotPropValue(...args);

          return result;
        };
      } else if (slotPropValue) {
        // Only slot handler exists

        overrideProps[propName] = slotPropValue;
      }
    }
    // Style objects - merge with slot styles taking precedence
    else if (propName === 'style') {
      overrideProps[propName] = { ...childPropValue, ...slotPropValue };
    }
    // CSS classes - concatenate with space separator
    else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    }
  }

  // Slot props override child props, except for the special cases handled above
  return { ...slotProps, ...overrideProps };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// ============================================================================
// Ref Composition Utilities
// ============================================================================

/**
 * Compose multiple refs into a single ref callback
 *
 * Handles both function refs and ref objects (useRef, createRef)
 * Safely calls all refs when the element mounts/unmounts
 * @param {Array<Ref<unknown> | undefined>} refs - List of refs to compose
 * @returns {RefCallback<unknown>} A single ref callback function
 */
function composeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        // Function ref - call directly
        ref(node);
      } else if (ref !== null && ref !== undefined) {
        // Ref object - set current property
        (ref as MutableRefObject<T | null>).current = node;
      }
      // Ignore null/undefined refs
    });
  };
}

// ============================================================================
// Main Slot Component
// ============================================================================

/**
 * Slot - Universal polymorphic container component
 *
 * Supports two rendering modes:
 * 1. Normal mode (as prop): Renders as specified element/component
 * 2. AsChild mode: Merges props with first child element (Radix pattern)
 *
 * Features:
 * • Full TypeScript support with proper prop inference
 * • Event handler composition (child first, then slot)
 * • Intelligent style and className merging
 * • Cross-version React compatibility (18/19)
 * • Proper ref forwarding and composition
 * • Development-time validation
 *
 * @example
 * ```tsx
 * // Normal mode - renders wrapper element
 * <Slot as="button" onClick={handleClick}>Button</Slot>
 *
 * // AsChild mode - merges with child element
 * <Slot asChild onClick={handleClick}>
 *   <button className="existing">Button</button>
 * </Slot>
 * ```
 */

export const Slot = polymorphicForwardRef<'div', SlotProps>(
  ({ as: Component = 'div', asChild, children, ...props }, ref) => {
    // AsChild mode: merge props with first child element
    if (asChild) {
      // Development validation - ensure single React element
      if (process.env.NODE_ENV !== 'production') {
        if (!isValidElement(children)) {
          throw new Error('Slot: asChild requires a single React element as children');
        }
      }

      // Get the single child element
      const child = Children.only(children as ReactElement);

      // Extract child's existing ref for composition
      const childRef = getElementRef(child);

      // Merge slot props with child props (intelligent merging)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mergedProps = mergeProps(props, child.props as Record<string, any>);

      // Compose refs if both exist, avoiding React.Fragment ref issues
      if (child.type !== Fragment) {
        mergedProps.ref = ref ? composeRefs(ref, childRef) : childRef;
      }

      // Clone child with merged props
      return cloneElement(child, mergedProps);
    }

    // Normal mode: render as specified component with props
    return createElement(Component, { ref, ...props }, children);
  },
);

Slot.displayName = 'IdeasUI.Slot';

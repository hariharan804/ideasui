import * as React from "react";
import {forwardRef} from "@ideasui/utils";

/**
 * Props for Slot component
 */
export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element or component to render as
   * @default "div"
   */
  as?: React.ElementType;

  /**
   * Merge props with the first child instead of rendering wrapper
   * @default false
   */
  asChild?: boolean;

  /**
   * Content to render inside the slot
   */
  children?: React.ReactNode;
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
 */
function getElementRef(element: React.ReactElement) {
  // React <=18 in DEV - check if props.ref getter has warning
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element as any).ref;
  }

  // React 19 in DEV - check if element.ref getter has warning
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element.props as {ref?: React.Ref<unknown>}).ref;
  }

  // Production mode - try both methods as fallback
  return (element.props as {ref?: React.Ref<unknown>}).ref || (element as any).ref;
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
 */
function mergeProps(slotProps: Record<string, any>, childProps: Record<string, any>) {
  // Early return if no slot props to merge
  if (!slotProps || Object.keys(slotProps).length === 0) {
    return childProps;
  }

  // Start with child props as base
  const overrideProps = {...childProps};

  // Process each child prop for intelligent merging
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    // Skip if slot doesn't have this prop
    if (!(propName in slotProps)) continue;

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
    else if (propName === "style") {
      overrideProps[propName] = {...slotPropValue, ...childPropValue};
    }
    // CSS classes - concatenate with space separator
    else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }

  // Slot props override child props, except for the special cases handled above
  return {...slotProps, ...overrideProps};
}

// ============================================================================
// Ref Composition Utilities
// ============================================================================

/**
 * Compose multiple refs into a single ref callback
 *
 * Handles both function refs and ref objects (useRef, createRef)
 * Safely calls all refs when the element mounts/unmounts
 */
function composeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.Ref<T> {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        // Function ref - call directly
        ref(node);
      } else if (ref != null) {
        // Ref object - set current property
        (ref as React.RefObject<T>).current = node;
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
export const Slot = forwardRef<"div", SlotProps>(
  ({as: Component = "div", asChild, children, ...props}, ref) => {
    // AsChild mode: merge props with first child element
    if (asChild) {
      // Development validation - ensure single React element
      if (process.env.NODE_ENV !== "production") {
        if (!React.isValidElement(children)) {
          throw new Error("Slot: asChild requires a single React element as children");
        }
      }

      // Get the single child element
      const child = React.Children.only(children as React.ReactElement);

      // Extract child's existing ref for composition
      const childRef = getElementRef(child);

      // Merge slot props with child props (intelligent merging)
      const mergedProps = mergeProps(props, child.props as Record<string, any>);

      // Compose refs if both exist, avoiding React.Fragment ref issues
      if (child.type !== React.Fragment) {
        mergedProps.ref = ref ? composeRefs(ref, childRef) : childRef;
      }

      // Clone child with merged props
      return React.cloneElement(child, mergedProps);
    }

    // Normal mode: render as specified component with props
    return React.createElement(Component, {ref, ...props}, children);
  },
);

Slot.displayName = "IdeasUI.Slot";

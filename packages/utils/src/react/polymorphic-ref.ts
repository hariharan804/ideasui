import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes,
} from 'react';

import { forwardRef as reactForwardReference } from 'react';

// ... (existing code)

/**
 * Extract props type from polymorphic component
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExtractProps<T> = T extends PolymorphicComponent<any, infer P> ? P : never;

/**
 * Extract default element type from polymorphic component
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExtractElement<T> = T extends PolymorphicComponent<infer E, any> ? E : never;

/**
 * Extract ref type from polymorphic component
 */
export type ExtractRef<T> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends PolymorphicComponent<infer E, any> ? PolymorphicRef<E> : never;

// ============================================================================
// Core Types for React 19 Polymorphic Components
// ============================================================================

/**
 * Polymorphic props that merge custom props with element props
 * Excludes React 19 incompatible props like formAction
 */
export type PolymorphicProps<T extends ElementType, P extends object = {}> = P & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof P | 'as' | 'formAction'>;

/**
 * Polymorphic ref type extraction
 */
export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];

/**
 * Main polymorphic component type - properly extends ForwardRefExoticComponent
 * for React 19 compatibility and JSX usage
 */
export type PolymorphicComponent<
  DefaultElement extends ElementType = 'div',
  Properties extends object = {},
> = ForwardRefExoticComponent<
  PolymorphicProps<DefaultElement, Properties> & RefAttributes<unknown>
> & {
  <AsElement extends ElementType = DefaultElement>(
    properties: PolymorphicProps<AsElement, Properties> & {
      ref?: PolymorphicRef<AsElement>;
    },
  ): ReactElement | null;
  displayName?: string;
};

// ============================================================================
// Factory Functions
// ============================================================================

/**
 * Creates a polymorphic forwardRef component with proper TypeScript support
 *
 * @param {Function} render - Component render function
 * @returns {PolymorphicComponent} Polymorphic component with 'as' prop support
 *
 * @example
 * ```tsx
 * interface ButtonProps {
 *   variant?: 'solid' | 'outline';
 *   size?: 'sm' | 'md' | 'lg';
 * }
 *
 * const Button = forwardRef<'button', ButtonProps>(
 *   ({ as: Component = 'button', variant = 'solid', ...props }, ref) => (
 *     <Component ref={ref} className={buttonVariants({ variant })} {...props} />
 *   )
 * );
 *
 * // Usage:
 * <Button variant="solid" />                    // renders as button
 * <Button as="a" href="/link" variant="outline" /> // renders as anchor
 * <Button as={Link} to="/route" />              // renders as router Link
 * ```
 */
export function forwardRef<DefaultElement extends ElementType, Properties extends object = {}>(
  render: (
    properties: PolymorphicProps<DefaultElement, Properties>,
    reference: PolymorphicRef<DefaultElement>,
  ) => ReactElement | null,
): PolymorphicComponent<DefaultElement, Properties> {
  return reactForwardReference(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (properties: any, reference: any) => render(properties, reference),
  ) as unknown as PolymorphicComponent<DefaultElement, Properties>;
}

/**
 * Alternative factory with displayName support
 * @param {Function} render - Render function
 * @param {string} displayName - Component display name
 * @returns {PolymorphicComponent} Polymorphic component
 */
export function createPolymorphicComponent<
  DefaultElement extends ElementType,
  Properties extends object = {},
>(
  render: (
    properties: PolymorphicProps<DefaultElement, Properties>,
    reference: PolymorphicRef<DefaultElement>,
  ) => ReactElement | null,
  displayName?: string,
): PolymorphicComponent<DefaultElement, Properties> {
  const Component = forwardRef<DefaultElement, Properties>(render);

  if (displayName) {
    Component.displayName = displayName;
  }

  return Component;
}

export { type ElementType } from 'react';

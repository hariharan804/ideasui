import * as React from 'react';

// ============================================================================
// Core Types for React 19 Polymorphic Components
// ============================================================================

export type ElementType = React.ElementType;

/**
 * Polymorphic props that merge custom props with element props
 * Excludes React 19 incompatible props like formAction
 */
export type PolymorphicProps<T extends ElementType, P extends object = {}> = P & {
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof P | 'as' | 'formAction'>;

/**
 * Polymorphic ref type extraction
 */
export type PolymorphicRef<T extends ElementType> = React.ComponentPropsWithRef<T>['ref'];

/**
 * Main polymorphic component type - properly extends ForwardRefExoticComponent
 * for React 19 compatibility and JSX usage
 */
export type PolymorphicComponent<
  DefaultElement extends ElementType = 'div',
  Props extends object = {},
> = React.ForwardRefExoticComponent<
  PolymorphicProps<DefaultElement, Props> & React.RefAttributes<any>
> & {
  <AsElement extends ElementType = DefaultElement>(
    props: PolymorphicProps<AsElement, Props> & {
      ref?: PolymorphicRef<AsElement>;
    },
  ): React.ReactElement | null;
  displayName?: string;
};

// ============================================================================
// Factory Functions
// ============================================================================

/**
 * Creates a polymorphic forwardRef component with proper TypeScript support
 *
 * @param render - Component render function
 * @returns Polymorphic component with 'as' prop support
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
export function forwardRef<DefaultElement extends ElementType, Props extends object = {}>(
  render: (
    props: PolymorphicProps<DefaultElement, Props>,
    ref: PolymorphicRef<DefaultElement>,
  ) => React.ReactElement | null,
): PolymorphicComponent<DefaultElement, Props> {
  return React.forwardRef<any, any>((props: any, ref: any) =>
    render(props, ref),
  ) as PolymorphicComponent<DefaultElement, Props>;
}

/**
 * Alternative factory with displayName support
 * @param render
 * @param displayName
 */
export function createPolymorphicComponent<
  DefaultElement extends ElementType,
  Props extends object = {},
>(
  render: (
    props: PolymorphicProps<DefaultElement, Props>,
    ref: PolymorphicRef<DefaultElement>,
  ) => React.ReactElement | null,
  displayName?: string,
): PolymorphicComponent<DefaultElement, Props> {
  const Component = forwardRef<DefaultElement, Props>(render);

  if (displayName) {
    Component.displayName = displayName;
  }

  return Component;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Extract props type from polymorphic component
 */
export type ExtractProps<T> = T extends PolymorphicComponent<any, infer P> ? P : never;

/**
 * Extract default element type from polymorphic component
 */
export type ExtractElement<T> = T extends PolymorphicComponent<infer E, any> ? E : never;

/**
 * Extract ref type from polymorphic component
 */
export type ExtractRef<T> =
  T extends PolymorphicComponent<infer E, any> ? PolymorphicRef<E> : never;

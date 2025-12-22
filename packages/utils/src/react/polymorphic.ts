import * as React from "react";

/**
 * Base props for polymorphic components
 * Extends HTMLAttributes but omits 'as' to avoid conflicts
 */
export type PolymorphicProps = Omit<React.HTMLAttributes<HTMLElement>, "as"> & {
  /**
   * Render element type
   * @default "div"
   */
  as?: React.ElementType;
};

/**
 * Component props with polymorphic support
 * @template T - Additional props to merge
 */
export type ComponentProps<T = {}> = PolymorphicProps & T;

/**
 * Ref type for polymorphic components
 */
export type PolymorphicRef = React.Ref<HTMLElement>;

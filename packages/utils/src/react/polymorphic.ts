import * as React from "react";

/* -------------------------------------------------------
 * Core types
 * ----------------------------------------------------- */

export type ElementType = React.ElementType;

export type AsProp<E extends ElementType> = {
  as?: E;
};

type PropsToOmit<E extends ElementType, P> = keyof (AsProp<E> & P);

/**
 * Polymorphic props
 */
export type PolymorphicProps<E extends ElementType, P = {}> = P &
  AsProp<E> &
  Omit<React.ComponentPropsWithoutRef<E>, PropsToOmit<E, P>>;

/**
 * Polymorphic ref
 */
export type PolymorphicRef<E extends ElementType> = React.ComponentPropsWithRef<E>["ref"];

export function createPolymorphicComponent<DefaultElement extends ElementType, Props = {}>(
  render: <E extends ElementType = DefaultElement>(
    props: PolymorphicProps<E, any>,
    ref: PolymorphicRef<E>,
  ) => React.ReactElement | null,
) {
  return React.forwardRef(render) as <E extends ElementType = DefaultElement>(
    props: PolymorphicProps<E, Props> & {
      ref?: PolymorphicRef<E>;
    },
  ) => React.ReactNode | null;
}

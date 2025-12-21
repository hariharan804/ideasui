import * as React from "react";

/* ---------------------------------- */
/* Polymorphic core types             */
/* ---------------------------------- */

export type As = React.ElementType;

export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T>;

export type PolymorphicRef<T extends As> = React.ComponentPropsWithRef<T>["ref"];

export type RightJoinProps<SourceProps extends object, OverrideProps extends object> = Omit<
  SourceProps,
  keyof OverrideProps
> &
  OverrideProps;

/**
 * Polymorphic JSX-compatible component type
 */
export type PolymorphicComponent<
  DefaultAs extends As,
  Props extends object,
> = React.ForwardRefExoticComponent<any> & {
  <T extends As = DefaultAs>(
    props: RightJoinProps<PropsOf<T>, Props> & {
      as?: T;
      ref?: PolymorphicRef<T>;
    },
  ): React.ReactElement | null;

  displayName?: string;
};

/* ---------------------------------- */
/* forwardRef helper                  */
/* ---------------------------------- */

export function forwardRef<DefaultAs extends As, Props extends object>(
  render: (props: any, ref: React.ForwardedRef<any>) => React.ReactElement | null,
): PolymorphicComponent<DefaultAs, Props> {
  const Component = React.forwardRef(render);

  return Component as unknown as PolymorphicComponent<DefaultAs, Props>;
}

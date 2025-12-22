import * as React from "react";

/**
 * Base props for polymorphic components
 */
export interface PolymorphicOwnProps<T extends React.ElementType> {
  /**
   * Element to render as
   */
  as?: T;
}

/**
 * Polymorphic component props with proper type inheritance
 */
export type PolymorphicComponentProps<
  T extends React.ElementType,
  Props = {}
> = PolymorphicOwnProps<T> &
  Props &
  Omit<React.ComponentPropsWithoutRef<T>, keyof (PolymorphicOwnProps<T> & Props)>;

/**
 * Polymorphic component with ref support
 */
export type PolymorphicComponentPropsWithRef<
  T extends React.ElementType,
  Props = {}
> = PolymorphicComponentProps<T, Props> & {
  ref?: React.Ref<React.ElementRef<T>>;
};

/**
 * Event handler type conversion utilities
 */
export const castEvent = {
  /**
   * Cast Element event to HTMLElement event for compatibility
   */
  toHTMLElement: <E extends React.SyntheticEvent>(event: E) =>
    event as E & { currentTarget: HTMLElement },

  /**
   * Cast pointer event to HTMLElement pointer event
   */
  pointerToHTML: (event: React.PointerEvent<Element>) =>
    event as React.PointerEvent<HTMLElement>,

  /**
   * Cast keyboard event to HTMLElement keyboard event
   */
  keyboardToHTML: (event: React.KeyboardEvent<Element>) =>
    event as React.KeyboardEvent<HTMLElement>,

  /**
   * Cast mouse event to HTMLElement mouse event
   */
  mouseToHTML: (event: React.MouseEvent<Element>) =>
    event as React.MouseEvent<HTMLElement>,
};

/**
 * Create a polymorphic component with proper typing
 */
export function createPolymorphicComponent<
  DefaultElement extends React.ElementType,
  OwnProps = {}
>(defaultElement: DefaultElement) {
  return <T extends React.ElementType = DefaultElement>(
    props: PolymorphicComponentPropsWithRef<T, OwnProps>
  ) => {
    const { as, ...restProps } = props;
    const Component = (as || defaultElement) as React.ElementType;
    
    return { Component, props: restProps };
  };
}
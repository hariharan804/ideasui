// import * as React from "react";

// /**
//  * Element type constraint
//  */
// export type As<Props = any> = React.ElementType<Props>;
// export type DOMElements = keyof JSX.IntrinsicElements;
// export type CapitalizedDOMElements = Capitalize<DOMElements>;

// export interface DOMElement extends Element, HTMLOrSVGElement {}

// type DataAttributes = {
//   [dataAttr: string]: any;
// };

// export type DOMAttributes<T = DOMElement> = React.AriaAttributes &
//   React.DOMAttributes<T> &
//   DataAttributes & {
//     id?: string;
//     role?: React.AriaRole;
//     tabIndex?: number;
//     style?: React.CSSProperties;
//   };

// export type OmitCommonProps<Target, OmitAdditionalProps extends keyof any = never> = Omit<
//   Target,
//   "transition" | "as" | "color" | OmitAdditionalProps
// >;

// export type RightJoinProps<
//   SourceProps extends object = {},
//   OverrideProps extends object = {},
// > = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

// export type MergeWithAs<
//   ComponentProps extends object,
//   AsProps extends object,
//   AdditionalProps extends object = {},
//   AsComponent extends As = As,
// > = (RightJoinProps<ComponentProps, AdditionalProps> | RightJoinProps<AsProps, AdditionalProps>) & {
//   as?: AsComponent;
// };

// export type InternalForwardRefRenderFunction<
//   Component extends As,
//   Props extends object = {},
//   OmitKeys extends keyof any = never,
// > = {
//   <AsComponent extends As = Component>(
//     props: MergeWithAs<
//       React.ComponentPropsWithoutRef<Component>,
//       Omit<React.ComponentPropsWithoutRef<AsComponent>, OmitKeys>,
//       Props,
//       AsComponent
//     >,
//   ): React.ReactElement | null;
//   readonly $$typeof: symbol;
//   defaultProps?: Partial<Props> | undefined;
//   // propTypes?: React.WeakValidationMap<Props> | undefined;
//   displayName?: string | undefined;
// };

// /**
//  * Portable polymorphic component type
//  */
// export type PolymorphicComponent<
//   DefaultElement extends As = "div",
//   Props extends object = {}
// > = <AsElement extends As = DefaultElement>(
//   props: MergeWithAs<
//     React.ComponentPropsWithoutRef<DefaultElement>,
//     Omit<React.ComponentPropsWithoutRef<AsElement>, keyof Props>,
//     Props,
//     AsElement
//   > & { ref?: React.Ref<React.ComponentRef<AsElement>> }
// ) => React.ReactElement | null & {
//   displayName?: string;
// };

// /**
//  * Extract the props of a React element or component
//  */
// export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
//   as?: As;
// };

// /**
//  * Custom forwardRef with polymorphic 'as' prop support
//  */
// export function forwardRef<
//   Component extends As,
//   Props extends object,
//   OmitKeys extends keyof any = never,
// >(
//   component: React.ForwardRefRenderFunction<
//     any,
//     RightJoinProps<PropsOf<Component>, Props> & {
//       as?: As;
//     }
//   >,
// ) {
//   return React.forwardRef(component as any) as InternalForwardRefRenderFunction<
//     Component,
//     Props,
//     OmitKeys
//   >;
// }

/**
 * Part of this code is taken from @chakra-ui/system ❤️
 */

// import type {Selection as AriaSharedSelection} from "@react-types/shared";
import {forwardRef as baseForwardRef} from "react";

export type As<Props = any> = React.ElementType<Props>;
export type DOMElements = keyof JSX.IntrinsicElements;
export type CapitalizedDOMElements = Capitalize<DOMElements>;

export interface DOMElement extends Element, HTMLOrSVGElement {}

type DataAttributes = {
  [dataAttr: string]: any;
};

export type DOMAttributes<T = DOMElement> = React.AriaAttributes &
  React.DOMAttributes<T> &
  DataAttributes & {
    id?: string;
    role?: React.AriaRole;
    tabIndex?: number;
    style?: React.CSSProperties;
  };

export type OmitCommonProps<Target, OmitAdditionalProps extends keyof any = never> = Omit<
  Target,
  "transition" | "as" | "color" | OmitAdditionalProps
>;

export type RightJoinProps<
  SourceProps extends object = {},
  OverrideProps extends object = {},
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

export type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = {},
  AsComponent extends As = As,
> = (RightJoinProps<ComponentProps, AdditionalProps> | RightJoinProps<AsProps, AdditionalProps>) & {
  as?: AsComponent;
};

export type InternalForwardRefRenderFunction<
  Component extends As,
  Props extends object = {},
  OmitKeys extends keyof any = never,
> = {
  <AsComponent extends As = Component>(
    props: MergeWithAs<
      React.ComponentPropsWithoutRef<Component>,
      Omit<React.ComponentPropsWithoutRef<AsComponent>, OmitKeys>,
      Props,
      AsComponent
    >,
  ): React.ReactElement | null;
  readonly $$typeof: symbol;
  defaultProps?: Partial<Props> | undefined;
  // propTypes?: React.WeakValidationMap<Props> | undefined;
  displayName?: string | undefined;
};

/**
 * Extract the props of a React element or component
 */
export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

export type Merge<M, N> = N extends Record<string, unknown> ? M : Omit<M, keyof N> & N;

export type HTMLHeroUIProps<T extends As = "div", OmitKeys extends keyof any = never> = Omit<
  PropsOf<T>,
  "ref" | "color" | "slot" | "size" | "defaultChecked" | "defaultValue" | OmitKeys
> & {
  as?: As;
};

export type PropGetter<P = Record<string, unknown>, R = DOMAttributes> = (
  props?: Merge<DOMAttributes, P>,
  ref?: React.Ref<any>,
) => R & React.RefAttributes<any>;

// export type SharedSelection = AriaSharedSelection & {
//   anchorKey?: string;
//   currentKey?: string;
// };

export function forwardRef<
  Component extends As,
  Props extends object,
  OmitKeys extends keyof any = never,
>(
  component: React.ForwardRefRenderFunction<
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: As;
    }
  >,
) {
  return baseForwardRef(component as never) as InternalForwardRefRenderFunction<
    Component,
    Props,
    OmitKeys
  >;
}

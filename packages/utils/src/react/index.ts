/**
 * React-specific utilities
 *
 * This module provides helper functions and hooks for React components.
 */

import {forwardRef as baseForwardRef} from "react";
import {As, InternalForwardRefRenderFunction, PropsOf, RightJoinProps} from "./type";

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
  return baseForwardRef(component) as InternalForwardRefRenderFunction<Component, Props, OmitKeys>;
}

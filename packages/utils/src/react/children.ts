/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactElement, ReactNode, JSXElementConstructor } from 'react';

import { Children, isValidElement as isValidReactElement, cloneElement } from 'react';

/**
 * Checks if a value is a valid React element
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is a valid React element
 * @internal
 */
export function isValidElement(value: unknown): value is ReactElement {
  return isValidReactElement(value);
}

/**
 * Clones React children and adds props to each child
 * @param {ReactNode} children - The children to clone
 * @param {Record<string, any>} props - The props to add to each child
 * @returns {ReactNode} The cloned children with added props
 * @internal
 */
export function cloneChildrenWithProps(
  children: ReactNode,
  properties: Record<string, any>,
): ReactNode {
  return Children.map(children, (child) => {
    if (isValidReactElement(child)) {
      return cloneElement(child, properties) as any;
    }

    return child as any;
  });
}

/**
 * Gets all React children as an array
 * @param {ReactNode} children - The children to convert
 * @returns {Array<ReactNode>} An array of React children
 * @internal
 */
export function getChildrenArray(children: ReactNode): ReactNode[] {
  return Children.toArray(children);
}

/**
 * Finds child component by display name
 * @param {ReactNode} children - The children to search
 * @param {string} displayName - The display name to find
 * @returns {ReactElement | null} The found child or null
 * @internal
 */
export function findChildByDisplayName(
  children: ReactNode,
  displayName: string,
): ReactElement | null {
  const childArray = Children.toArray(children);

  for (const child of childArray) {
    if (isValidReactElement(child)) {
      const type = child.type;

      if (
        typeof type === 'function' &&
        (type as JSXElementConstructor<any> & { displayName?: string }).displayName === displayName
      ) {
        return child;
      }
    }
  }

  return null;
}

/**
 * Checks if component has children
 * @param {ReactNode} children - The children to check
 * @returns {boolean} True if the component has children
 * @internal
 */
export function hasChildren(children: ReactNode): boolean {
  return Children.count(children) > 0;
}

/**
 * Gets only valid React elements from children
 * @param {ReactNode} children - The children to filter
 * @returns {Array<ReactElement>} An array of valid React elements
 * @internal
 */
export function getValidElements(children: ReactNode): ReactElement[] {
  return Children.toArray(children).filter(isValidReactElement) as ReactElement[];
}

/**
 * Renders an icon prop which can be a ReactNode or render function
 * @param {ReactNode | ((props: { className: string }) => ReactNode)} iconProp - The icon prop to render
 * @param {string} className - Class name to apply to the icon
 * @returns {ReactNode} The rendered icon node
 * @internal
 */
export function renderIcon(
  iconProp: ReactNode | ((props: { className: string }) => ReactNode),
  className: string,
): ReactNode {
  if (typeof iconProp === 'function') {
    return iconProp({ className });
  }

  if (iconProp === null || iconProp === undefined) {
    return null;
  }

  if (isValidReactElement(iconProp)) {
    const existingClassName = (iconProp.props as { className?: string }).className;

    return cloneElement(iconProp as ReactElement<{ className?: string }>, {
      className: existingClassName ? `${existingClassName} ${className}` : className,
    });
  }

  return iconProp;
}

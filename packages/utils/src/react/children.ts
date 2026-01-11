import * as React from 'react';

/**
 * Checks if a value is a valid React element
 * @internal
 */
export function isValidElement(value: any): value is React.ReactElement {
  return React.isValidElement(value);
}

/**
 * Clones React children and adds props to each child
 * @internal
 */
export function cloneChildrenWithProps(
  children: React.ReactNode,
  props: Record<string, any>,
): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props as any);
    }
    return child;
  });
}

/**
 * Gets all React children as an array
 * @internal
 */
export function getChildrenArray(children: React.ReactNode): React.ReactNode[] {
  return React.Children.toArray(children);
}

/**
 * Finds child component by display name
 * @internal
 */
export function findChildByDisplayName(
  children: React.ReactNode,
  displayName: string,
): React.ReactElement | null {
  const childArray = React.Children.toArray(children);

  for (const child of childArray) {
    if (
      React.isValidElement(child) &&
      typeof child.type === 'function' &&
      (child.type as any).displayName === displayName
    ) {
      return child;
    }
  }

  return null;
}

/**
 * Checks if component has children
 * @internal
 */
export function hasChildren(children: React.ReactNode): boolean {
  return React.Children.count(children) > 0;
}

/**
 * Gets only valid React elements from children
 * @internal
 */
export function getValidElements(children: React.ReactNode): React.ReactElement[] {
  return React.Children.toArray(children).filter(React.isValidElement);
}

import type * as React from 'react';

/**
 * Checks if a React component is an IdeasUI component by its display name
 * @param component
 * @internal
 */
export function isIdeasUIComponent(component: React.ComponentType<any>): boolean {
  return component?.displayName?.startsWith('IdeasUI.') ?? false;
}

/**
 * Gets the component name from IdeasUI display name
 * @param component
 * @internal
 */
export function getIdeasUIComponentName(component: React.ComponentType<any>): string | null {
  const displayName = component?.displayName;

  return displayName?.startsWith('IdeasUI.') ? displayName.slice(8) : null;
}

/**
 * Checks if a React element is an IdeasUI component
 * @param element
 * @internal
 */
export function isIdeasUIElement(element: React.ReactElement): boolean {
  return typeof element.type === 'function' && isIdeasUIComponent(element.type);
}

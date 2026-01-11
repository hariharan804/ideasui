import type { ComponentType, ReactElement } from 'react';

const IDEAS_UI_PREFIX = 'IdeasUI.';

/**
 * Checks if a React component is an IdeasUI component by its display name
 * @param {ComponentType<unknown>} component - The component to check
 * @returns {boolean} True if the component is an IdeasUI component
 * @internal
 */
export function isIdeasUIComponent(component: ComponentType<unknown>): boolean {
  return component.displayName?.startsWith(IDEAS_UI_PREFIX) ?? false;
}

/**
 * Gets the component name from IdeasUI display name
 * @param {ComponentType<unknown>} component - The component to get the name from
 * @returns {string | null} The component name or null if not an IdeasUI component
 * @internal
 */
export function getIdeasUIComponentName(component: ComponentType<unknown>): string | null {
  const displayName = component.displayName;

  return displayName?.startsWith(IDEAS_UI_PREFIX)
    ? displayName.slice(IDEAS_UI_PREFIX.length)
    : null;
}

/**
 * Checks if a React element is an IdeasUI component
 * @param {ReactElement} element - The element to check
 * @returns {boolean} True if the element is an IdeasUI component
 * @internal
 */
export function isIdeasUIElement(element: ReactElement): boolean {
  return (
    typeof element.type === 'function' && isIdeasUIComponent(element.type as ComponentType<unknown>)
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ComponentInfo {
  name: string;
  title: string;
  description: string;
  href: string;
  category?: string;
  status?: 'stable' | 'planned' | 'deprecated';
}

const componentsMap: Record<string, ComponentInfo> = {
  button: {
    category: 'forms',
    description: 'Allows a user to perform an action',
    href: '/docs/components/button',
    name: 'button',
    status: 'stable',
    title: 'Button',
  },
};

// Define relationships between components
const componentRelationships: Record<string, string[]> = {
  button: [
    'popover',
    'tooltip',
    'form',
    'alert',
    'alertdialog',
    'closebutton',
    'dropdown',
    'toast',
  ],
};

/**
 * Get information about a specific component
 */
export function getComponentInfo(componentName: string): ComponentInfo | undefined {
  const normalizedName = componentName.toLowerCase().replaceAll(/[\s_-]/g, '');

  return componentsMap[normalizedName];
}

/**
 * Get related components for a specific component
 */
export function getRelatedComponents(componentName: string): ComponentInfo[] {
  const normalizedName = componentName.toLowerCase().replaceAll(/[\s_-]/g, '');
  const relationships = componentRelationships[normalizedName] || [];

  return relationships
    .map((name) => getComponentInfo(name))
    .filter((info): info is ComponentInfo => !!info);
}

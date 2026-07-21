/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ComponentInfo {
  name: string;
  title: string;
  description: string;
  href: string;
  category?: string;
  status?: 'new' | 'updated' | 'preview' | 'planned' | 'deprecated';
}

const componentsMap: Record<string, ComponentInfo> = {
  button: {
    category: 'buttons',
    description: 'A versatile button component with multiple variants, sizes, and states',
    href: '/react/docs/components/button',
    name: 'button',
    status: 'updated',
    title: 'Button',
  },
  buttongroup: {
    category: 'buttons',
    description: 'Group multiple buttons together in a horizontal or vertical layout',
    href: '/react/docs/components/button-group',
    name: 'button-group',
    status: 'new',
    title: 'Button Group',
  },
};

// Define relationships between components
const componentRelationships: Record<string, string[]> = {
  button: ['buttongroup'],
  buttongroup: ['button'],
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

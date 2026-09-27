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
  checkbox: {
    category: 'inputs',
    description:
      'Accessible checkbox supporting standalone, controlled, custom icons, and grouped usage',
    href: '/react/docs/components/checkbox',
    name: 'checkbox',
    status: 'new',
    title: 'Checkbox',
  },
  inputfield: {
    category: 'inputs',
    description:
      'Text input field supporting left/right add-ons, helper text, and validation states',
    href: '/react/docs/components/input-field',
    name: 'input-field',
    status: 'new',
    title: 'Input Field',
  },
  radio: {
    category: 'inputs',
    description: 'Radio button and RadioGroup primitive for single-select choice controls',
    href: '/react/docs/components/radio',
    name: 'radio',
    status: 'new',
    title: 'Radio',
  },
  switch: {
    category: 'inputs',
    description:
      'Theme-aware toggle switch primitive supporting custom thumb shapes, icons, and labels',
    href: '/react/docs/components/switch',
    name: 'switch',
    status: 'new',
    title: 'Switch',
  },
  textarea: {
    category: 'inputs',
    description:
      'Multi-line text input field supporting character counter, auto-resize, and validation',
    href: '/react/docs/components/textarea',
    name: 'textarea',
    status: 'new',
    title: 'Textarea',
  },
  text: {
    category: 'typography',
    description:
      'Polymorphic typography component supporting font sizes, weights, and color tokens',
    href: '/react/docs/components/text',
    name: 'text',
    status: 'new',
    title: 'Text',
  },
};

// Define relationships between components
const componentRelationships: Record<string, string[]> = {
  button: ['buttongroup'],
  buttongroup: ['button'],
  checkbox: ['radio', 'switch'],
  inputfield: ['textarea'],
  radio: ['checkbox', 'switch'],
  switch: ['checkbox', 'radio'],
  textarea: ['inputfield'],
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

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ComponentInfo {
  name: string;
  title: string;
  description: string;
  href: string;
  category?: string;
  status?: 'new' | 'updated' | 'preview' | 'planned' | 'deprecated' | '';
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
    status: '',
    title: 'Checkbox',
  },
  inputfield: {
    category: 'inputs',
    description:
      'Text input field supporting left/right add-ons, helper text, and validation states',
    href: '/react/docs/components/input-field',
    name: 'input-field',
    status: '',
    title: 'Input Field',
  },
  radio: {
    category: 'inputs',
    description: 'Radio button and RadioGroup primitive for single-select choice controls',
    href: '/react/docs/components/radio',
    name: 'radio',
    status: '',
    title: 'Radio',
  },
  switch: {
    category: 'inputs',
    description:
      'Theme-aware toggle switch primitive supporting custom thumb shapes, icons, and labels',
    href: '/react/docs/components/switch',
    name: 'switch',
    status: '',
    title: 'Switch',
  },
  textarea: {
    category: 'inputs',
    description:
      'Multi-line text input field supporting character counter, auto-resize, and validation',
    href: '/react/docs/components/textarea',
    name: 'textarea',
    status: '',
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
  image: {
    category: 'media',
    description:
      'Framework-agnostic image primitive supporting custom renderers, LQIP blur, skeleton loading, and fallbacks',
    href: '/react/docs/components/image',
    name: 'image',
    status: 'new',
    title: 'Image',
  },
  avatar: {
    category: 'media',
    description:
      'A compound, accessible identity element representing a user, entity, or resource with image, initials, and icon fallbacks',
    href: '/react/docs/components/avatar',
    name: 'avatar',
    status: '',
    title: 'Avatar',
  },
  divider: {
    category: 'media',
    description:
      'An accessible visual separator for content sections with horizontal and vertical orientations and optional labels',
    href: '/react/docs/components/divider',
    name: 'divider',
    status: '',
    title: 'Divider',
  },
};

// Define relationships between components (minimum 3 related components per component)
const componentRelationships: Record<string, string[]> = {
  avatar: ['image', 'divider', 'text'],
  button: ['buttongroup', 'inputfield', 'text'],
  buttongroup: ['button', 'inputfield', 'divider'],
  checkbox: ['radio', 'switch', 'inputfield'],
  divider: ['text', 'button', 'image'],
  image: ['avatar', 'divider', 'text'],
  inputfield: ['textarea', 'button', 'checkbox'],
  radio: ['checkbox', 'switch', 'inputfield'],
  switch: ['checkbox', 'radio', 'inputfield'],
  text: ['button', 'divider', 'inputfield'],
  textarea: ['inputfield', 'button', 'text'],
};

/**
 * Get information about a specific component
 */
export function getComponentInfo(componentName: string): ComponentInfo | undefined {
  const normalizedName = componentName.toLowerCase().replaceAll(/[\s_-]/g, '');

  return componentsMap[normalizedName];
}

function fillMissingRelated(
  result: ComponentInfo[],
  normalizedName: string,
  minCount: number,
): void {
  const usedNames = new Set(
    result.map((item) => item.name.toLowerCase().replaceAll(/[\s_-]/g, '')),
  );

  usedNames.add(normalizedName);

  for (const comp of Object.values(componentsMap)) {
    if (result.length >= minCount) {
      return;
    }

    const compKey = comp.name.toLowerCase().replaceAll(/[\s_-]/g, '');

    if (!usedNames.has(compKey)) {
      result.push(comp);
      usedNames.add(compKey);
    }
  }
}

/**
 * Get related components for a specific component (guarantees a minimum of 3 cards)
 */
export function getRelatedComponents(componentName: string, minCount = 3): ComponentInfo[] {
  const normalizedName = componentName.toLowerCase().replaceAll(/[\s_-]/g, '');
  const relationships = componentRelationships[normalizedName] || [];

  const result = relationships
    .map((name) => getComponentInfo(name))
    .filter(Boolean) as ComponentInfo[];

  if (result.length < minCount) {
    fillMissingRelated(result, normalizedName, minCount);
  }

  return result.slice(0, Math.max(minCount, 3));
}

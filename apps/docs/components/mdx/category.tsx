import type { StatusChipStatus } from './status-chip';

import { cn } from '@ideasui/utils';

import { Item } from './item';

import { getComponentInfo } from '@/components-registry';
import { source } from '@/lib/source';

// Component groups matching meta.json structure
const COMPONENT_GROUPS = [
  {
    category: 'Buttons',
    components: ['button', 'button-group', 'close-button', 'toggle-button', 'toggle-button-group'],
  },
  // ... (keeping the same group structure)
  {
    category: 'Forms',
    components: [
      'checkbox',
      'checkbox-group',
      'description',
      'error-message',
      'field-error',
      'fieldset',
      'form',
      'input',
      'input-group',
      'input-otp',
      'label',
      'number-field',
      'radio-group',
      'search-field',
      'textfield',
      'textarea',
    ],
  },
  {
    category: 'Date and Time',
    components: [
      'calendar',
      'date-field',
      'date-picker',
      'date-range-picker',
      'range-calendar',
      'time-field',
    ],
  },
  {
    category: 'Navigation',
    components: [
      'accordion',
      'breadcrumbs',
      'disclosure',
      'disclosure-group',
      'link',
      'pagination',
      'tabs',
    ],
  },
  {
    category: 'Overlays',
    components: ['alert-dialog', 'drawer', 'modal', 'popover', 'toast', 'tooltip'],
  },
  {
    category: 'Collections',
    components: ['dropdown', 'list-box', 'tag-group'],
  },
  {
    category: 'Controls',
    components: ['slider', 'switch'],
  },
  {
    category: 'Feedback',
    components: ['alert', 'meter', 'progressbar', 'progresscircle', 'skeleton', 'spinner'],
  },
  {
    category: 'Layout',
    components: ['card', 'separator', 'surface', 'toolbar'],
  },
  {
    category: 'Media',
    components: ['avatar'],
  },
  {
    category: 'Pickers',
    components: ['autocomplete', 'combo-box', 'select'],
  },
  {
    category: 'Typography',
    components: ['kbd'],
  },
  {
    category: 'Data Display',
    components: ['badge', 'chip', 'table'],
  },
  {
    category: 'Colors',
    components: [
      'color-area',
      'color-field',
      'color-picker',
      'color-slider',
      'color-swatch',
      'color-swatch-picker',
    ],
  },
  {
    category: 'Utilities',
    components: ['scroll-shadow'],
  },
] as const;

const componentStatusIcons = new Set(['preview', 'new', 'updated', 'new-dot']);

interface ComponentWithStatus {
  component: NonNullable<ReturnType<typeof getComponentInfo>>;
  status?: StatusChipStatus;
}

interface CategoryProperties {
  category?: string;
}

function getComponentWithStatus(name: string): ComponentWithStatus | null {
  const componentInfo = getComponentInfo(name);

  if (!componentInfo) {
    return null;
  }

  const pagePath = componentInfo.href
    .replace(/^\/(react\/)?docs\//, '')
    .split('/')
    .filter(Boolean);
  const page = source.getPage(pagePath);
  const icon = page?.data.icon;

  const status: StatusChipStatus | undefined =
    icon && componentStatusIcons.has(icon)
      ? (icon as StatusChipStatus)
      : (componentInfo.status as StatusChipStatus);

  return {
    component: componentInfo,
    status,
  };
}

export function Category(properties: Readonly<CategoryProperties>) {
  const { category } = properties;

  const targetGroups =
    category && category !== 'all'
      ? COMPONENT_GROUPS.filter((g) => g.category.toLowerCase() === category.toLowerCase())
      : COMPONENT_GROUPS;

  const activeGroups = targetGroups
    .map((group) => ({
      group,
      components: group.components
        .map((element) => getComponentWithStatus(element))
        .filter((item): item is ComponentWithStatus => item !== null),
    }))
    .filter(({ components }) => components.length > 0);

  if (activeGroups.length === 0) {
    return null;
  }

  return (
    <div className={cn('not-prose flex flex-col gap-8')}>
      {activeGroups.map(({ group, components }) => (
        <div key={group.category} className="flex flex-col gap-4">
          {(!category || category === 'all' || activeGroups.length > 1) && (
            <h2 className="text-content-primary text-xl font-bold tracking-tight">
              {group.category}
            </h2>
          )}
          <div
            className={cn(
              'grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2',
              components.length >= 3 && 'lg:grid-cols-3',
            )}
          >
            {components.map(({ component, status }) => (
              <Item
                key={component.name}
                component={component}
                openInNewTab={false}
                status={status}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

Category.displayName = 'IdeasUI.Category';

import type { DynamicIconProps, IconProps } from './types';
import type { FC, ComponentType } from 'react';

import { Suspense, lazy, useMemo } from 'react';

const DEFAULT_ICON_SIZE = 24;

// Default fallback icon
const DefaultFallback: FC<IconProps> = ({
  size = DEFAULT_ICON_SIZE,
  color = 'currentColor',
  className,
  ...props
}) => (
  <svg
    className={className}
    fill="none"
    height={size}
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width={size}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

// Icon cache for performance
const iconCache = new Map<string, ComponentType<IconProps>>();

/**
 * Dynamic icon component that loads icons on demand
 *
 * @param {DynamicIconProps} root0 - Component props
 * @param {string} root0.name - Name of the icon to load (kebab-case)
 * @param {FC<IconProps>} [root0.fallback] - Fallback component to show while loading
 * @returns {JSX.Element} The rendered icon
 * @example
 * ```tsx
 * <DynamicIcon name="arrow-right" size={24} color="blue" />
 * ```
 */
export const DynamicIcon: FC<DynamicIconProps> = ({
  name,
  fallback: Fallback = DefaultFallback,
  ...iconProps
}) => {
  const IconComponent = useMemo(() => {
    // Check cache first
    if (iconCache.has(name)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return iconCache.get(name)!;
    }

    // Create lazy component
    return lazy(async () => {
      try {
        // Dynamic import with proper error handling
        const module = await import(`./icons/${name}`);

        // Convert kebab-case to PascalCase for export name lookup
        const exportName = name
          .split('-')
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join('');

        const Component = module[exportName] || module.default;

        if (!Component) {
          throw new Error(`Icon "${name}" not found in module`);
        }

        // Cache the component
        iconCache.set(name, Component);

        return { default: Component };
      } catch (error) {
        console.warn(`Failed to load icon "${name}":`, error);

        // Return fallback as default export
        return { default: Fallback };
      }
    });
  }, [name, Fallback]);

  return (
    <Suspense fallback={<Fallback {...iconProps} />}>
      <IconComponent {...iconProps} />
    </Suspense>
  );
};

DynamicIcon.displayName = 'DynamicIcon';

import type { IconProps } from './types';

import React from 'react';

/**
 * Create a custom icon component (Lucide-style)
 *
 * @param displayName
 * @param elements
 * @example
 * ```tsx
 * const CustomIcon = createIcon('CustomIcon', [
 *   ['path', { d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' }]
 * ]);
 * ```
 */
export function createIcon(
  displayName: string,
  elements: Array<[string, Record<string, any>]>,
): React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> {
  const IconComponent = React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 24, color = 'currentColor', strokeWidth = 2, className, ...props }, ref) => (
      <svg
        ref={ref}
        className={className}
        fill="none"
        height={size}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        viewBox="0 0 24 24"
        width={size}
        {...props}
      >
        {elements.map(([tag, attrs], index) => React.createElement(tag, { key: index, ...attrs }))}
      </svg>
    ),
  );

  IconComponent.displayName = displayName;

  return IconComponent;
}

/**
 * Create an icon from SVG string
 * @param displayName
 * @param svgContent
 */
export function createIconFromSvg(
  displayName: string,
  svgContent: string,
): React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> {
  const IconComponent = React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 24, color = 'currentColor', strokeWidth = 2, className, ...props }, ref) => {
      // Extract inner SVG content
      const innerContent = svgContent
        .replace(/<svg[^>]*>/, '')
        .replace(/<\/svg>$/, '')
        .trim();

      return (
        <svg
          ref={ref}
          className={className}
          fill="none"
          height={size}
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          viewBox="0 0 24 24"
          width={size}
          {...props}
          dangerouslySetInnerHTML={{ __html: innerContent }}
        />
      );
    },
  );

  IconComponent.displayName = displayName;

  return IconComponent;
}

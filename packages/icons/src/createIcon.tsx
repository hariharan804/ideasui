import type { IconProps } from './types';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import { createElement, forwardRef } from 'react';

const DEFAULT_ICON_SIZE = 24;
const DEFAULT_STROKE_WIDTH = 2;

/**
 * Create a custom icon component (Lucide-style)
 *
 * @param {string} displayName - The display name of the icon
 * @param {Array<[string, Record<string, unknown>]>} elements - The SVG elements to render
 * @returns {ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>} The icon component
 * @example
 * ```tsx
 * const CustomIcon = createIcon('CustomIcon', [
 *   ['path', { d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' }]
 * ]);
 * ```
 */
export function createIcon(
  displayName: string,
  elements: Array<[string, Record<string, unknown>]>,
): ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> {
  const IconComponent = forwardRef<SVGSVGElement, IconProps>(
    (
      {
        size = DEFAULT_ICON_SIZE,
        color = 'currentColor',
        strokeWidth = DEFAULT_STROKE_WIDTH,
        className,
        ...props
      },
      ref,
    ) => (
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
        {/* eslint-disable-next-line react/no-array-index-key */}
        {elements.map(([tag, attrs], index) => createElement(tag, { key: index, ...attrs }))}
      </svg>
    ),
  );

  IconComponent.displayName = displayName;

  return IconComponent;
}

/**
 * Create an icon from SVG string
 * @param {string} displayName - The display name of the icon
 * @param {string} svgContent - The raw SVG string
 * @returns {ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>} The icon component
 */
export function createIconFromSvg(
  displayName: string,
  svgContent: string,
): ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> {
  const IconComponent = forwardRef<SVGSVGElement, IconProps>(
    (
      {
        size = DEFAULT_ICON_SIZE,
        color = 'currentColor',
        strokeWidth = DEFAULT_STROKE_WIDTH,
        className,
        ...props
      },
      ref,
    ) => {
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

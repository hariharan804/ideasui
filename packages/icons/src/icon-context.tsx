import type { IconProps } from './types';
import type { ComponentType } from 'react';

import { createContext, useContext } from 'react';

// Icon context for consistent styling
export const IconContext = createContext<Partial<IconProps>>({});

/**
 * Hook to access icon context values
 * @returns {Partial<IconProps>} The icon context values
 */
export const useIconContext = (): Partial<IconProps> => {
  return useContext(IconContext);
};

/**
 * Higher-order component to wrap icons with context support
 * @param {ComponentType<P>} Component - The component to wrap
 * @returns {ComponentType<P>} The wrapped component
 */
export function withIconContext<P extends IconProps>(
  Component: ComponentType<P>,
): ComponentType<P> {
  const WrappedComponent: ComponentType<P> = (props) => {
    const contextProps = useIconContext();

    // Merge context props with component props (component props take precedence)
    const mergedProps = {
      ...contextProps,
      ...props,
      className: [contextProps.className, props.className].filter(Boolean).join(' ') || undefined,
    } as P;

    return <Component {...mergedProps} />;
  };

  WrappedComponent.displayName = `withIconContext(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

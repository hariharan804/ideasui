import type { IconSetProps, IconProps } from './types';

import React, { createContext, useContext } from 'react';

// Icon context for consistent styling
const IconContext = createContext<Partial<IconProps>>({});

/**
 * Hook to access icon context values
 */
export const useIconContext = (): Partial<IconProps> => {
  return useContext(IconContext);
};

/**
 * Provider component for consistent icon styling across a component tree
 *
 * @param root0
 * @param root0.size
 * @param root0.color
 * @param root0.className
 * @param root0.children
 * @example
 * ```tsx
 * <IconSet size={20} color="blue" className="icon-base">
 *   <ArrowRight />
 *   <Home />
 *   <User />
 * </IconSet>
 * ```
 */
export const IconSet: React.FC<IconSetProps & { children: React.ReactNode }> = ({
  size,
  color,
  className,
  children,
  ...props
}) => {
  const contextValue = {
    size,
    color,
    className,
    ...props,
  };

  return <IconContext.Provider value={contextValue}>{children}</IconContext.Provider>;
};

/**
 * Higher-order component to wrap icons with context support
 * @param Component
 */
export function withIconContext<P extends IconProps>(
  Component: React.ComponentType<P>,
): React.ComponentType<P> {
  const WrappedComponent: React.ComponentType<P> = (props) => {
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

IconSet.displayName = 'IconSet';

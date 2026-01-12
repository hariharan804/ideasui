import type { IconSetProps } from './types';
import type { FC, ReactNode } from 'react';

import { useMemo } from 'react';

import { IconContext } from './icon-context';

/**
 * Provider component for consistent icon styling across a component tree
 *
 * @param {IconSetProps & { children: ReactNode }} root0 - Component props
 * @param {number | string} [root0.size] - Default size for icons
 * @param {string} [root0.color] - Default color for icons
 * @param {string} [root0.className] - Default class name for icons
 * @param {ReactNode} root0.children - Child components
 * @returns {JSX.Element} Provider component
 * @example
 * ```tsx
 * <IconSet size={20} color="blue" className="icon-base">
 *   <ArrowRight />
 *   <Home />
 *   <User />
 * </IconSet>
 * ```
 */
export const IconSet: FC<IconSetProps & { children: ReactNode }> = ({
  size,
  color,
  className,
  children,
  ...props
}) => {
  const contextValue = useMemo(
    () => ({
      size,
      color,
      className,
      ...props,
    }),
    [size, color, className, props],
  );

  return <IconContext.Provider value={contextValue}>{children}</IconContext.Provider>;
};

IconSet.displayName = 'IconSet';

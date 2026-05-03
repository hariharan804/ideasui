'use client';

import type { HTMLAttributes, ReactNode, JSX } from 'react';
import type { ButtonGroupContextType } from './button-group-context';

import { forwardRef } from 'react';
import { cn } from '@ideasui/utils';

import { ButtonGroupContext } from './button-group-context';

/* -----------------------------------------------------------------------------------------------
 * ButtonGroup Component
 * ---------------------------------------------------------------------------------------------*/

export interface ButtonGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, ButtonGroupContextType {
  /**
   * Whether the buttons in the group should be vertical.
   * @default false
   */
  isVertical?: boolean;
  /**
   * Whether the buttons in the group should be joined together without gaps.
   * @default true
   */
  isAttached?: boolean;
  /**
   * Whether to show a divider between the buttons in the group.
   * @default true (when isAttached is true)
   */
  showDivider?: boolean;
  /**
   * The content of the button group.
   */
  children: ReactNode;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      children,
      className,
      size,
      color,
      variant,
      isDisabled,
      isAttached = true,
      isVertical = false,
      radius,
      fullWidth,
      disableAnimation = true,
      showDivider,
      ...props
    },
    ref,
  ): JSX.Element => {
    const contextValue = {
      size,
      color,
      variant,
      isDisabled,
      isAttached,
      isVertical,
      radius,
      fullWidth,
      disableAnimation,
      showDivider,
    };

    const groupClasses = cn(
      fullWidth ? 'flex' : 'inline-flex',
      isVertical ? 'flex-col' : 'flex-row',
      isAttached ? 'isolate' : isVertical ? 'gap-y-2' : 'gap-x-2',
      fullWidth && 'w-full',
      className,
    );

    return (
      <ButtonGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={groupClasses}
          data-attached={isAttached}
          data-full-width={fullWidth}
          data-slot="button-group"
          data-vertical={isVertical}
          role="group"
          {...props}
        >
          {children}
        </div>
      </ButtonGroupContext.Provider>
    );
  },
);

ButtonGroup.displayName = 'IdeasUI.Button.Group';

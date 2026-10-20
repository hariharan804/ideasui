'use client';

import type { JSX, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import type {
  ChipClassNames,
  ChipColor,
  ChipComponent,
  ChipGroupContextValue,
  ChipMode,
  ChipProps,
  ChipSize,
  ChipSlotProps,
  ChipVariant,
} from './chip.types';
import type { ChipReturnType } from '@ideasui/theme/recipes';

import { forwardRef, useState } from 'react';
import { chip as chipRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { ChipAvatar } from './chip-avatar';
import { useChipGroupContext } from './chip-context';
import { ChipDismiss } from './chip-dismiss';
import { ChipGroup } from './chip-group';
import { ChipIcon } from './chip-icon';

interface RenderContentParameters {
  children?: ReactNode;
  classNames?: ChipClassNames;
  dismissLabel?: string;
  endContent?: ReactNode;
  onDismiss?: () => void;
  resolvedMode: string;
  slotProps?: ChipSlotProps;
  startContent?: ReactNode;
  styles: ChipReturnType;
}

function renderChipContent(parameters: RenderContentParameters): JSX.Element {
  const {
    children,
    classNames,
    dismissLabel,
    endContent,
    onDismiss,
    resolvedMode,
    slotProps,
    startContent,
    styles,
  } = parameters;

  const showAutoDismiss = resolvedMode === 'dismissible' && !endContent && Boolean(onDismiss);

  const fallbackLabel = typeof children === 'string' ? `Remove ${children}` : 'Remove';

  return (
    <>
      {startContent ? (
        <span
          {...slotProps?.startContent}
          className={cn(
            styles.startContent(),
            classNames?.startContent,
            slotProps?.startContent?.className,
          )}
          data-slot="chip-start-content"
        >
          {startContent}
        </span>
      ) : null}
      <span
        {...slotProps?.label}
        className={cn(styles.label(), classNames?.label, slotProps?.label?.className)}
        data-slot="chip-label"
      >
        {children}
      </span>
      {endContent ? (
        <span
          {...slotProps?.endContent}
          className={cn(
            styles.endContent(),
            classNames?.endContent,
            slotProps?.endContent?.className,
          )}
          data-slot="chip-end-content"
        >
          {endContent}
        </span>
      ) : null}
      {showAutoDismiss ? (
        <ChipDismiss
          {...slotProps?.dismiss}
          className={cn(styles.dismiss(), classNames?.dismiss, slotProps?.dismiss?.className)}
          label={dismissLabel ?? fallbackLabel}
          onClick={(event: MouseEvent<HTMLButtonElement>): void => {
            event.stopPropagation();
            onDismiss?.();
          }}
        />
      ) : null}
    </>
  );
}

interface ResolveConfigParameters {
  color?: ChipColor;
  isDisabled?: boolean;
  mode?: ChipMode;
  size?: ChipSize;
  variant?: ChipVariant;
}

interface ResolvedConfig {
  color: ChipColor;
  isDisabled: boolean;
  mode: ChipMode;
  size: ChipSize;
  variant: ChipVariant;
}

function resolveChipConfig(
  props: ResolveConfigParameters,
  group: ChipGroupContextValue | null,
): ResolvedConfig {
  return {
    color: props.color ?? group?.color ?? 'neutral',
    isDisabled: props.isDisabled ?? group?.isDisabled ?? false,
    mode: props.mode ?? (group ? 'selectable' : 'static'),
    size: props.size ?? group?.size ?? 'md',
    variant: props.variant ?? group?.variant ?? 'soft',
  };
}

const ChipBase = forwardRef<HTMLElement, ChipProps>(
  (
    {
      children,
      className,
      classNames,
      color,
      defaultSelected = false,
      dismissLabel,
      endContent,
      isDisabled,
      isSelected,
      mode,
      onChange,
      onDismiss,
      size,
      slotProps,
      startContent,
      style,
      value,
      variant,
      ...properties
    },
    reference,
  ): JSX.Element => {
    const group = useChipGroupContext();
    const config = resolveChipConfig({ color, isDisabled, mode, size, variant }, group);

    const isGroupControlled = Boolean(group && value !== undefined);
    const [internalSelected, setInternalSelected] = useState(defaultSelected);

    const resolvedSelected =
      isGroupControlled && value !== undefined
        ? (group?.selectedValues?.includes(value) ?? false)
        : (isSelected ?? internalSelected);

    const handleSelect = (): void => {
      if (config.isDisabled || config.mode !== 'selectable') {
        return;
      }
      const next = !resolvedSelected;

      if (isGroupControlled && value !== undefined) {
        group?.onGroupChange?.(value, next);
      } else if (isSelected === undefined) {
        setInternalSelected(next);
        onChange?.(next);
      } else {
        onChange?.(next);
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
      if (config.mode === 'dismissible' && (event.key === 'Delete' || event.key === 'Backspace')) {
        event.preventDefault();
        onDismiss?.();
      }
    };

    const styles = chipRecipe({
      color: config.color,
      isDisabled: config.isDisabled,
      isSelected: resolvedSelected,
      mode: config.mode,
      size: config.size,
      variant: config.variant,
    });

    const sharedProps = {
      className: cn(styles.root(), classNames?.root, className),
      'data-disabled': config.isDisabled || undefined,
      'data-mode': config.mode,
      'data-selected': resolvedSelected || undefined,
      'data-slot': 'chip' as const,
      onKeyDown: handleKeyDown,
      style,
    };

    const content = renderChipContent({
      children,
      classNames,
      dismissLabel,
      endContent,
      onDismiss,
      resolvedMode: config.mode,
      slotProps,
      startContent,
      styles,
    });

    if (config.mode === 'selectable') {
      return (
        <button
          ref={reference as React.Ref<HTMLButtonElement>}
          aria-pressed={resolvedSelected}
          disabled={config.isDisabled}
          type="button"
          onClick={handleSelect}
          {...sharedProps}
          {...(properties as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content}
        </button>
      );
    }

    return (
      <span
        ref={reference as React.Ref<HTMLSpanElement>}
        tabIndex={config.mode === 'dismissible' ? 0 : undefined}
        {...sharedProps}
        {...(properties as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {content}
      </span>
    );
  },
);

ChipBase.displayName = 'IdeasUI.Chip';

export const Chip = ChipBase as ChipComponent;

Chip.Group = ChipGroup;
Chip.Avatar = ChipAvatar;
Chip.Icon = ChipIcon;
Chip.Dismiss = ChipDismiss;

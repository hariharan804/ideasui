'use client';

import type { JSX, ReactNode, Ref } from 'react';
import type { BadgeAnchorOrigin, BadgeComponent, BadgePlacement, BadgeProps } from './badge.types';

import { forwardRef } from 'react';
import { badge as badgeRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { BadgeAnchor } from './badge-anchor';

function resolvePlacement(
  anchorOrigin?: BadgeAnchorOrigin,
  placement?: BadgePlacement,
): BadgePlacement {
  if (placement) {
    return placement;
  }
  if (!anchorOrigin) {
    return 'top-right';
  }

  const vertical = anchorOrigin.vertical ?? 'top';
  const horizontal = anchorOrigin.horizontal ?? 'right';

  return `${vertical}-${horizontal}` as BadgePlacement;
}

function parseNumeric(value: ReactNode): number {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string' && value.trim() !== '') {
    return Number(value);
  }

  return Number.NaN;
}

function resolveContent(content: ReactNode, max: number, isDot: boolean): ReactNode {
  if (isDot) {
    return null;
  }
  const numeric = parseNumeric(content);

  if (!Number.isNaN(numeric) && Number.isFinite(numeric) && numeric > max) {
    return `${max}+`;
  }

  return content;
}

function resolveInvisible(
  rawInvisible: boolean,
  showZero: boolean,
  content: ReactNode,
  isDot: boolean,
): boolean {
  if (rawInvisible) {
    return true;
  }
  if (!isDot && !showZero && (content === 0 || content === '0')) {
    return true;
  }

  return false;
}

interface ParsedBadgeOptions {
  readonly isDotEffective: boolean;
  readonly variantEffective: 'solid' | 'soft' | 'outline' | 'ghost' | 'standard' | 'dot';
  readonly resolvedPlacement: BadgePlacement;
  readonly hasWrappedChild: boolean;
  readonly contentToDisplay: ReactNode;
  readonly isActuallyInvisible: boolean;
}

function parseBadgeOptions(props: BadgeProps): ParsedBadgeOptions {
  const isDot = Boolean(props.isDot || props.variant === 'dot');
  const variant = props.variant === 'standard' || !props.variant ? 'solid' : props.variant;
  const placement = resolvePlacement(props.anchorOrigin, props.placement);
  const hasWrapped = props.children !== undefined && (props.badgeContent !== undefined || isDot);
  const content = hasWrapped ? props.badgeContent : (props.badgeContent ?? props.children);
  const invisible = resolveInvisible(
    Boolean(props.invisible || props.isInvisible),
    Boolean(props.showZero),
    content,
    isDot,
  );

  return {
    isDotEffective: isDot,
    variantEffective: variant as 'solid' | 'soft' | 'outline' | 'ghost' | 'standard' | 'dot',
    resolvedPlacement: placement,
    hasWrappedChild: hasWrapped,
    contentToDisplay: content,
    isActuallyInvisible: invisible,
  };
}

function renderAnchoredBadge(
  props: BadgeProps,
  opts: ParsedBadgeOptions,
  styles: ReturnType<typeof badgeRecipe>,
  renderedContent: ReactNode,
  reference: Ref<HTMLSpanElement>,
): JSX.Element {
  const RootElement = props.slots?.root ?? props.component ?? 'span';
  const BadgeElement = props.slots?.badge ?? 'span';

  return (
    <RootElement
      ref={reference}
      className={cn(
        styles.root(),
        props.classNames?.root,
        props.classes?.root,
        props.className,
        props.slotProps?.root?.className,
      )}
      data-slot="badge-root"
      style={{ ...props.style, ...props.slotProps?.root?.style }}
      {...props.slotProps?.root}
    >
      {props.children}
      <BadgeElement
        aria-hidden={opts.isDotEffective || opts.isActuallyInvisible ? 'true' : undefined}
        className={cn(
          styles.badge(),
          props.classNames?.badge,
          props.classes?.badge,
          props.slotProps?.badge?.className,
        )}
        data-dot={opts.isDotEffective || undefined}
        data-invisible={opts.isActuallyInvisible || undefined}
        data-slot="badge"
        style={props.slotProps?.badge?.style}
        {...props.slotProps?.badge}
      >
        {renderedContent}
      </BadgeElement>
    </RootElement>
  );
}

function renderStandaloneBadge(
  props: BadgeProps,
  opts: ParsedBadgeOptions,
  styles: ReturnType<typeof badgeRecipe>,
  renderedContent: ReactNode,
  reference: Ref<HTMLSpanElement>,
): JSX.Element {
  const BadgeElement = props.slots?.badge ?? 'span';

  return (
    <BadgeElement
      ref={reference}
      aria-hidden={opts.isDotEffective || opts.isActuallyInvisible ? 'true' : undefined}
      className={cn(
        styles.badge(),
        props.classNames?.root,
        props.classNames?.badge,
        props.classes?.root,
        props.classes?.badge,
        props.className,
        props.slotProps?.root?.className,
        props.slotProps?.badge?.className,
      )}
      data-dot={opts.isDotEffective || undefined}
      data-invisible={opts.isActuallyInvisible || undefined}
      data-slot="badge"
      style={{ ...props.style, ...props.slotProps?.root?.style, ...props.slotProps?.badge?.style }}
      {...props.slotProps?.root}
      {...props.slotProps?.badge}
    >
      {renderedContent}
    </BadgeElement>
  );
}

const BadgeBase = forwardRef<HTMLSpanElement, BadgeProps>((props, reference): JSX.Element => {
  const opts = parseBadgeOptions(props);
  const styles = badgeRecipe({
    variant: opts.variantEffective,
    color: (props.color ?? 'primary') as
      'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info',
    size: props.size ?? 'md',
    placement: opts.resolvedPlacement,
    overlap: props.overlap ?? 'rectangular',
    isAnchored: opts.hasWrappedChild,
    bordered: props.bordered ?? false,
    isDot: opts.isDotEffective,
    isInvisible: opts.isActuallyInvisible,
  });

  const renderedContent = resolveContent(
    opts.contentToDisplay,
    props.max ?? 99,
    opts.isDotEffective,
  );

  if (opts.hasWrappedChild) {
    return renderAnchoredBadge(props, opts, styles, renderedContent, reference);
  }

  return renderStandaloneBadge(props, opts, styles, renderedContent, reference);
});

BadgeBase.displayName = 'IdeasUI.Badge';

export const Badge = BadgeBase as BadgeComponent;
Badge.Anchor = BadgeAnchor;

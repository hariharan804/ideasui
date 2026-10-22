/* eslint-disable testing-library/no-node-access */
import '@testing-library/jest-dom';

import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { expectAccessible } from '@ideasui/utils/test';

import { Badge, BadgeAnchor } from '../src';

describe('Badge Component Suite', () => {
  describe('Anatomy & Display Names', () => {
    it('sets correct displayNames for all subcomponents', () => {
      expect(Badge.displayName).toBe('IdeasUI.Badge');
      expect(BadgeAnchor.displayName).toBe('IdeasUI.BadgeAnchor');
    });

    it('renders correct data-slot attributes in standalone mode', () => {
      render(<Badge>5</Badge>);
      expect(screen.getByText('5')).toHaveAttribute('data-slot', 'badge');
    });

    it('renders correct data-slot attributes when anchoring with badgeContent', () => {
      render(
        <Badge badgeContent={4}>
          <span data-testid="target-icon">Icon</span>
        </Badge>,
      );

      expect(screen.getByText('4')).toHaveAttribute('data-slot', 'badge');
      expect(screen.getByTestId('target-icon').parentElement).toHaveAttribute(
        'data-slot',
        'badge-root',
      );
    });

    it('renders correct data-slot attributes when using BadgeAnchor', () => {
      render(
        <BadgeAnchor badge={<Badge>5</Badge>}>
          <span>Child</span>
        </BadgeAnchor>,
      );

      expect(screen.getByText('5')).toHaveAttribute('data-slot', 'badge');
      expect(screen.getByText('Child').parentElement).toHaveAttribute('data-slot', 'badge-anchor');
      expect(screen.getByText('5').parentElement).toHaveAttribute('data-slot', 'badge-wrapper');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to Badge element in standalone mode', () => {
      const reference = createRef<HTMLSpanElement>();

      render(<Badge ref={reference}>5</Badge>);

      expect(reference.current).toBeInstanceOf(HTMLSpanElement);
      expect(reference.current?.tagName).toBe('SPAN');
    });

    it('forwards ref to root wrapper element in anchored mode', () => {
      const reference = createRef<HTMLSpanElement>();

      render(
        <Badge ref={reference} badgeContent={3}>
          <span>Target</span>
        </Badge>,
      );

      expect(reference.current).toBeInstanceOf(HTMLSpanElement);
      expect(reference.current).toHaveAttribute('data-slot', 'badge-root');
    });

    it('forwards ref to BadgeAnchor span element', () => {
      const reference = createRef<HTMLSpanElement>();

      render(
        <BadgeAnchor ref={reference} badge={<Badge>1</Badge>}>
          <span>Target</span>
        </BadgeAnchor>,
      );

      expect(reference.current).toBeInstanceOf(HTMLSpanElement);
      expect(reference.current?.tagName).toBe('SPAN');
    });
  });

  describe('Variants, Colors, and Sizes', () => {
    it('renders all variants without error', () => {
      const variants = ['standard', 'solid', 'soft', 'outline', 'ghost', 'dot'] as const;

      for (const variant of variants) {
        const { unmount } = render(<Badge variant={variant}>Test</Badge>);

        if (variant !== 'dot') {
          expect(screen.getByText('Test')).toBeInTheDocument();
        }
        unmount();
      }
    });

    it('renders all colors without error', () => {
      const colors = [
        'primary',
        'secondary',
        'neutral',
        'default',
        'success',
        'warning',
        'danger',
        'error',
        'info',
      ] as const;

      for (const color of colors) {
        const { unmount } = render(<Badge color={color}>Test</Badge>);

        expect(screen.getByText('Test')).toBeInTheDocument();
        unmount();
      }
    });

    it('renders all sizes without error', () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      for (const size of sizes) {
        const { unmount } = render(<Badge size={size}>Test</Badge>);

        expect(screen.getByText('Test')).toBeInTheDocument();
        unmount();
      }
    });
  });

  describe('Anchor Origin & Placement', () => {
    it('applies default top-right anchor position', () => {
      render(
        <Badge badgeContent={1}>
          <span>Mail</span>
        </Badge>,
      );

      const badgeElement = screen.getByText('1');

      expect(badgeElement.className).toContain('ideasui-badge--top-right');
    });

    it('supports anchorOrigin vertical and horizontal options', () => {
      const { rerender } = render(
        <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} badgeContent={2}>
          <span>Mail</span>
        </Badge>,
      );

      expect(screen.getByText('2').className).toContain('ideasui-badge--bottom-left');

      rerender(
        <Badge anchorOrigin={{ vertical: 'top', horizontal: 'left' }} badgeContent={2}>
          <span>Mail</span>
        </Badge>,
      );
      expect(screen.getByText('2').className).toContain('ideasui-badge--top-left');

      rerender(
        <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={2}>
          <span>Mail</span>
        </Badge>,
      );
      expect(screen.getByText('2').className).toContain('ideasui-badge--bottom-right');
    });

    it('supports direct placement shorthand prop', () => {
      render(
        <Badge badgeContent={7} placement="bottom-left">
          <span>Icon</span>
        </Badge>,
      );

      expect(screen.getByText('7').className).toContain('ideasui-badge--bottom-left');
    });
  });

  describe('Overlap Prop', () => {
    it('applies rectangular overlap by default', () => {
      render(
        <Badge badgeContent={1}>
          <span>Box</span>
        </Badge>,
      );

      expect(screen.getByText('1').className).toContain('ideasui-badge--overlap-rectangular');
    });

    it('applies circular overlap when requested', () => {
      render(
        <Badge badgeContent={1} overlap="circular">
          <span>Avatar</span>
        </Badge>,
      );

      expect(screen.getByText('1').className).toContain('ideasui-badge--overlap-circular');
    });
  });

  describe('Dot Mode', () => {
    it('renders dot via variant="dot" without text and sets aria-hidden="true"', () => {
      render(
        <Badge data-testid="dot-variant" variant="dot">
          <span>Target</span>
        </Badge>,
      );

      const dot = screen.getByTestId('dot-variant').querySelector('[data-slot="badge"]');

      expect(dot).toHaveAttribute('data-dot', 'true');
      expect(dot).toHaveAttribute('aria-hidden', 'true');
      expect(dot).toBeEmptyDOMElement();
    });

    it('renders dot via isDot prop without text children and sets aria-hidden="true"', () => {
      render(
        <Badge isDot data-testid="dot-badge">
          Hidden Text
        </Badge>,
      );
      const badge = screen.getByTestId('dot-badge');

      expect(badge).toHaveAttribute('data-dot', 'true');
      expect(badge).toHaveAttribute('aria-hidden', 'true');
      expect(badge).toBeEmptyDOMElement();
      expect(screen.queryByText('Hidden Text')).not.toBeInTheDocument();
    });
  });

  describe('Zero Count & showZero Prop', () => {
    it('hides badge when badgeContent is 0 and showZero is false', () => {
      render(
        <Badge badgeContent={0}>
          <span>Inbox</span>
        </Badge>,
      );

      const badge = screen.getByText('0');

      expect(badge).toHaveAttribute('data-invisible', 'true');
      expect(badge).toHaveAttribute('aria-hidden', 'true');
    });

    it('shows badge when badgeContent is 0 and showZero is true', () => {
      render(
        <Badge showZero badgeContent={0}>
          <span>Inbox</span>
        </Badge>,
      );

      const badge = screen.getByText('0');

      expect(badge).not.toHaveAttribute('data-invisible');
      expect(badge).not.toHaveAttribute('aria-hidden');
    });
  });

  describe('Max Count Behavior', () => {
    it('renders {max}+ when numeric count exceeds max', () => {
      render(<Badge max={99}>{120}</Badge>);
      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('renders {max}+ when badgeContent exceeds max', () => {
      render(
        <Badge badgeContent={150} max={99}>
          <span>Inbox</span>
        </Badge>,
      );
      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('supports custom max values like 999', () => {
      render(
        <Badge badgeContent={1200} max={999}>
          <span>Inbox</span>
        </Badge>,
      );
      expect(screen.getByText('999+')).toBeInTheDocument();
    });

    it('renders non-numeric string content unchanged even when max is set', () => {
      render(<Badge max={99}>New</Badge>);
      expect(screen.getByText('New')).toBeInTheDocument();
    });
  });

  describe('Invisible Prop', () => {
    it('sets data-invisible="true" and aria-hidden="true" without unmounting', () => {
      render(
        <Badge invisible data-testid="inv-badge">
          0
        </Badge>,
      );
      const badge = screen.getByTestId('inv-badge');

      expect(badge).toHaveAttribute('data-invisible', 'true');
      expect(badge).toHaveAttribute('aria-hidden', 'true');
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('supports isInvisible alias prop', () => {
      render(
        <Badge isInvisible data-testid="is-inv-badge">
          5
        </Badge>,
      );
      const badge = screen.getByTestId('is-inv-badge');

      expect(badge).toHaveAttribute('data-invisible', 'true');
      expect(badge).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Bordered Prop', () => {
    it('applies bordered class when bordered is true', () => {
      render(
        <Badge bordered badgeContent={3}>
          <span>Avatar</span>
        </Badge>,
      );

      expect(screen.getByText('3').className).toContain('ideasui-badge--bordered');
    });
  });

  describe('Slots, SlotProps, Classes, and Component', () => {
    it('renders custom root component via component prop', () => {
      render(
        <Badge badgeContent={2} component="div" data-testid="custom-component">
          <span>Content</span>
        </Badge>,
      );

      const root = screen.getByTestId('custom-component');

      expect(root.tagName).toBe('DIV');
    });

    it('supports slotProps and classes customization', () => {
      render(
        <Badge
          badgeContent={5}
          classes={{
            root: 'custom-classes-root',
            badge: 'custom-classes-badge',
          }}
          slotProps={{
            root: { 'data-testid': 'custom-slot-root' },
            badge: { 'data-testid': 'custom-slot-badge' },
          }}
        >
          <span>Target</span>
        </Badge>,
      );

      const root = screen.getByTestId('custom-slot-root');
      const badge = screen.getByTestId('custom-slot-badge');

      expect(root).toHaveClass('custom-classes-root');
      expect(badge).toHaveClass('custom-classes-badge');
    });
  });

  describe('Accessibility (WCAG 2.1 AA)', () => {
    it('standalone count badge has zero a11y violations', async () => {
      const { container } = render(<Badge color="danger">5</Badge>);

      await expectAccessible(container);
    });

    it('anchored badge with mail icon has zero a11y violations', async () => {
      const { container } = render(
        <Badge badgeContent={4} color="danger">
          <span aria-label="Inbox mail count">Mail</span>
        </Badge>,
      );

      await expectAccessible(container);
    });

    it('anchored circular avatar with dot badge has zero a11y violations', async () => {
      const { container } = render(
        <Badge bordered color="success" overlap="circular" variant="dot">
          <span aria-label="Remy Sharp (Online)">RS</span>
        </Badge>,
      );

      await expectAccessible(container);
    });

    it('invisible badge has zero a11y violations', async () => {
      const { container } = render(
        <Badge invisible color="danger">
          0
        </Badge>,
      );

      await expectAccessible(container);
    });
  });
});

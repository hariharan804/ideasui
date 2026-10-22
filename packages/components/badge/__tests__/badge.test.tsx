/* eslint-disable testing-library/no-container, testing-library/no-node-access */
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

    it('renders correct data-slot attributes', () => {
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
    it('forwards ref to Badge span element', () => {
      const reference = createRef<HTMLSpanElement>();

      render(<Badge ref={reference}>5</Badge>);

      expect(reference.current).toBeInstanceOf(HTMLSpanElement);
      expect(reference.current?.tagName).toBe('SPAN');
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
      const variants = ['solid', 'soft', 'outline', 'ghost'] as const;

      for (const variant of variants) {
        const { unmount } = render(<Badge variant={variant}>Test</Badge>);

        expect(screen.getByText('Test')).toBeInTheDocument();
        unmount();
      }
    });

    it('renders all colors without error', () => {
      const colors = ['primary', 'neutral', 'success', 'warning', 'danger'] as const;

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

  describe('Dot Mode', () => {
    it('renders dot without text children and sets aria-hidden="true"', () => {
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

  describe('Max Count Behavior', () => {
    it('renders {max}+ when numeric count exceeds max', () => {
      render(<Badge max={99}>{120}</Badge>);
      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('renders {max}+ when numeric string count exceeds max', () => {
      render(<Badge max={9}>15</Badge>);
      expect(screen.getByText('9+')).toBeInTheDocument();
    });

    it('renders original count when within max', () => {
      render(<Badge max={99}>{50}</Badge>);
      expect(screen.getByText('50')).toBeInTheDocument();
    });

    it('renders non-numeric string children unchanged even when max is set', () => {
      render(<Badge max={99}>New</Badge>);
      expect(screen.getByText('New')).toBeInTheDocument();
    });
  });

  describe('Invisible Mode', () => {
    it('sets data-invisible="true" and aria-hidden="true" without unmounting', () => {
      render(
        <Badge isInvisible data-testid="inv-badge">
          0
        </Badge>,
      );
      const badge = screen.getByTestId('inv-badge');

      expect(badge).toHaveAttribute('data-invisible', 'true');
      expect(badge).toHaveAttribute('aria-hidden', 'true');
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('BadgeAnchor Layout & Placement', () => {
    it('applies placement classes correctly', () => {
      const placements = ['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const;

      for (const placement of placements) {
        const { container, unmount } = render(
          <BadgeAnchor badge={<Badge>1</Badge>} placement={placement}>
            <span>Item</span>
          </BadgeAnchor>,
        );

        const wrapper = container.querySelector('[data-slot="badge-wrapper"]');

        expect(wrapper?.className).toContain(placement);
        unmount();
      }
    });

    it('applies offset custom properties when offset prop is provided', () => {
      const { container } = render(
        <BadgeAnchor badge={<Badge>1</Badge>} offset={{ x: 4, y: -2 }}>
          <span>Item</span>
        </BadgeAnchor>,
      );

      const wrapper = container.querySelector('[data-slot="badge-wrapper"]');

      expect(wrapper).toHaveStyle({
        '--badge-offset-x': '4px',
        '--badge-offset-y': '-2px',
      });
    });
  });

  describe('Compound Dot Notation & Customization', () => {
    it('supports compound dot notation (Badge.Anchor)', () => {
      expect(Badge.Anchor).toBe(BadgeAnchor);
    });

    it('supports classNames and slotProps customization on Badge', () => {
      render(
        <Badge
          classNames={{ root: 'custom-root-class' }}
          slotProps={{
            root: { 'data-testid': 'custom-badge-slot', id: 'badge-id' },
          }}
        >
          Custom
        </Badge>,
      );

      const badge = screen.getByTestId('custom-badge-slot');

      expect(badge).toHaveClass('custom-root-class');
      expect(badge).toHaveAttribute('id', 'badge-id');
    });

    it('supports classNames and slotProps customization on BadgeAnchor', () => {
      render(
        <BadgeAnchor
          badge={<Badge>1</Badge>}
          classNames={{
            root: 'custom-anchor-root',
            badgeWrapper: 'custom-anchor-wrapper',
          }}
          slotProps={{
            root: { 'data-testid': 'custom-anchor-slot' },
            badgeWrapper: { 'data-testid': 'custom-wrapper-slot' },
          }}
        >
          <span>Target</span>
        </BadgeAnchor>,
      );

      const anchor = screen.getByTestId('custom-anchor-slot');
      const wrapper = screen.getByTestId('custom-wrapper-slot');

      expect(anchor).toHaveClass('custom-anchor-root');
      expect(wrapper).toHaveClass('custom-anchor-wrapper');
    });
  });

  describe('Edge Cases', () => {
    it('handles whitespace string children without converting to numeric zero', () => {
      render(<Badge max={5}>{'   '}</Badge>);
      expect(screen.queryByText('5+')).not.toBeInTheDocument();
    });

    it('renders zero count correctly when max is specified', () => {
      render(<Badge max={5}>{0}</Badge>);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('handles undefined or null children gracefully', () => {
      const { container } = render(<Badge>{null}</Badge>);

      expect(container.querySelector('[data-slot="badge"]')).toBeInTheDocument();
    });
  });

  describe('Accessibility (WCAG 2.1 AA)', () => {
    it('standalone count badge has zero a11y violations', async () => {
      const { container } = render(<Badge color="danger">5</Badge>);

      await expectAccessible(container);
    });

    it('standalone label badge has zero a11y violations', async () => {
      const { container } = render(
        <Badge color="success" variant="soft">
          Active
        </Badge>,
      );

      await expectAccessible(container);
    });

    it('anchored badge has zero a11y violations', async () => {
      const { container } = render(
        <BadgeAnchor badge={<Badge color="danger">3</Badge>}>
          <span aria-label="User avatar">JD</span>
        </BadgeAnchor>,
      );

      await expectAccessible(container);
    });

    it('dot badge has zero a11y violations', async () => {
      const { container } = render(
        <BadgeAnchor badge={<Badge isDot color="success" />}>
          <span aria-label="Online user">JD</span>
        </BadgeAnchor>,
      );

      await expectAccessible(container);
    });

    it('invisible badge has zero a11y violations', async () => {
      const { container } = render(
        <Badge isInvisible color="danger">
          0
        </Badge>,
      );

      await expectAccessible(container);
    });
  });
});

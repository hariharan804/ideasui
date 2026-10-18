import '@testing-library/jest-dom';

import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { expectAccessible } from '@ideasui/utils/test';

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarIcon,
  AvatarImage,
  useRequiredAvatarGroupContext,
} from '../src';

function ContextConsumer(): null {
  useRequiredAvatarGroupContext();

  return null;
}

describe('Avatar Component', () => {
  describe('Basic Rendering & Fallbacks', () => {
    it('renders with name and generates correct initials', () => {
      render(<Avatar name="Jane Doe" />);
      const avatar = screen.getByRole('img', { name: 'Jane Doe' });

      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('data-slot', 'avatar');
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('generates single initial for single-word name and at most 2 initials for long names', () => {
      const { rerender } = render(<Avatar name="Alice" />);

      expect(screen.getByText('A')).toBeInTheDocument();

      rerender(<Avatar name="John Jacob Smith" />);
      expect(screen.getByText('JJ')).toBeInTheDocument();
    });

    it('renders default person icon when neither name nor children are provided', () => {
      render(<Avatar data-testid="default-avatar" />);
      const avatar = screen.getByTestId('default-avatar');

      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('data-slot', 'avatar');
    });

    it('renders image when src is provided', () => {
      render(<Avatar alt="Jane" name="Jane Doe" src="/avatar.jpg" />);
      const img = screen.getByAltText('Jane');

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', '/avatar.jpg');
      expect(img).toHaveAttribute('data-slot', 'avatar-image');
    });

    it('falls back to initials when image encounters an error', () => {
      render(<Avatar name="Jane Doe" src="/broken.jpg" />);
      const img = screen.getByAltText('Jane Doe');

      expect(img).toBeInTheDocument();

      fireEvent.error(img);

      expect(screen.getByRole('img', { name: 'Jane Doe' })).toBeInTheDocument();
      expect(screen.getByText('JD')).toBeInTheDocument();
      expect(screen.queryByAltText('Jane Doe')).not.toBeInTheDocument();
    });

    it('resets error state when src prop updates dynamically', () => {
      const { rerender } = render(<Avatar name="Jane Doe" src="/broken.jpg" />);
      const img = screen.getByAltText('Jane Doe');

      fireEvent.error(img);
      expect(screen.getByText('JD')).toBeInTheDocument();

      rerender(<Avatar name="Jane Doe" src="/new-valid.jpg" />);
      expect(screen.getByAltText('Jane Doe')).toBeInTheDocument();
      expect(screen.getByAltText('Jane Doe')).toHaveAttribute('src', '/new-valid.jpg');
    });

    it('handles names with irregular whitespace and empty strings gracefully', () => {
      const { rerender } = render(<Avatar name="   Jane    Doe   " />);

      expect(screen.getByText('JD')).toBeInTheDocument();

      rerender(<Avatar data-testid="whitespace-only" name="    " />);
      expect(screen.getByTestId('whitespace-only')).toHaveAttribute('data-slot', 'avatar');
      expect(screen.queryByText(/^[A-Z]/)).not.toBeInTheDocument();
    });
  });

  describe('Sub-components & Modes', () => {
    it('renders inline SVG in AvatarImage children mode', () => {
      render(
        <Avatar name="Bot">
          <AvatarImage>
            <svg data-testid="bot-svg" />
          </AvatarImage>
        </Avatar>,
      );

      expect(screen.getByTestId('bot-svg')).toBeInTheDocument();
    });

    it('renders custom renderer via as prop on AvatarImage', () => {
      render(
        <Avatar name="Jane">
          <AvatarImage
            alt="Jane Custom"
            as={({ src, alt, className }) => (
              <img alt={alt} className={className} data-testid="custom-img" src={src} />
            )}
            src="/custom.jpg"
          />
        </Avatar>,
      );

      const customImg = screen.getByTestId('custom-img');

      expect(customImg).toBeInTheDocument();
      expect(customImg).toHaveAttribute('src', '/custom.jpg');
      expect(customImg).toHaveAttribute('alt', 'Jane Custom');
    });

    it('renders custom icon inside AvatarFallback with AvatarIcon', () => {
      render(
        <Avatar aria-label="Custom user">
          <AvatarFallback data-testid="custom-fallback">
            <AvatarIcon>
              <span data-testid="user-icon">icon</span>
            </AvatarIcon>
          </AvatarFallback>
        </Avatar>,
      );

      expect(screen.getByTestId('user-icon')).toBeInTheDocument();
      expect(screen.getByTestId('custom-fallback')).toHaveAttribute('aria-hidden', 'true');
    });

    it('supports compound dot notation (Avatar.Group, Avatar.Image, Avatar.Fallback, Avatar.Icon)', () => {
      render(
        <Avatar.Group label="Team">
          <Avatar name="Alice">
            <Avatar.Fallback>
              <Avatar.Icon>
                <span data-testid="dot-icon">icon</span>
              </Avatar.Icon>
            </Avatar.Fallback>
          </Avatar>
        </Avatar.Group>,
      );

      expect(screen.getByRole('group', { name: 'Team' })).toBeInTheDocument();
      expect(screen.getByTestId('dot-icon')).toBeInTheDocument();
    });

    it('supports shorthand icon, fallback, and initials props on Avatar', () => {
      const { rerender } = render(
        <Avatar aria-label="User" icon={<span data-testid="shorthand-icon">icon</span>} />,
      );

      expect(screen.getByTestId('shorthand-icon')).toBeInTheDocument();

      rerender(
        <Avatar
          aria-label="User"
          fallback={<span data-testid="shorthand-fallback">custom</span>}
        />,
      );
      expect(screen.getByTestId('shorthand-fallback')).toBeInTheDocument();

      rerender(<Avatar initials="ZZ" name="John Doe" />);
      expect(screen.getByText('ZZ')).toBeInTheDocument();
    });

    it('supports icon shorthand on AvatarFallback directly', () => {
      render(
        <Avatar aria-label="User">
          <Avatar.Fallback icon={<span data-testid="fallback-icon-shorthand">icon</span>} />
        </Avatar>,
      );

      expect(screen.getByTestId('fallback-icon-shorthand')).toBeInTheDocument();
    });
  });

  describe('Variants, Shapes, Sizes, and States', () => {
    it('applies variant and color classes correctly', () => {
      const { rerender } = render(<Avatar color="primary" name="A" variant="solid" />);
      let avatar = screen.getByRole('img');

      expect(avatar).toHaveClass('bg-primary');
      expect(avatar).toHaveClass('text-on-primary');

      rerender(<Avatar color="success" name="B" variant="soft" />);
      avatar = screen.getByRole('img');
      expect(avatar).toHaveClass('bg-success-subtle');
      expect(avatar).toHaveClass('text-success');

      rerender(<Avatar color="warning" name="C" variant="outline" />);
      avatar = screen.getByRole('img');
      expect(avatar).toHaveClass('border');
      expect(avatar).toHaveClass('border-warning');

      rerender(<Avatar color="danger" name="D" variant="ghost" />);
      avatar = screen.getByRole('img');
      expect(avatar).toHaveClass('text-danger');
    });

    it('applies shape classes correctly', () => {
      const { rerender } = render(<Avatar name="A" shape="circle" />);

      expect(screen.getByRole('img')).toHaveClass('rounded-full');

      rerender(<Avatar name="B" shape="square" />);
      expect(screen.getByRole('img')).toHaveClass('rounded-lg');
    });

    it('applies size classes correctly', () => {
      const { rerender } = render(<Avatar name="A" size="xs" />);

      expect(screen.getByRole('img')).toHaveClass('size-6');

      rerender(<Avatar name="B" size="lg" />);
      expect(screen.getByRole('img')).toHaveClass('size-12');
    });

    it('applies isBordered ring classes correctly', () => {
      render(<Avatar isBordered color="primary" name="A" />);
      const avatar = screen.getByRole('img');

      expect(avatar).toHaveClass('ring-2');
      expect(avatar).toHaveClass('ring-primary');
    });

    it('handles isDisabled state correctly', () => {
      render(<Avatar isDisabled name="Disabled User" />);
      const avatar = screen.getByRole('img', { name: 'Disabled User' });

      expect(avatar).toHaveAttribute('data-disabled', 'true');
      expect(avatar).toHaveClass('opacity-50');
      expect(avatar).toHaveClass('pointer-events-none');
    });
  });

  describe('Refs & Display Names', () => {
    it('forwards ref on Avatar to HTMLSpanElement', () => {
      const ref = createRef<HTMLSpanElement>();

      render(<Avatar ref={ref} name="Jane" />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('sets correct displayName on all sub-components', () => {
      expect(Avatar.displayName).toBe('IdeasUI.Avatar');
      expect(AvatarGroup.displayName).toBe('IdeasUI.AvatarGroup');
      expect(AvatarImage.displayName).toBe('IdeasUI.AvatarImage');
      expect(AvatarFallback.displayName).toBe('IdeasUI.AvatarFallback');
      expect(AvatarIcon.displayName).toBe('IdeasUI.AvatarIcon');
    });
  });

  describe('AvatarGroup', () => {
    it('renders group with role="group" and aria-label', () => {
      render(
        <AvatarGroup label="Engineering Team">
          <Avatar name="Alice" />
          <Avatar name="Bob" />
        </AvatarGroup>,
      );

      const group = screen.getByRole('group', { name: 'Engineering Team' });

      expect(group).toBeInTheDocument();
      expect(group).toHaveAttribute('data-slot', 'avatar-group');
    });

    it('limits visible avatars to max and renders overflow count', () => {
      render(
        <AvatarGroup label="Team" max={2}>
          <Avatar name="Alice" />
          <Avatar name="Bob" />
          <Avatar name="Carol" />
          <Avatar name="Dave" />
        </AvatarGroup>,
      );

      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
      expect(screen.queryByText('C')).not.toBeInTheDocument();
      expect(screen.queryByText('D')).not.toBeInTheDocument();

      const overflow = screen.getByText('+2');

      expect(overflow).toBeInTheDocument();
      expect(overflow).toHaveAttribute('data-slot', 'avatar-overflow');
      expect(overflow).toHaveAttribute('aria-label', '2 more');
    });

    it('applies negative margin spacing between items', () => {
      render(
        <AvatarGroup spacing="-0.75rem">
          <Avatar name="A" />
          <Avatar name="B" />
        </AvatarGroup>,
      );

      // eslint-disable-next-line testing-library/no-node-access
      const avatarA = screen.getByRole('img', { name: 'A' }).parentElement;
      // eslint-disable-next-line testing-library/no-node-access
      const avatarB = screen.getByRole('img', { name: 'B' }).parentElement;

      expect(avatarA).not.toHaveStyle({ marginInlineStart: '-0.75rem' });
      expect(avatarB).toHaveStyle({ marginInlineStart: '-0.75rem' });
    });

    it('propagates size, variant, color, and isBordered from AvatarGroup to children', () => {
      render(
        <AvatarGroup isBordered color="success" size="lg" variant="solid">
          <Avatar name="Alice" />
        </AvatarGroup>,
      );

      const avatar = screen.getByRole('img');

      expect(avatar).toHaveClass('size-12');
      expect(avatar).toHaveClass('bg-success');
      expect(avatar).toHaveClass('ring-success');
    });

    it('allows individual avatar props to override group context', () => {
      render(
        <AvatarGroup color="neutral" size="sm" variant="soft">
          <Avatar color="danger" name="Alice" size="xl" variant="solid" />
        </AvatarGroup>,
      );

      const avatar = screen.getByRole('img');

      expect(avatar).toHaveClass('size-16');
      expect(avatar).toHaveClass('bg-danger');
    });

    it('forwards ref on AvatarGroup to HTMLDivElement', () => {
      const ref = createRef<HTMLDivElement>();

      render(
        <AvatarGroup ref={ref}>
          <Avatar name="A" />
        </AvatarGroup>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('throws error when useRequiredAvatarGroupContext is used outside AvatarGroup', () => {
      expect(() => render(<ContextConsumer />)).toThrow(
        'useRequiredAvatarGroupContext must be used within an <AvatarGroup> component.',
      );
    });

    it('supports classNames and slotProps on AvatarGroup', () => {
      render(
        <AvatarGroup
          classNames={{ root: 'custom-group', overflow: 'custom-overflow' }}
          label="Custom Group"
          max={1}
          slotProps={{
            root: { 'data-testid': 'group-root' },
            overflow: { 'data-testid': 'group-overflow' },
          }}
        >
          <Avatar name="A" />
          <Avatar name="B" />
        </AvatarGroup>,
      );

      const groupRoot = screen.getByTestId('group-root');
      const groupOverflow = screen.getByTestId('group-overflow');

      expect(groupRoot).toHaveClass('custom-group');
      expect(groupOverflow).toHaveClass('custom-overflow');
    });

    it('supports classNames and slotProps on Avatar', () => {
      render(
        <Avatar
          classNames={{ root: 'custom-avatar-root', image: 'custom-img' }}
          name="Jane"
          slotProps={{
            root: { 'data-testid': 'avatar-root' },
            image: { 'data-testid': 'avatar-img' },
          }}
          src="/test.jpg"
        />,
      );

      const root = screen.getByTestId('avatar-root');
      const img = screen.getByTestId('avatar-img');

      expect(root).toHaveClass('custom-avatar-root');
      expect(img).toHaveClass('custom-img');
    });
  });

  describe('Accessibility (WCAG 2.1 AA)', () => {
    it('avatar with name has zero a11y violations', async () => {
      const { container } = render(<Avatar name="Jane Doe" />);

      await expectAccessible(container);
      expect(container).toBeInTheDocument();
    });

    it('avatar with src and name has zero a11y violations', async () => {
      const { container } = render(<Avatar name="Jane Doe" src="/user.jpg" />);

      await expectAccessible(container);
      expect(container).toBeInTheDocument();
    });

    it('avatar with icon fallback has zero a11y violations', async () => {
      const { container } = render(
        <Avatar aria-label="Unknown user">
          <AvatarFallback>
            <AvatarIcon>
              <span>icon</span>
            </AvatarIcon>
          </AvatarFallback>
        </Avatar>,
      );

      await expectAccessible(container);
      expect(container).toBeInTheDocument();
    });

    it('avatar group has zero a11y violations', async () => {
      const { container } = render(
        <AvatarGroup label="Team members" max={3}>
          <Avatar name="Alice" />
          <Avatar name="Bob" />
          <Avatar name="Carol" />
          <Avatar name="Dave" />
        </AvatarGroup>,
      );

      await expectAccessible(container);
      expect(container).toBeInTheDocument();
    });

    it('disabled avatar has zero a11y violations', async () => {
      const { container } = render(<Avatar isDisabled name="Jane Doe" />);

      await expectAccessible(container);
      expect(container).toBeInTheDocument();
    });
  });
});

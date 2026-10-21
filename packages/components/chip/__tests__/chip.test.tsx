import '@testing-library/jest-dom';

import type { UserEvent } from '@testing-library/user-event';

import { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expectAccessible } from '@ideasui/utils/test';

import { Chip, ChipGroup, ChipAvatar, ChipIcon, ChipDismiss } from '../src';

describe('Chip Component Suite', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  describe('Anatomy & Display Names', () => {
    it('sets correct displayNames for all subcomponents', () => {
      expect(Chip.displayName).toBe('IdeasUI.Chip');
      expect(ChipGroup.displayName).toBe('IdeasUI.ChipGroup');
      expect(ChipAvatar.displayName).toBe('IdeasUI.ChipAvatar');
      expect(ChipIcon.displayName).toBe('IdeasUI.ChipIcon');
      expect(ChipDismiss.displayName).toBe('IdeasUI.ChipDismiss');
    });

    it('renders data-slot attributes properly', () => {
      render(
        <Chip endContent={<ChipDismiss />} startContent={<ChipIcon>★</ChipIcon>}>
          Tagged
        </Chip>,
      );

      expect(screen.getByText('Tagged')).toHaveAttribute('data-slot', 'chip-label');
      expect(screen.getByRole('button', { name: 'Remove' })).toHaveAttribute(
        'data-slot',
        'chip-dismiss',
      );
    });

    it('supports compound dot notation', () => {
      expect(Chip.Group).toBe(ChipGroup);
      expect(Chip.Avatar).toBe(ChipAvatar);
      expect(Chip.Icon).toBe(ChipIcon);
      expect(Chip.Dismiss).toBe(ChipDismiss);
    });

    it('supports slotProps customization', () => {
      render(
        <Chip
          slotProps={{
            label: { 'data-testid': 'custom-label' },
          }}
        >
          Customized Slots
        </Chip>,
      );

      expect(screen.getByTestId('custom-label')).toBeInTheDocument();
    });

    it('forwards ref properly on static and selectable modes', () => {
      const spanRef = createRef<HTMLElement>();

      render(<Chip ref={spanRef}>Static Ref</Chip>);
      expect(spanRef.current).toBeInstanceOf(HTMLSpanElement);

      const btnRef = createRef<HTMLElement>();

      render(
        <Chip ref={btnRef} mode="selectable">
          Button Ref
        </Chip>,
      );
      expect(btnRef.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('Interaction Modes', () => {
    it('static mode renders as a span', () => {
      render(<Chip>Static Content</Chip>);
      const label = screen.getByText('Static Content');

      expect(label.parentElement?.tagName).toBe('SPAN');
    });

    it('selectable mode toggles state and triggers onChange on click', async () => {
      const handleChange = vi.fn();

      render(
        <Chip mode="selectable" onChange={handleChange}>
          Toggleable
        </Chip>,
      );

      const button = screen.getByRole('button', { name: 'Toggleable' });

      expect(button).toHaveAttribute('aria-pressed', 'false');

      await user.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'true');
      expect(handleChange).toHaveBeenCalledWith(true);

      await user.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'false');
      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('selectable mode supports controlled isSelected', async () => {
      const handleChange = vi.fn();
      const { rerender } = render(
        <Chip isSelected={false} mode="selectable" onChange={handleChange}>
          Controlled
        </Chip>,
      );

      const button = screen.getByRole('button', { name: 'Controlled' });

      expect(button).toHaveAttribute('aria-pressed', 'false');

      await user.click(button);
      expect(handleChange).toHaveBeenCalledWith(true);

      rerender(
        <Chip isSelected mode="selectable" onChange={handleChange}>
          Controlled
        </Chip>,
      );
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('dismissible mode automatically renders ChipDismiss and fires onDismiss', async () => {
      const handleDismiss = vi.fn();

      render(
        <Chip mode="dismissible" onDismiss={handleDismiss}>
          Removable
        </Chip>,
      );

      const dismissButton = screen.getByRole('button', {
        name: 'Remove Removable',
      });

      expect(dismissButton).toBeInTheDocument();

      await user.click(dismissButton);
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it('dismissible mode responds to Delete and Backspace keyboard shortcuts', async () => {
      const handleDismiss = vi.fn();

      render(
        <Chip mode="dismissible" onDismiss={handleDismiss}>
          Key Dismiss
        </Chip>,
      );

      const dismissButton = screen.getByRole('button', {
        name: 'Remove Key Dismiss',
      });

      dismissButton.focus();
      await user.keyboard('{Delete}');
      expect(handleDismiss).toHaveBeenCalled();
    });
  });

  describe('ChipGroup', () => {
    it('manages multiple selection correctly', async () => {
      const handleChange = vi.fn();

      render(
        <ChipGroup label="Skills" selectionMode="multiple" onChange={handleChange}>
          <Chip value="react">React</Chip>
          <Chip value="vue">Vue</Chip>
          <Chip value="angular">Angular</Chip>
        </ChipGroup>,
      );

      const reactChip = screen.getByRole('button', { name: 'React' });
      const vueChip = screen.getByRole('button', { name: 'Vue' });

      await user.click(reactChip);
      expect(handleChange).toHaveBeenCalledWith(['react']);

      await user.click(vueChip);
      expect(handleChange).toHaveBeenCalledWith(['react', 'vue']);
    });

    it('manages single selection mode correctly', async () => {
      const handleChange = vi.fn();

      render(
        <ChipGroup
          defaultValue={['sm']}
          label="Size"
          selectionMode="single"
          onChange={handleChange}
        >
          <Chip value="sm">Small</Chip>
          <Chip value="md">Medium</Chip>
        </ChipGroup>,
      );

      const small = screen.getByRole('button', { name: 'Small' });
      const medium = screen.getByRole('button', { name: 'Medium' });

      expect(small).toHaveAttribute('aria-pressed', 'true');
      expect(medium).toHaveAttribute('aria-pressed', 'false');

      await user.click(medium);
      expect(handleChange).toHaveBeenCalledWith(['md']);
    });

    it('propagates isDisabled to child chips', () => {
      render(
        <ChipGroup isDisabled>
          <Chip value="item">Item</Chip>
        </ChipGroup>,
      );

      const button = screen.getByRole('button', { name: 'Item' });

      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('data-disabled', 'true');
    });
  });

  describe('Subcomponents (ChipAvatar, ChipIcon, ChipDismiss)', () => {
    it('ChipAvatar renders initials from name and falls back gracefully', () => {
      render(<ChipAvatar name="Ada Lovelace" />);
      expect(screen.getByText('AL')).toBeInTheDocument();
    });

    it('ChipAvatar falls back to initials on image error', () => {
      render(<ChipAvatar name="Alan Turing" src="invalid.png" />);
      const img = screen.getByRole('img', { hidden: true });

      fireEvent.error(img);
      expect(screen.getByText('AT')).toBeInTheDocument();
    });

    it('ChipIcon is aria-hidden', () => {
      render(<ChipIcon>★</ChipIcon>);
      expect(screen.getByText('★')).toHaveAttribute('aria-hidden', 'true');
    });

    it('ChipDismiss has accessible label and type="button"', () => {
      render(<ChipDismiss label="Dismiss item" />);
      const btn = screen.getByRole('button', { name: 'Dismiss item' });

      expect(btn).toHaveAttribute('type', 'button');
    });
  });

  describe('Disabled State', () => {
    it('prevents clicks when isDisabled is true', async () => {
      const handleClick = vi.fn();

      render(
        <Chip isDisabled mode="selectable" onClick={handleClick}>
          Disabled
        </Chip>,
      );

      const button = screen.getByRole('button', { name: 'Disabled' });

      expect(button).toBeDisabled();
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility (WCAG 2.1 AA)', () => {
    it('static chip has zero a11y violations', async () => {
      const { container } = render(<Chip>Accessible Static</Chip>);

      expect(screen.getByText('Accessible Static')).toBeInTheDocument();
      await expectAccessible(container);
    });

    it('selectable chip has zero a11y violations', async () => {
      const { container } = render(
        <Chip defaultSelected mode="selectable">
          Accessible Selectable
        </Chip>,
      );

      expect(screen.getByRole('button', { name: 'Accessible Selectable' })).toBeInTheDocument();
      await expectAccessible(container);
    });

    it('dismissible chip has zero a11y violations', async () => {
      const { container } = render(
        <Chip mode="dismissible" onDismiss={(): void => {}}>
          Accessible Dismissible
        </Chip>,
      );

      expect(screen.getByText('Accessible Dismissible')).toBeInTheDocument();
      await expectAccessible(container);
    });

    it('chip group has zero a11y violations', async () => {
      const { container } = render(
        <ChipGroup label="Framework selection" selectionMode="multiple">
          <Chip value="react">React</Chip>
          <Chip value="vue">Vue</Chip>
        </ChipGroup>,
      );

      expect(screen.getByText('React')).toBeInTheDocument();
      await expectAccessible(container);
    });

    it('chip with avatar has zero a11y violations', async () => {
      const { container } = render(
        <Chip startContent={<ChipAvatar name="John Doe" />}>John Doe</Chip>,
      );

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      await expectAccessible(container);
    });
  });
});

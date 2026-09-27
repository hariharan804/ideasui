import '@testing-library/jest-dom';

import type { UserEvent } from '@testing-library/user-event';

import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expectAccessible } from '@ideasui/utils/test';

import {
  Switch,
  SwitchGroup,
  SwitchGroupDescription,
  SwitchGroupError,
  SwitchGroupLabel,
  useRequiredSwitchGroupContext,
} from '../src';

const ComponentOutsideGroup = (): null => {
  useRequiredSwitchGroupContext();

  return null;
};

describe('Switch Component', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('should render correctly with visible label', () => {
    const { container } = render(<Switch>Enable dark mode</Switch>);

    expect(screen.getByText('Enable dark mode')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('[data-slot="switch"]')).toBeInTheDocument();
  });

  it('should set correct displayName on all sub-components', () => {
    expect(Switch.displayName).toBe('IdeasUI.Switch');
    expect(SwitchGroup.displayName).toBe('IdeasUI.SwitchGroup');
    expect(SwitchGroupLabel.displayName).toBe('IdeasUI.SwitchGroupLabel');
    expect(SwitchGroupDescription.displayName).toBe('IdeasUI.SwitchGroupDescription');
    expect(SwitchGroupError.displayName).toBe('IdeasUI.SwitchGroupError');
  });

  it('should forward ref to native input element', () => {
    const reference = createRef<HTMLInputElement>();

    render(<Switch ref={reference}>Ref test</Switch>);
    expect(reference.current).toBeInstanceOf(HTMLInputElement);
    expect(reference.current?.type).toBe('checkbox');
  });

  it('should handle uncontrolled selection with defaultSelected', async () => {
    render(<Switch defaultSelected>Uncontrolled toggle</Switch>);
    const input = screen.getByRole('switch') as HTMLInputElement;

    expect(input.checked).toBe(true);

    await user.click(input);
    expect(input.checked).toBe(false);
  });

  it('should handle controlled state with isSelected and onChange', async () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <Switch isSelected={false} onChange={handleChange}>
        Controlled toggle
      </Switch>,
    );

    const input = screen.getByRole('switch') as HTMLInputElement;

    expect(input.checked).toBe(false);

    await user.click(input);
    expect(handleChange).toHaveBeenCalledWith(true);

    rerender(
      <Switch isSelected={true} onChange={handleChange}>
        Controlled toggle
      </Switch>,
    );
    expect(input.checked).toBe(true);
  });

  it('should support labelPlacement start and end', () => {
    const { container: endContainer } = render(<Switch labelPlacement="end">Label End</Switch>);

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(endContainer.querySelector('[data-slot="switch"]')).toHaveClass('flex-row');

    const { container: startContainer } = render(
      <Switch labelPlacement="start">Label Start</Switch>,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(startContainer.querySelector('[data-slot="switch"]')).toHaveClass('flex-row-reverse');
  });

  it('should render onLabel when checked and offLabel when unchecked', () => {
    const { rerender } = render(
      <Switch defaultSelected offLabel="OFF" onLabel="ON">
        Feature flag
      </Switch>,
    );

    expect(screen.getByText('ON')).toBeInTheDocument();
    expect(screen.getByText('ON')).toHaveAttribute('data-slot', 'switch-on-label');

    rerender(
      <Switch isSelected={false} offLabel="OFF" onLabel="ON">
        Feature flag
      </Switch>,
    );

    expect(screen.getByText('OFF')).toBeInTheDocument();
    expect(screen.getByText('OFF')).toHaveAttribute('data-slot', 'switch-off-label');
  });

  it('should handle disabled state', () => {
    render(<Switch isDisabled>Disabled switch</Switch>);
    const input = screen.getByRole('switch') as HTMLInputElement;

    expect(input.disabled).toBe(true);
  });

  it('should handle read-only state', async () => {
    const handleChange = vi.fn();

    render(
      <Switch isReadOnly onChange={handleChange}>
        Read-only switch
      </Switch>,
    );
    const input = screen.getByRole('switch') as HTMLInputElement;

    expect(input.readOnly).toBe(true);

    await user.click(input);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should render custom thumbIcon, checkedThumbIcon, and uncheckedThumbIcon', () => {
    const { rerender } = render(
      <Switch
        defaultSelected
        checkedThumbIcon={<span data-testid="custom-checked">✓</span>}
        uncheckedThumbIcon={<span data-testid="custom-unchecked">✗</span>}
      >
        Custom icons
      </Switch>,
    );

    expect(screen.getByTestId('custom-checked')).toBeInTheDocument();
    expect(screen.queryByTestId('custom-unchecked')).not.toBeInTheDocument();

    rerender(
      <Switch
        checkedThumbIcon={<span data-testid="custom-checked">✓</span>}
        isSelected={false}
        uncheckedThumbIcon={<span data-testid="custom-unchecked">✗</span>}
      >
        Custom icons
      </Switch>,
    );

    expect(screen.queryByTestId('custom-checked')).not.toBeInTheDocument();
    expect(screen.getByTestId('custom-unchecked')).toBeInTheDocument();

    rerender(
      <Switch
        defaultSelected
        thumbIcon={({ isSelected }) => (
          <span data-testid="fn-icon">{isSelected ? 'ON' : 'OFF'}</span>
        )}
      >
        Function thumbIcon
      </Switch>,
    );

    expect(screen.getByTestId('fn-icon')).toHaveTextContent('ON');
  });

  it('should support wide pill, square, and rectangle thumb shapes with concentric track radii', () => {
    const { container: pillContainer } = render(
      <Switch defaultSelected thumbShape="pill">
        Wide Pill Switch
      </Switch>,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(pillContainer.querySelector('[data-slot="switch-track"]')).toHaveClass('rounded-full');
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(pillContainer.querySelector('[data-slot="switch-thumb"]')).toHaveClass(
      'w-7',
      'h-5',
      'rounded-full',
    );

    const { container: rectContainer } = render(
      <Switch defaultSelected thumbShape="rectangle">
        Wide Rectangle Switch
      </Switch>,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(rectContainer.querySelector('[data-slot="switch-track"]')).toHaveClass('rounded-md');
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(rectContainer.querySelector('[data-slot="switch-thumb"]')).toHaveClass(
      'w-7',
      'h-5',
      'rounded-sm',
    );

    const { container: squareContainer } = render(
      <Switch defaultSelected thumbShape="square">
        Square Switch
      </Switch>,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(squareContainer.querySelector('[data-slot="switch-track"]')).toHaveClass('rounded-md');
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(squareContainer.querySelector('[data-slot="switch-thumb"]')).toHaveClass('rounded-sm');
  });

  it('should correctly align thumb inside outline variant track border', () => {
    const { container } = render(
      <Switch defaultSelected variant="outline">
        Outline Switch
      </Switch>,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const thumb = container.querySelector('[data-slot="switch-thumb"]');

    expect(thumb).toHaveClass('w-4', 'h-4', 'top-0.5', 'left-0.5');
  });

  it('should apply correct thumbVariant classes on selected and unselected switches', () => {
    const { container: darkContainer } = render(
      <Switch defaultSelected thumbVariant="dark">
        Dark Thumb
      </Switch>,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(darkContainer.querySelector('[data-slot="switch-thumb"]')).toHaveClass(
      'bg-content-primary',
      'text-content-inverse',
    );

    const { container: flatContainer } = render(
      <Switch defaultSelected thumbVariant="flat">
        Flat Thumb
      </Switch>,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(flatContainer.querySelector('[data-slot="switch-thumb"]')).toHaveClass('shadow-none');

    const { container: gradientContainer } = render(
      <Switch defaultSelected thumbVariant="gradient">
        Gradient Thumb
      </Switch>,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(gradientContainer.querySelector('[data-slot="switch-thumb"]')).toHaveClass(
      'bg-gradient-to-br',
      'from-surface',
      'to-surface-muted',
    );

    const { container: borderedContainer } = render(
      <Switch defaultSelected thumbVariant="bordered">
        Bordered Thumb
      </Switch>,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(borderedContainer.querySelector('[data-slot="switch-thumb"]')).toHaveClass(
      'border-2',
      'shadow-2xs',
    );
  });

  describe('SwitchGroup', () => {
    it('should propagate size, variant, color, and selection state to children', async () => {
      render(
        <SwitchGroup color="success" defaultValue={['email']} size="lg" variant="outline">
          <SwitchGroupLabel>Notifications</SwitchGroupLabel>
          <Switch value="email">Email</Switch>
          <Switch value="sms">SMS</Switch>
        </SwitchGroup>,
      );

      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const smsInput = screen.getByLabelText('SMS') as HTMLInputElement;

      expect(emailInput.checked).toBe(true);
      expect(smsInput.checked).toBe(false);

      await user.click(smsInput);
      expect(smsInput.checked).toBe(true);
    });

    it('should render description when valid and error message when invalid', () => {
      const { rerender } = render(
        <SwitchGroup isInvalid={false}>
          <SwitchGroupLabel>Settings</SwitchGroupLabel>
          <Switch value="a">Option A</Switch>
          <SwitchGroupDescription>Helper text</SwitchGroupDescription>
          <SwitchGroupError>Error text</SwitchGroupError>
        </SwitchGroup>,
      );

      expect(screen.getByText('Helper text')).toBeInTheDocument();
      expect(screen.queryByText('Error text')).not.toBeInTheDocument();

      rerender(
        <SwitchGroup isInvalid={true}>
          <SwitchGroupLabel>Settings</SwitchGroupLabel>
          <Switch value="a">Option A</Switch>
          <SwitchGroupDescription>Helper text</SwitchGroupDescription>
          <SwitchGroupError>Error text</SwitchGroupError>
        </SwitchGroup>,
      );

      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
      expect(screen.getByText('Error text')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveTextContent('Error text');
    });

    it('should throw error when useRequiredSwitchGroupContext is used outside group', () => {
      expect(() => render(<ComponentOutsideGroup />)).toThrow(
        'useRequiredSwitchGroupContext must be used within a <SwitchGroup> component.',
      );
    });
  });

  describe('Accessibility (vitest-axe)', () => {
    it('standalone switch has zero a11y violations', async () => {
      const { container } = render(<Switch defaultSelected>Dark mode</Switch>);

      expect(container).toBeInTheDocument();
      await expectAccessible(container);
    });

    it('switch group has zero a11y violations', async () => {
      const { container } = render(
        <SwitchGroup>
          <SwitchGroupLabel>Notifications</SwitchGroupLabel>
          <Switch value="email">Email</Switch>
          <Switch value="sms">SMS</Switch>
          <SwitchGroupDescription>Enable at least one channel.</SwitchGroupDescription>
        </SwitchGroup>,
      );

      expect(container).toBeInTheDocument();
      await expectAccessible(container);
    });

    it('invalid switch group has zero a11y violations', async () => {
      const { container } = render(
        <SwitchGroup isInvalid>
          <SwitchGroupLabel>Required toggles</SwitchGroupLabel>
          <Switch value="terms">Accept terms</Switch>
          <SwitchGroupError>You must accept the terms.</SwitchGroupError>
        </SwitchGroup>,
      );

      expect(container).toBeInTheDocument();
      await expectAccessible(container);
    });

    it('disabled switch has zero a11y violations', async () => {
      const { container } = render(<Switch isDisabled>Locked setting</Switch>);

      expect(container).toBeInTheDocument();
      await expectAccessible(container);
    });
  });
});

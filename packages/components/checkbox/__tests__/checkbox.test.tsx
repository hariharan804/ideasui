import '@testing-library/jest-dom';

import type { UserEvent } from '@testing-library/user-event';

import { vi } from 'vitest';
import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expectAccessible } from '@ideasui/utils/test';

import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupLabel,
  CheckboxGroupDescription,
  CheckboxGroupError,
} from '../src';

describe('Checkbox', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('should render correctly', () => {
    const wrapper = render(<Checkbox>Accept terms</Checkbox>);

    expect(screen.getByText('Accept terms')).toBeInTheDocument();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should set correct displayName on all sub-components', () => {
    expect(Checkbox.displayName).toBe('IdeasUI.Checkbox');
    expect(CheckboxGroup.displayName).toBe('IdeasUI.CheckboxGroup');
    expect(CheckboxGroupLabel.displayName).toBe('IdeasUI.CheckboxGroupLabel');
    expect(CheckboxGroupDescription.displayName).toBe('IdeasUI.CheckboxGroupDescription');
    expect(CheckboxGroupError.displayName).toBe('IdeasUI.CheckboxGroupError');
  });

  it('should forward ref to native HTMLInputElement', () => {
    const ref = createRef<HTMLInputElement>();

    render(<Checkbox ref={ref}>Ref test</Checkbox>);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe('checkbox');
  });

  it('should support callback refs on native HTMLInputElement', () => {
    let element: HTMLInputElement | null = null;
    const refCallback = (node: HTMLInputElement | null): void => {
      element = node;
    };

    render(
      <Checkbox ref={refCallback} isIndeterminate>
        Callback ref test
      </Checkbox>,
    );

    const inputEl = element as HTMLInputElement | null;

    expect(inputEl).toBeInstanceOf(HTMLInputElement);
    expect(inputEl?.indeterminate).toBe(true);
  });

  it('should support defaultSelected (uncontrolled)', () => {
    render(<Checkbox defaultSelected>Uncontrolled</Checkbox>);
    const input = screen.getByRole('checkbox');

    expect(input).toBeChecked();
  });

  it('should toggle state automatically when clicked in uncontrolled mode', async () => {
    const onChange = vi.fn();

    render(<Checkbox onChange={onChange}>Uncontrolled Click</Checkbox>);
    const input = screen.getByRole('checkbox');

    expect(input).not.toBeChecked();

    await user.click(input);

    expect(input).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true);

    await user.click(input);

    expect(input).not.toBeChecked();
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('should support controlled isSelected & onChange', async () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Checkbox isSelected={false} onChange={onChange}>
        Controlled
      </Checkbox>,
    );

    const input = screen.getByRole('checkbox');

    expect(input).not.toBeChecked();

    await user.click(input);
    expect(onChange).toHaveBeenCalledWith(true);

    rerender(
      <Checkbox isSelected={true} onChange={onChange}>
        Controlled
      </Checkbox>,
    );
    expect(input).toBeChecked();
  });

  it('should handle indeterminate state correctly', () => {
    const ref = createRef<HTMLInputElement>();

    render(
      <Checkbox ref={ref} isIndeterminate isSelected>
        Indeterminate
      </Checkbox>,
    );

    const input = screen.getByRole('checkbox');

    expect(input).toHaveAttribute('aria-checked', 'mixed');
    expect(ref.current?.indeterminate).toBe(true);
  });

  it('should handle disabled state', async () => {
    const onChange = vi.fn();

    render(
      <Checkbox isDisabled onChange={onChange}>
        Disabled
      </Checkbox>,
    );

    const input = screen.getByRole('checkbox');

    expect(input).toBeDisabled();

    await user.click(input);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should handle readOnly state', async () => {
    const onChange = vi.fn();

    render(
      <Checkbox defaultSelected isReadOnly onChange={onChange}>
        Read only
      </Checkbox>,
    );

    const input = screen.getByRole('checkbox');

    expect(input).toHaveAttribute('readonly');

    await user.click(input);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should render custom checkedIcon when checked', () => {
    render(
      <Checkbox defaultSelected checkedIcon={<span data-testid="custom-check-icon">✓</span>}>
        Custom checked icon
      </Checkbox>,
    );

    expect(screen.getByTestId('custom-check-icon')).toBeInTheDocument();
  });

  it('should render custom uncheckedIcon when unchecked', () => {
    render(
      <Checkbox uncheckedIcon={<span data-testid="custom-uncheck-icon">✗</span>}>
        Custom unchecked icon
      </Checkbox>,
    );

    expect(screen.getByTestId('custom-uncheck-icon')).toBeInTheDocument();
  });

  it('should render custom indeterminateIcon when isIndeterminate', () => {
    render(
      <Checkbox
        isIndeterminate
        indeterminateIcon={<span data-testid="custom-indeterminate-icon">-</span>}
      >
        Custom indeterminate icon
      </Checkbox>,
    );

    expect(screen.getByTestId('custom-indeterminate-icon')).toBeInTheDocument();
  });

  it('should support render function for checkedIcon and uncheckedIcon', () => {
    render(
      <Checkbox
        defaultSelected
        checkedIcon={({ className }) => (
          <span className={className} data-testid="fn-check-icon">
            FnCheck
          </span>
        )}
      >
        Render function icon
      </Checkbox>,
    );

    expect(screen.getByTestId('fn-check-icon')).toBeInTheDocument();
  });

  it('should pass accessibility audit for checkbox with custom icons', async () => {
    const { container } = render(
      <Checkbox defaultSelected checkedIcon={<span>✓</span>} uncheckedIcon={<span>✗</span>}>
        Custom icon terms
      </Checkbox>,
    );

    expect(container).toBeInTheDocument();
    await expectAccessible(container);
  });
});

describe('CheckboxGroup', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('should render group with label and options', () => {
    render(
      <CheckboxGroup defaultValue={['a']}>
        <CheckboxGroupLabel>Notifications</CheckboxGroupLabel>
        <Checkbox value="a">Email</Checkbox>
        <Checkbox value="b">SMS</Checkbox>
        <CheckboxGroupDescription>Select options.</CheckboxGroupDescription>
      </CheckboxGroup>,
    );

    const group = screen.getByRole('group');
    const label = screen.getByText('Notifications');

    expect(label).toBeInTheDocument();
    expect(group).toBeInTheDocument();
    expect(group).toHaveAttribute('aria-labelledby', label.id);

    const checkboxes = screen.getAllByRole('checkbox');

    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
  });

  it('should handle group state changes', async () => {
    const onChange = vi.fn();

    render(
      <CheckboxGroup defaultValue={['email']} onChange={onChange}>
        <CheckboxGroupLabel>Preferences</CheckboxGroupLabel>
        <Checkbox value="email">Email</Checkbox>
        <Checkbox value="sms">SMS</Checkbox>
      </CheckboxGroup>,
    );

    const smsInput = screen.getByRole('checkbox', { name: 'SMS' });

    await user.click(smsInput);

    expect(onChange).toHaveBeenCalledWith(['email', 'sms']);
  });

  it('should render error message and hide description when group isInvalid', () => {
    render(
      <CheckboxGroup isInvalid>
        <CheckboxGroupLabel>Permissions</CheckboxGroupLabel>
        <Checkbox value="read">Read</Checkbox>
        <CheckboxGroupDescription>Choose permissions.</CheckboxGroupDescription>
        <CheckboxGroupError>At least one permission required.</CheckboxGroupError>
      </CheckboxGroup>,
    );

    expect(screen.queryByText('Choose permissions.')).not.toBeInTheDocument();
    expect(screen.getByText('At least one permission required.')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should render required asterisk when isRequired is true', () => {
    render(
      <CheckboxGroup isRequired>
        <CheckboxGroupLabel>Terms</CheckboxGroupLabel>
        <Checkbox value="agree">I agree</Checkbox>
      </CheckboxGroup>,
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('should throw error when CheckboxGroupLabel is rendered outside CheckboxGroup', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<CheckboxGroupLabel>Standalone Label</CheckboxGroupLabel>)).toThrow(
      'useRequiredCheckboxGroupContext must be used within a <CheckboxGroup> component.',
    );

    spy.mockRestore();
  });

  it('should pass accessibility audit for valid group', async () => {
    const { container } = render(
      <CheckboxGroup>
        <CheckboxGroupLabel>Preferences</CheckboxGroupLabel>
        <Checkbox value="opt1">Option 1</Checkbox>
        <Checkbox value="opt2">Option 2</Checkbox>
        <CheckboxGroupDescription>Select options.</CheckboxGroupDescription>
      </CheckboxGroup>,
    );

    expect(container).toBeInTheDocument();
    await expectAccessible(container);
  });

  it('should pass accessibility audit for invalid group', async () => {
    const { container } = render(
      <CheckboxGroup isInvalid>
        <CheckboxGroupLabel>Preferences</CheckboxGroupLabel>
        <Checkbox value="opt1">Option 1</Checkbox>
        <CheckboxGroupError>Select at least one option.</CheckboxGroupError>
      </CheckboxGroup>,
    );

    expect(container).toBeInTheDocument();
    await expectAccessible(container);
  });
});

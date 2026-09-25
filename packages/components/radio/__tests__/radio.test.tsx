import '@testing-library/jest-dom';

import { createRef } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { radio } from '@ideasui/theme/recipes';
import { expectAccessible } from '@ideasui/utils/test';

import { Radio, RadioGroup, RadioGroupDescription, RadioGroupError, RadioGroupLabel } from '../src';

describe('Radio', () => {
  it('should render correctly', () => {
    const wrapper = render(<Radio>Option A</Radio>);

    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should set correct displayName', () => {
    expect(Radio.displayName).toBe('IdeasUI.Radio');
    expect(RadioGroup.displayName).toBe('IdeasUI.RadioGroup');
  });

  it('should forward ref correctly to native input', () => {
    const ref = createRef<HTMLInputElement>();

    render(<Radio ref={ref}>Ref test</Radio>);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('should forward ref correctly to RadioGroup fieldset', () => {
    const ref = createRef<HTMLFieldSetElement>();

    render(
      <RadioGroup ref={ref}>
        <RadioGroupLabel>Group</RadioGroupLabel>
        <Radio value="a">A</Radio>
      </RadioGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLFieldSetElement);
  });

  it('should handle standalone selection check and uncheck on press', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Radio onChange={handleChange}>Toggle radio</Radio>);

    const input = screen.getByRole('radio');

    expect(input).not.toBeChecked();

    // First press -> check (true)
    await user.click(input);
    expect(handleChange).toHaveBeenNthCalledWith(1, true);
    expect(input).toBeChecked();

    // Second press -> uncheck (false)
    await user.click(input);
    expect(handleChange).toHaveBeenNthCalledWith(2, false);
    expect(input).not.toBeChecked();
  });

  it('should support isToggleable={false} for strict standalone radio', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Radio isToggleable={false} onChange={handleChange}>
        Strict radio
      </Radio>,
    );

    const input = screen.getByRole('radio');

    await user.click(input);
    expect(handleChange).toHaveBeenCalledWith(true);
    expect(input).toBeChecked();

    // Second press -> stays checked because isToggleable=false
    await user.click(input);
    expect(input).toBeChecked();
  });

  it('should handle RadioGroup selection change', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <RadioGroup defaultValue="b" onChange={handleChange}>
        <RadioGroupLabel>Options</RadioGroupLabel>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
      </RadioGroup>,
    );

    const radioA = screen.getByLabelText('Option A');
    const radioB = screen.getByLabelText('Option B');

    expect(radioB).toBeChecked();
    expect(radioA).not.toBeChecked();

    await user.click(radioA);
    expect(handleChange).toHaveBeenCalledWith('a');
  });

  it('should support disabled state', () => {
    render(
      <RadioGroup isDisabled defaultValue="a">
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
      </RadioGroup>,
    );

    const radioA = screen.getByLabelText('Option A');

    expect(radioA).toBeDisabled();
  });

  it('should render description when valid and error when invalid', () => {
    const { rerender } = render(
      <RadioGroup isInvalid={false}>
        <RadioGroupLabel>Framework</RadioGroupLabel>
        <Radio value="react">React</Radio>
        <RadioGroupDescription>Select your framework</RadioGroupDescription>
        <RadioGroupError>Selection required</RadioGroupError>
      </RadioGroup>,
    );

    expect(screen.getByText('Select your framework')).toBeInTheDocument();
    expect(screen.queryByText('Selection required')).not.toBeInTheDocument();

    rerender(
      <RadioGroup isInvalid>
        <RadioGroupLabel>Framework</RadioGroupLabel>
        <Radio value="react">React</Radio>
        <RadioGroupDescription>Select your framework</RadioGroupDescription>
        <RadioGroupError>Selection required</RadioGroupError>
      </RadioGroup>,
    );

    expect(screen.queryByText('Select your framework')).not.toBeInTheDocument();
    expect(screen.getByText('Selection required')).toBeInTheDocument();
  });

  it('should pass accessibility audit with zero violations', async () => {
    const { container } = render(
      <RadioGroup defaultValue="email">
        <RadioGroupLabel>Notification preferences</RadioGroupLabel>
        <Radio value="email">Email</Radio>
        <Radio value="sms">SMS</Radio>
        <RadioGroupDescription>Choose your preferred channel.</RadioGroupDescription>
      </RadioGroup>,
    );

    await expectAccessible(container);
  });

  it('should apply hover classes on radio indicator recipe', () => {
    const styles = radio({ variant: 'solid' });

    expect(styles.indicator()).toContain('group-hover/radio:scale-105');
    expect(styles.indicator()).toContain('group-hover/radio:border-border-focus');
  });

  it('should support all visual variants', () => {
    const variants = ['solid', 'outline', 'subtle', 'ghost', 'soft'] as const;

    for (const v of variants) {
      const styles = radio({ variant: v });

      expect(styles.indicator()).toBeDefined();
    }
  });
});

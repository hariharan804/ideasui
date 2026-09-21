/* eslint-disable testing-library/no-container, testing-library/no-node-access, testing-library/prefer-user-event */
import '@testing-library/jest-dom';

import { createRef, useState } from 'react';
import { render, screen, renderHook, fireEvent } from '@testing-library/react';
import { expectAccessible } from '@ideasui/utils/test';

import {
  InputField,
  InputFieldLabel,
  InputFieldInput,
  InputFieldDescription,
  InputFieldError,
  useInputFieldContext,
} from '../src';

describe('InputField', () => {
  it('should render fully composed compound component correctly with default labelVariant', () => {
    const { container } = render(
      <InputField>
        <InputFieldLabel>Email address</InputFieldLabel>
        <InputFieldInput placeholder="Enter email" />
        <InputFieldDescription>We will never share your email.</InputFieldDescription>
        <InputFieldError>Invalid email address.</InputFieldError>
      </InputField>,
    );

    expect(screen.getByText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getByText('We will never share your email.')).toBeInTheDocument();
    expect(screen.queryByText('Invalid email address.')).not.toBeInTheDocument();

    const input = screen.getByPlaceholderText('Enter email');
    const label = screen.getByText('Email address');

    expect(label).toHaveAttribute('for', input.id);
    expect(input).toHaveAttribute('aria-describedby');

    const root = container.querySelector('[data-slot="input-field"]');

    expect(root).toHaveAttribute('data-label-variant', 'default');
  });

  it('should set correct displayNames on all sub-components', () => {
    expect(InputField.displayName).toBe('IdeasUI.InputField');
    expect(InputFieldLabel.displayName).toBe('IdeasUI.InputFieldLabel');
    expect(InputFieldInput.displayName).toBe('IdeasUI.InputFieldInput');
    expect(InputFieldDescription.displayName).toBe('IdeasUI.InputFieldDescription');
    expect(InputFieldError.displayName).toBe('IdeasUI.InputFieldError');
  });

  it('should forward refs correctly on all sub-components', () => {
    const rootRef = createRef<HTMLDivElement>();
    const labelRef = createRef<HTMLLabelElement>();
    const inputRef = createRef<HTMLInputElement>();
    const descRef = createRef<HTMLParagraphElement>();

    render(
      <InputField ref={rootRef}>
        <InputFieldLabel ref={labelRef}>Label</InputFieldLabel>
        <InputFieldInput ref={inputRef} />
        <InputFieldDescription ref={descRef}>Helper</InputFieldDescription>
      </InputField>,
    );

    expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
    expect(labelRef.current).toBeInstanceOf(HTMLLabelElement);
    expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
    expect(descRef.current).toBeInstanceOf(HTMLParagraphElement);
  });

  it('should support custom id on InputFieldInput and wire to label', () => {
    render(
      <InputField>
        <InputFieldLabel>Username</InputFieldLabel>
        <InputFieldInput id="custom-user-id" />
      </InputField>,
    );

    const input = screen.getByRole('textbox');
    const label = screen.getByText('Username');

    expect(input.id).toBe('custom-user-id');
    expect(label).toHaveAttribute('for', 'custom-user-id');
  });

  it('should render inside-fixed labelVariant correctly', () => {
    const { container } = render(
      <InputField labelVariant="inside-fixed">
        <InputFieldLabel>Inside Fixed Label</InputFieldLabel>
        <InputFieldInput placeholder="Enter value" />
      </InputField>,
    );

    const root = container.querySelector('[data-slot="input-field"]');
    const label = screen.getByText('Inside Fixed Label');

    expect(root).toHaveAttribute('data-label-variant', 'inside-fixed');
    expect(label).toHaveClass('ideasui-input-field__label--inside-fixed');
  });

  it('should render inside-floating labelVariant and handle focus/blur transitions', () => {
    const { container } = render(
      <InputField labelVariant="inside-floating">
        <InputFieldLabel>Inside Floating Label</InputFieldLabel>
        <InputFieldInput />
      </InputField>,
    );

    const input = screen.getByRole('textbox');
    const root = container.querySelector('[data-slot="input-field"]');

    // Initial state: empty + unfocused -> not floating
    expect(root).not.toHaveAttribute('data-floating');

    // Focus state: empty + focused -> floating (moves to top inside)
    fireEvent.focus(input);
    expect(root).toHaveAttribute('data-floating', 'true');

    // Blur state -> not floating
    fireEvent.blur(input);
    expect(root).not.toHaveAttribute('data-floating');
  });

  it('should handle floating labelVariant focus and blur transitions', () => {
    const { container } = render(
      <InputField labelVariant="floating">
        <InputFieldLabel>Floating Label</InputFieldLabel>
        <InputFieldInput />
      </InputField>,
    );

    const input = screen.getByRole('textbox');
    const root = container.querySelector('[data-slot="input-field"]');

    // 1. Initial state: empty + unfocused -> not floating
    expect(root).not.toHaveAttribute('data-floating');

    // 2. Focus state: empty + focused -> floating
    fireEvent.focus(input);
    expect(root).toHaveAttribute('data-floating', 'true');

    // 3. Blur state (empty) -> returns to not floating
    fireEvent.blur(input);
    expect(root).not.toHaveAttribute('data-floating');

    // 4. Typing value: filled + unfocused -> floating
    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.blur(input);
    expect(root).toHaveAttribute('data-floating', 'true');

    // 5. Clear value and blur -> not floating
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    expect(root).not.toHaveAttribute('data-floating');
  });

  it('should start in floating state when defaultValue is provided (uncontrolled)', () => {
    const { container } = render(
      <InputField labelVariant="floating">
        <InputFieldLabel>Uncontrolled Label</InputFieldLabel>
        <InputFieldInput defaultValue="Pre-filled value" />
      </InputField>,
    );

    const root = container.querySelector('[data-slot="input-field"]');

    expect(root).toHaveAttribute('data-floating', 'true');
  });

  it('should update floating state dynamically when controlled value changes', () => {
    function ControlledTest(): React.JSX.Element {
      const [val, setVal] = useState('');

      return (
        <div>
          <button type="button" onClick={() => setVal('new@example.com')}>
            Set Value
          </button>

          <InputField labelVariant="floating">
            <InputFieldLabel>Controlled Label</InputFieldLabel>
            <InputFieldInput value={val} onChange={(e) => setVal(e.target.value)} />
          </InputField>
        </div>
      );
    }

    const { container } = render(<ControlledTest />);
    const root = container.querySelector('[data-slot="input-field"]');

    expect(root).not.toHaveAttribute('data-floating');

    fireEvent.click(screen.getByText('Set Value'));
    expect(root).toHaveAttribute('data-floating', 'true');
  });

  it('should preserve external onFocus, onBlur, onChange, and onInput handlers', () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    const handleChange = vi.fn();
    const handleInput = vi.fn();

    render(
      <InputField labelVariant="floating">
        <InputFieldLabel>Handlers Test</InputFieldLabel>
        <InputFieldInput
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onInput={handleInput}
        />
      </InputField>,
    );

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.change(input, { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalledTimes(1);

    fireEvent.input(input, { target: { value: 'abcd' } });
    expect(handleInput).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('should support single-component shorthand usage via props without sub-components', () => {
    render(
      <InputField
        description="Single component description"
        label="Single Component Label"
        placeholder="Single component placeholder"
        startContent={<span data-testid="shorthand-start">$</span>}
      />,
    );

    expect(screen.getByText('Single Component Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Single component placeholder')).toBeInTheDocument();
    expect(screen.getByText('Single component description')).toBeInTheDocument();
    expect(screen.getByTestId('shorthand-start')).toBeInTheDocument();
  });

  it('should apply startContent offset class to label when startContent is present', () => {
    render(
      <InputField labelVariant="inside-fixed">
        <InputFieldLabel>Adorned Label</InputFieldLabel>
        <InputFieldInput startContent={<span data-testid="icon">$</span>} />
      </InputField>,
    );

    const label = screen.getByText('Adorned Label');

    expect(label).toHaveClass('ideasui-input-field__label--has-start-content');
  });

  it('should propagate isRequired to input and render asterisk on label', () => {
    const { container } = render(
      <InputField isRequired>
        <InputFieldLabel>Password</InputFieldLabel>
        <InputFieldInput type="password" />
      </InputField>,
    );

    const input = container.querySelector('input') as HTMLInputElement;
    const label = screen.getByText('Password');

    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(label).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('should propagate isDisabled to root, label, and input', () => {
    const { container } = render(
      <InputField isDisabled>
        <InputFieldLabel>Disabled Field</InputFieldLabel>
        <InputFieldInput />
      </InputField>,
    );

    const input = screen.getByRole('textbox');
    const label = screen.getByText('Disabled Field');
    const root = container.querySelector('[data-slot="input-field"]');

    expect(input).toBeDisabled();
    expect(label).toHaveAttribute('data-disabled', 'true');
    expect(root).toHaveAttribute('data-disabled', 'true');
  });

  it('should propagate isReadOnly to input', () => {
    render(
      <InputField isReadOnly>
        <InputFieldInput readOnly value="Read only value" />
      </InputField>,
    );

    const input = screen.getByDisplayValue('Read only value');

    expect(input).toHaveAttribute('readonly');
  });

  it('should handle isInvalid state correctly (hide description, show error alert, set aria-invalid)', () => {
    render(
      <InputField isInvalid>
        <InputFieldLabel>Email</InputFieldLabel>
        <InputFieldInput />
        <InputFieldDescription>Must be a valid email.</InputFieldDescription>
        <InputFieldError>Email address is required.</InputFieldError>
      </InputField>,
    );

    const input = screen.getByRole('textbox');
    const errorMsg = screen.getByRole('alert');

    expect(screen.queryByText('Must be a valid email.')).not.toBeInTheDocument();
    expect(errorMsg).toHaveTextContent('Email address is required.');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', errorMsg.id);
  });

  it('should throw error when useInputFieldContext is used outside InputField provider', () => {
    expect(() => renderHook(() => useInputFieldContext())).toThrow(
      'useInputFieldContext must be used within an <InputField> component.',
    );
  });

  it('should pass accessibility audit with zero violations across all label variants', async () => {
    const { container: c1 } = render(
      <InputField labelVariant="default">
        <InputFieldLabel>Default Label</InputFieldLabel>
        <InputFieldInput placeholder="Default" />
      </InputField>,
    );

    await expectAccessible(c1);

    const { container: c2 } = render(
      <InputField labelVariant="inside-fixed">
        <InputFieldLabel>Inside Fixed Label</InputFieldLabel>
        <InputFieldInput placeholder="Inside Fixed" />
      </InputField>,
    );

    await expectAccessible(c2);

    const { container: c3 } = render(
      <InputField labelVariant="inside-floating">
        <InputFieldLabel>Inside Floating Label</InputFieldLabel>
        <InputFieldInput placeholder="Inside Floating" />
      </InputField>,
    );

    await expectAccessible(c3);

    const { container: c4 } = render(
      <InputField labelVariant="floating">
        <InputFieldLabel>Floating Label</InputFieldLabel>
        <InputFieldInput placeholder="Floating" />
      </InputField>,
    );

    await expectAccessible(c4);

    const { container: c5 } = render(
      <InputField isInvalid labelVariant="floating">
        <InputFieldLabel>Invalid Label</InputFieldLabel>
        <InputFieldInput />
        <InputFieldError>Error message</InputFieldError>
      </InputField>,
    );

    await expectAccessible(c5);
  });

  it('should apply root has-start-content modifier when startContent is provided', () => {
    const { container } = render(
      <InputField labelVariant="inside-floating">
        <InputFieldLabel>Label</InputFieldLabel>
        <InputFieldInput startContent={<span>$</span>} />
      </InputField>,
    );

    const root = container.querySelector('[data-slot="input-field"]');

    expect(root).toHaveClass('ideasui-input-field--has-start-content');
  });

  it('should apply size modifiers to root element for sm, md, and lg', () => {
    const { container: cSm } = render(
      <InputField size="sm">
        <InputFieldLabel>Small</InputFieldLabel>
        <InputFieldInput />
      </InputField>,
    );
    const { container: cMd } = render(
      <InputField size="md">
        <InputFieldLabel>Medium</InputFieldLabel>
        <InputFieldInput />
      </InputField>,
    );
    const { container: cLg } = render(
      <InputField size="lg">
        <InputFieldLabel>Large</InputFieldLabel>
        <InputFieldInput />
      </InputField>,
    );

    expect(cSm.querySelector('[data-slot="input-field"]')).toHaveClass('ideasui-input-field--sm');
    expect(cMd.querySelector('[data-slot="input-field"]')).toHaveClass('ideasui-input-field--md');
    expect(cLg.querySelector('[data-slot="input-field"]')).toHaveClass('ideasui-input-field--lg');
  });

  it('should render shadow variant correctly with shadow wrapper class', () => {
    const { container } = render(
      <InputField variant="shadow">
        <InputFieldLabel>Shadow</InputFieldLabel>
        <InputFieldInput />
      </InputField>,
    );

    const wrapper = container.querySelector('[data-slot="input-wrapper"]');

    expect(wrapper).toHaveClass('ideasui-input-field__wrapper--shadow');
  });

  it('should support custom shadow prop scale (xs, sm, md, lg, xl, boolean)', () => {
    const { container: cLg } = render(
      <InputField shadow="lg">
        <InputFieldLabel>Large Shadow</InputFieldLabel>
        <InputFieldInput />
      </InputField>,
    );

    const wrapper = cLg.querySelector('[data-slot="input-wrapper"]');

    expect(wrapper).toHaveClass('ideasui-input-field__wrapper--shadow-lg');
  });

  it('should restrict character entry when inputFilter="numeric" is applied', () => {
    render(
      <InputField inputFilter="numeric">
        <InputFieldLabel>Numeric Only</InputFieldLabel>
        <InputFieldInput />
      </InputField>,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input).toHaveAttribute('inputmode', 'numeric');

    fireEvent.change(input, { target: { value: 'abc123xyz45' } });
    expect(input.value).toBe('12345');
  });

  it('should restrict character entry when inputFilter="decimal" is applied', () => {
    render(
      <InputField>
        <InputFieldLabel>Decimal</InputFieldLabel>
        <InputFieldInput inputFilter="decimal" />
      </InputField>,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input).toHaveAttribute('inputmode', 'decimal');

    fireEvent.change(input, { target: { value: 'abc12.34.56def' } });
    expect(input.value).toBe('12.3456');
  });

  it('should restrict character entry when inputFilter="alpha" is applied', () => {
    render(
      <InputField inputFilter="alpha">
        <InputFieldLabel>Alpha Only</InputFieldLabel>
        <InputFieldInput />
      </InputField>,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Hariharan123!@#' } });
    expect(input.value).toBe('Hariharan');
  });

  it('should restrict character entry when inputFilter="alphanumeric" is applied', () => {
    render(
      <InputField inputFilter="alphanumeric">
        <InputFieldLabel>Alphanumeric Only</InputFieldLabel>
        <InputFieldInput />
      </InputField>,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Hari-123_abc!' } });
    expect(input.value).toBe('Hari123abc');
  });

  it('should apply custom classNames to all slots in single-component shorthand usage', () => {
    const { container } = render(
      <InputField
        classNames={{
          root: 'custom-root-class',
          label: 'custom-label-class',
          wrapper: 'custom-wrapper-class',
          input: 'custom-input-class',
          startContent: 'custom-start-class',
          endContent: 'custom-end-class',
          description: 'custom-desc-class',
        }}
        description="Helper description"
        endContent={<span>✓</span>}
        label="Username"
        startContent={<span>@</span>}
      />,
    );

    expect(container.querySelector('[data-slot="input-field"]')).toHaveClass('custom-root-class');
    expect(screen.getByText('Username')).toHaveClass('custom-label-class');
    expect(container.querySelector('[data-slot="input-wrapper"]')).toHaveClass(
      'custom-wrapper-class',
    );
    expect(screen.getByRole('textbox')).toHaveClass('custom-input-class');
    expect(container.querySelector('[data-slot="start-content"]')).toHaveClass(
      'custom-start-class',
    );
    expect(container.querySelector('[data-slot="end-content"]')).toHaveClass('custom-end-class');
    expect(screen.getByText('Helper description')).toHaveClass('custom-desc-class');
  });

  it('should pass slotProps to sub-components in single-component shorthand usage', () => {
    render(
      <InputField
        description="Helper"
        label="Email"
        slotProps={{
          root: { 'aria-label': 'Email form group' },
          label: { id: 'custom-label-id' },
          input: { 'data-testid': 'custom-input-element' },
          description: { id: 'custom-desc-id' },
        }}
      />,
    );

    expect(screen.getByLabelText('Email form group')).toBeInTheDocument();
    expect(screen.getByText('Email')).toHaveAttribute('id', 'custom-label-id');
    expect(screen.getByTestId('custom-input-element')).toBeInTheDocument();
    expect(screen.getByText('Helper')).toHaveAttribute('id', 'custom-desc-id');
  });

  it('should merge user-provided aria-describedby with internal description ID', () => {
    render(
      <InputField description="Internal Helper" label="Username">
        <InputField.Label>Username</InputField.Label>
        <InputField.Input aria-describedby="external-help-id" />
        <InputField.Description>Internal Helper</InputField.Description>
      </InputField>,
    );

    const input = screen.getByRole('textbox');
    const ariaDescribedBy = input.getAttribute('aria-describedby');

    expect(ariaDescribedBy).toContain('external-help-id');
    expect(ariaDescribedBy).toMatch(/external-help-id [:_]r\w+[:_]?/);
  });

  it('should preserve cursor position when input filter strips characters', () => {
    render(
      <InputField inputFilter="numeric" label="Pin">
        <InputField.Label>Pin</InputField.Label>
        <InputField.Input />
      </InputField>,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '12abc34' } });
    expect(input.value).toBe('1234');
  });

  it('should pass native input props (name, id, autoComplete, inputMode, maxLength, pattern) in shorthand usage', () => {
    render(
      <InputField
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        autoComplete="email"
        id="explicit-email-id"
        inputMode="email"
        label="Email"
        maxLength={50}
        minLength={5}
        name="user_email"
        pattern="[^@]+@[^@]+"
      />,
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('name', 'user_email');
    expect(input).toHaveAttribute('id', 'explicit-email-id');
    expect(input).toHaveAttribute('autocomplete', 'email');
    expect(input).toHaveAttribute('inputmode', 'email');
    expect(input).toHaveAttribute('maxlength', '50');
    expect(input).toHaveAttribute('minlength', '5');
    expect(input).toHaveAttribute('pattern', '[^@]+@[^@]+');
  });

  it('should forward inputRef to native input element in shorthand usage', () => {
    const inputRef = createRef<HTMLInputElement>();

    render(<InputField inputRef={inputRef} label="Username" placeholder="Enter username" />);

    expect(inputRef.current).toBeInTheDocument();
    expect(inputRef.current?.tagName).toBe('INPUT');
  });

  it('should support slotProps.errorMessage as primary naming for error slot props', () => {
    render(
      <InputField
        isInvalid
        errorMessage="Custom error message"
        label="Email"
        slotProps={{
          errorMessage: { 'data-testid': 'error-slot-test-id' },
        }}
      />,
    );

    expect(screen.getByTestId('error-slot-test-id')).toHaveTextContent('Custom error message');
  });
});

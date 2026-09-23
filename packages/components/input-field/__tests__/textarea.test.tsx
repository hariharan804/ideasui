/* eslint-disable testing-library/no-container, testing-library/no-node-access, testing-library/prefer-user-event */
import '@testing-library/jest-dom';

import { createRef, useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expectAccessible } from '@ideasui/utils/test';

import { Textarea, InputField } from '../src';

describe('Textarea', () => {
  it('should render shorthand component correctly with label and placeholder', () => {
    const { container } = render(
      <Textarea
        description="Public profile summary"
        label="Bio"
        placeholder="Tell us about yourself"
      />,
    );

    expect(screen.getByText('Bio')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell us about yourself')).toBeInTheDocument();
    expect(screen.getByText('Public profile summary')).toBeInTheDocument();

    const textarea = screen.getByPlaceholderText('Tell us about yourself');
    const label = screen.getByText('Bio');

    expect(label).toHaveAttribute('for', textarea.id);
    expect(textarea).toHaveAttribute('aria-describedby');
    expect(container.querySelector('[data-slot="input-field"]')).toBeInTheDocument();
  });

  it('should forward ref to HTMLTextAreaElement', () => {
    const textareaRef = createRef<HTMLTextAreaElement>();

    render(<Textarea ref={textareaRef} placeholder="Forward ref test" />);

    expect(textareaRef.current).toBeInstanceOf(HTMLTextAreaElement);
    expect(textareaRef.current?.tagName).toBe('TEXTAREA');
  });

  it('should render compound subcomponents correctly via Textarea', () => {
    render(
      <Textarea size="md" variant="outline">
        <Textarea.Label>Notes</Textarea.Label>
        <Textarea.Input minRows={4} placeholder="Take notes here..." />
        <Textarea.Description>Notes are saved locally.</Textarea.Description>
        <Textarea.Error>Error note</Textarea.Error>
      </Textarea>,
    );

    expect(screen.getByText('Notes')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Take notes here...')).toBeInTheDocument();
    expect(screen.getByText('Notes are saved locally.')).toBeInTheDocument();
  });

  it('should render via InputField.Textarea compound pattern', () => {
    render(
      <InputField label="Feedback">
        <InputField.Label>Feedback</InputField.Label>
        <InputField.Textarea placeholder="Share your thoughts" />
      </InputField>,
    );

    expect(screen.getByPlaceholderText('Share your thoughts')).toBeInTheDocument();
  });

  it('should handle controlled value and onValueChange callback', () => {
    const onValueChange = vi.fn();
    const onChange = vi.fn();

    function ControlledTest() {
      const [val, setVal] = useState('initial');

      return (
        <Textarea
          placeholder="Controlled test"
          value={val}
          onChange={(e) => {
            onChange(e);
            setVal(e.target.value);
          }}
          onValueChange={onValueChange}
        />
      );
    }

    render(<ControlledTest />);

    const textarea = screen.getByPlaceholderText('Controlled test');

    expect(textarea).toHaveValue('initial');

    fireEvent.change(textarea, { target: { value: 'updated value' } });

    expect(textarea).toHaveValue('updated value');
    expect(onChange).toHaveBeenCalled();
    expect(onValueChange).toHaveBeenCalledWith('updated value');
  });

  it('should display character count when showCharacterCount is true and maxLength is set', () => {
    render(
      <Textarea
        showCharacterCount
        defaultValue="Hello"
        maxLength={50}
        placeholder="Char count test"
      />,
    );

    expect(screen.getByText('5 / 50')).toBeInTheDocument();

    const textarea = screen.getByPlaceholderText('Char count test');

    fireEvent.change(textarea, { target: { value: 'Hello world' } });

    expect(screen.getByText('11 / 50')).toBeInTheDocument();
  });

  it('should display custom formatted character counter function', () => {
    render(
      <Textarea
        defaultValue="Hi"
        maxLength={100}
        placeholder="Custom counter"
        showCharacterCount={(count, max) => `${count} of ${max} chars`}
      />,
    );

    expect(screen.getByText('2 of 100 chars')).toBeInTheDocument();
  });

  it('should apply validation states correctly', () => {
    render(
      <Textarea isInvalid errorMessage="This field is required." placeholder="Invalid test" />,
    );

    expect(screen.getByText('This field is required.')).toBeInTheDocument();
    const textarea = screen.getByPlaceholderText('Invalid test');

    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('should support disabled and read-only attributes', () => {
    render(<Textarea isDisabled isReadOnly placeholder="Disabled test" />);

    const textarea = screen.getByPlaceholderText('Disabled test');

    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute('readonly');
  });

  it('should pass accessibility auditing with zero violations', async () => {
    const { container } = render(
      <Textarea
        description="Accessible description"
        label="Accessible Textarea"
        placeholder="Type here..."
      />,
    );

    await expectAccessible(container);
  });
});

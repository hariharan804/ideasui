import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import 'jest-axe/extend-expect';
import userEvent from '@testing-library/user-event';

import { Slot } from '../src/slot';

expect.extend(toHaveNoViolations);

describe('Slot', () => {
  describe('Normal Mode', () => {
    it('renders as div by default', () => {
      render(<Slot>Content</Slot>);
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByText('Content').tagName).toBe('DIV');
    });

    it('renders as specified element', () => {
      render(<Slot as="button">Button</Slot>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('forwards props correctly', () => {
      render(
        <Slot disabled as="button">
          Button
        </Slot>,
      );
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();

      render(<Slot ref={ref}>Content</Slot>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });
  });

  describe('AsChild Mode', () => {
    it('merges props with child element', () => {
      render(
        <Slot asChild className="slot-class">
          <button className="child-class">Button</button>
        </Slot>,
      );

      const button = screen.getByRole('button');

      expect(button).toHaveClass('slot-class', 'child-class');
    });

    it('composes event handlers correctly', async () => {
      const slotHandler = jest.fn();
      const childHandler = jest.fn();
      const user = userEvent.setup();

      render(
        <Slot asChild onClick={slotHandler}>
          <button onClick={childHandler}>Button</button>
        </Slot>,
      );

      await user.click(screen.getByRole('button'));
      expect(childHandler).toHaveBeenCalledTimes(1);
      expect(slotHandler).toHaveBeenCalledTimes(1);
    });

    it('merges styles with slot precedence', () => {
      render(
        <Slot asChild style={{ color: 'red', fontSize: '16px' }}>
          <div style={{ color: 'blue', margin: '10px' }}>Content</div>
        </Slot>,
      );

      const element = screen.getByText('Content');

      expect(element).toHaveStyle({
        color: 'rgb(255, 0, 0)', // slot takes precedence
        fontSize: '16px', // from slot
        margin: '10px', // from child
      });
    });

    it('throws error with invalid children in development', () => {
      const originalEnv = process.env.NODE_ENV;

      process.env.NODE_ENV = 'development';

      expect(() => {
        render(<Slot asChild>Invalid children</Slot>);
      }).toThrow('Slot: asChild requires a single React element as children');

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Slot as="button">Accessible Button</Slot>);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('maintains semantic meaning', () => {
      render(<Slot as="button">Button</Slot>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  it('handles slot event handler only', async () => {
    const slotHandler = jest.fn();
    const user = userEvent.setup();

    render(
      <Slot asChild onClick={slotHandler}>
        <button>Button</button>
      </Slot>,
    );

    await user.click(screen.getByRole('button'));
    expect(slotHandler).toHaveBeenCalledTimes(1);
  });

  it('merges classNames correctly when one is missing', () => {
    const { rerender } = render(
      <Slot asChild className="slot-only">
        <button>Button</button>
      </Slot>,
    );

    expect(screen.getByRole('button')).toHaveClass('slot-only');

    rerender(
      <Slot asChild>
        <button className="child-only">Button</button>
      </Slot>,
    );
    expect(screen.getByRole('button')).toHaveClass('child-only');
  });

  describe('TypeScript', () => {
    it('infers correct element props', () => {
      // This test ensures TypeScript compilation works correctly

      render(<Slot as="input" placeholder="Test" type="text" />);
      expect(screen.getByPlaceholderText('Test')).toBeInTheDocument();
    });
  });
});

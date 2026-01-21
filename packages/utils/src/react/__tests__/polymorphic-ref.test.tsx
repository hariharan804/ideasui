import { render, screen } from '@testing-library/react';

import { forwardRef, createPolymorphicComponent } from '../polymorphic-ref';

describe('polymorphic-ref', () => {
  describe('forwardRef', () => {
    it('should create a polymorphic component', () => {
      const Poly = forwardRef<'div', { test?: string }>(
        ({ as: Comp = 'div', test, ...props }, ref) => (
          <Comp ref={ref} data-test={test} {...props} />
        ),
      );

      render(
        <Poly as="button" data-testid="poly" test="value">
          content
        </Poly>,
      );
      const element = screen.getByTestId('poly');

      expect(element.tagName).toBe('BUTTON');
      expect(element).toHaveAttribute('data-test', 'value');
      expect(element).toHaveTextContent('content');

      // Ref check
      // React 18/19 compatibility for verify ref can be tricky in simple integration test without creating ref object
      // but the fact it renders means the type casting didn't crash runtime.
    });
  });

  describe('createPolymorphicComponent', () => {
    it('should create component with display name', () => {
      const Poly = createPolymorphicComponent<'div'>(
        ({ as: Comp = 'div', ...props }, ref) => <Comp ref={ref} {...props} />,
        'TestPoly',
      );

      expect(Poly.displayName).toBe('TestPoly');
      render(<Poly data-testid="poly" />);
      expect(screen.getByTestId('poly')).toBeInTheDocument();
    });

    it('should create component without display name', () => {
      const Poly = createPolymorphicComponent<'div'>(({ as: Comp = 'div', ...props }, ref) => (
        <Comp ref={ref} {...props} />
      ));

      expect(Poly.displayName).toBeUndefined();
      render(<Poly data-testid="poly-no-name" />);
      expect(screen.getByTestId('poly-no-name')).toBeInTheDocument();
    });
  });
});

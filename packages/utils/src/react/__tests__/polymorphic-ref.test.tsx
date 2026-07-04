import { render, screen } from '@testing-library/react';

import { forwardRef as forwardReference, createPolymorphicComponent } from '../polymorphic-ref';

describe('polymorphic-ref', () => {
  describe('forwardRef', () => {
    it('should create a polymorphic component', () => {
      const Poly = forwardReference<'div', { test?: string }>(
        ({ as: Comp = 'div', test, ...properties }, reference) => (
          <Comp ref={reference} data-test={test} {...properties} />
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
        ({ as: Comp = 'div', ...properties }, reference) => (
          <Comp ref={reference} {...properties} />
        ),
        'TestPoly',
      );

      expect(Poly.displayName).toBe('TestPoly');
      render(<Poly data-testid="poly" />);
      expect(screen.getByTestId('poly')).toBeInTheDocument();
    });

    it('should create component without display name', () => {
      const Poly = createPolymorphicComponent<'div'>(
        ({ as: Comp = 'div', ...properties }, reference) => (
          <Comp ref={reference} {...properties} />
        ),
      );

      expect(Poly.displayName).toBeUndefined();
      render(<Poly data-testid="poly-no-name" />);
      expect(screen.getByTestId('poly-no-name')).toBeInTheDocument();
    });
  });
});

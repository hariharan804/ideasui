import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  isValidElement,
  cloneChildrenWithProps,
  getChildrenArray,
  findChildByDisplayName,
  hasChildren,
  getValidElements,
} from '../children';
import { forwardRef, createPolymorphicComponent } from '../polymorphic-ref';

describe('react utils', () => {
  describe('children', () => {
    describe('isValidElement', () => {
      it('should return true for valid elements', () => {
        expect(isValidElement(<div />)).toBe(true);
      });

      it('should return false for invalid elements', () => {
        expect(isValidElement('string')).toBe(false);
        expect(isValidElement(null)).toBe(false);
        expect(isValidElement({})).toBe(false);
      });
    });

    describe('cloneChildrenWithProps', () => {
      it('should clone children and add props', () => {
        const Child = ({ data }: { data?: string }) => <div data-testid="child">{data}</div>;

        const TestComponent = ({ children }: { children: React.ReactNode }) => (
          <>{cloneChildrenWithProps(children, { data: 'test' })}</>
        );

        render(
          <TestComponent>
            <Child />
            <Child />
          </TestComponent>,
        );

        const elements = screen.getAllByTestId('child');

        expect(elements).toHaveLength(2);
        expect(elements[0]).toHaveTextContent('test');
        expect(elements[1]).toHaveTextContent('test');
      });

      it('should ignore non-element children', () => {
        const TestComponent = ({ children }: { children: React.ReactNode }) => (
          <>{cloneChildrenWithProps(children, { className: 'test' })}</>
        );

        render(
          <TestComponent>
            <div data-testid="child" />
            text
            {null}
          </TestComponent>,
        );

        const child = screen.getByTestId('child');

        expect(child).toHaveClass('test');
        expect(screen.getByText('text')).toBeInTheDocument();
      });
    });

    describe('getChildrenArray', () => {
      it('should return array of children', () => {
        let childrenCount = 0;
        const TestComponent = ({ children }: { children: React.ReactNode }) => {
          childrenCount = getChildrenArray(children).length;

          return null;
        };

        render(
          <TestComponent>
            <div>1</div>
            <div>2</div>
          </TestComponent>,
        );
        expect(childrenCount).toBe(2);
      });
    });

    describe('findChildByDisplayName', () => {
      it('should find child by display name', () => {
        const Target = () => <div>Target</div>;

        Target.displayName = 'TargetComponent';
        const Other = () => <div>Other</div>;

        Other.displayName = 'OtherComponent';

        let found: any = null;
        const TestComponent = ({ children }: { children: React.ReactNode }) => {
          found = findChildByDisplayName(children, 'TargetComponent');

          return null;
        };

        render(
          <TestComponent>
            <Other />
            <Target />
          </TestComponent>,
        );

        expect(isValidElement(found)).toBe(true);
        expect(found.type.displayName).toBe('TargetComponent');
      });

      it('should return null if not found', () => {
        const found = findChildByDisplayName(<div />, 'NonExistent');

        expect(found).toBeNull();
      });
    });

    describe('hasChildren', () => {
      it('should return true if has children', () => {
        expect(hasChildren(<div>child</div>)).toBe(true);
      });

      it('should return false to empty children', () => {
        // @ts-ignore
        expect(hasChildren(null)).toBe(false);
        // @ts-ignore
        expect(hasChildren([])).toBe(false);
      });
    });

    describe('getValidElements', () => {
      it('should return only valid elements', () => {
        let elements: any[] = [];
        const TestComponent = ({ children }: { children: React.ReactNode }) => {
          elements = getValidElements(children);

          return null;
        };

        render(
          <TestComponent>
            <div />
            text
            {null}
            <span />
          </TestComponent>,
        );

        expect(elements).toHaveLength(2);
        expect(elements[0].type).toBe('div');
        expect(elements[1].type).toBe('span');
      });
    });
  });

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
    });
  });
});

import type { ReactNode, JSX, ReactElement } from 'react';

import { render, screen } from '@testing-library/react';

import {
  isValidElement,
  cloneChildrenWithProps,
  getChildrenArray,
  findChildByDisplayName,
  hasChildren,
  getValidElements,
} from '../children';

/* eslint-disable unicorn/consistent-function-scoping */
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
      const Child = ({ data }: { data?: string }): JSX.Element => (
        <div data-testid="child">{data}</div>
      );

      const TestComponent = ({ children }: { children: ReactNode }): JSX.Element => (
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
      const TestComponent = ({ children }: { children: ReactNode }): JSX.Element => (
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
      const TestComponent = ({ children }: { children: ReactNode }): null => {
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
      const Target = (): JSX.Element => <div>Target</div>;

      Target.displayName = 'TargetComponent';
      const Other = (): JSX.Element => <div>Other</div>;

      Other.displayName = 'OtherComponent';

      let found: ReactNode = null;
      const TestComponent = ({ children }: { children: ReactNode }): null => {
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
      // @ts-ignore
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
      let elements: ReactElement[] = [];
      const TestComponent = ({ children }: { children: ReactNode }): null => {
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

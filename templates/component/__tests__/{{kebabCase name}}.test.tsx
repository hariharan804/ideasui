import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import * as React from 'react';
import { {{pascalCase name}} } from '../src';

expect.extend(toHaveNoViolations);

describe('{{pascalCase name}}', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<{{pascalCase name}}>Test content</{{pascalCase name}}>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('renders correctly', () => {
    render(<{{pascalCase name}}>Test content</{{pascalCase name}}>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    render(<{{pascalCase name}} className="test-class">Test</{{pascalCase name}}>);
    const element = screen.getByText('Test');
    expect(element).toHaveClass('test-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<{{pascalCase name}} ref={ref}>Test</{{pascalCase name}}>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
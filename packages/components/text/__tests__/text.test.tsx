import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectAccessible } from '@ideasui/utils/test';

import { Text } from '../src';

describe('Text Component', () => {
  it('renders default paragraph element with content', () => {
    render(<Text>Hello IdeasUI</Text>);
    const element = screen.getByText('Hello IdeasUI');

    expect(element.tagName).toBe('P');
    expect(element).toHaveAttribute('data-slot', 'text');
    expect(element).toHaveClass('ideasui-text');
    expect(element).toHaveClass('ideasui-text--body');
  });

  it('supports polymorphic as prop rendering different elements', () => {
    const { rerender } = render(<Text as="span">Span Text</Text>);

    expect(screen.getByText('Span Text').tagName).toBe('SPAN');

    rerender(<Text as="h1">Heading Text</Text>);
    expect(screen.getByText('Heading Text').tagName).toBe('H1');

    rerender(<Text as="code">Code Text</Text>);
    expect(screen.getByText('Code Text').tagName).toBe('CODE');
  });

  it('applies variant, size, weight, and color classes correctly', () => {
    render(
      <Text color="secondary" size="lg" variant="lead" weight="bold">
        Styled Text
      </Text>,
    );
    const element = screen.getByText('Styled Text');

    expect(element).toHaveClass('ideasui-text--lead');
    expect(element).toHaveClass('ideasui-text--size-lg');
    expect(element).toHaveClass('ideasui-text--weight-bold');
    expect(element).toHaveClass('ideasui-text--color-secondary');
  });

  it('renders distinct classes for each typographic variant when no size/weight prop is specified', () => {
    render(
      <div>
        <Text variant="lead">Lead Text</Text>
        <Text variant="body">Body Text</Text>
        <Text variant="label">Label Text</Text>
        <Text variant="caption">Caption Text</Text>
        <Text variant="overline">Overline Text</Text>
        <Text variant="code">Code Text</Text>
      </div>,
    );

    const lead = screen.getByText('Lead Text');
    const body = screen.getByText('Body Text');
    const label = screen.getByText('Label Text');
    const caption = screen.getByText('Caption Text');
    const overline = screen.getByText('Overline Text');
    const code = screen.getByText('Code Text');

    expect(lead).toHaveClass('ideasui-text--lead');
    expect(body).toHaveClass('ideasui-text--body');
    expect(label).toHaveClass('ideasui-text--label');
    expect(caption).toHaveClass('ideasui-text--caption');
    expect(overline).toHaveClass('ideasui-text--overline');
    expect(code).toHaveClass('ideasui-text--code');
  });

  it('renders heading variants (h1-h6) with appropriate heading tags and classes', () => {
    render(
      <div>
        <Text variant="h1">Heading 1</Text>
        <Text variant="h2">Heading 2</Text>
        <Text variant="h3">Heading 3</Text>
        <Text variant="h4">Heading 4</Text>
        <Text variant="h5">Heading 5</Text>
        <Text variant="h6">Heading 6</Text>
      </div>,
    );

    const h1 = screen.getByText('Heading 1');
    const h2 = screen.getByText('Heading 2');
    const h3 = screen.getByText('Heading 3');
    const h4 = screen.getByText('Heading 4');
    const h5 = screen.getByText('Heading 5');
    const h6 = screen.getByText('Heading 6');

    expect(h1.tagName).toBe('H1');
    expect(h1).toHaveClass('ideasui-text--h1');
    expect(h2.tagName).toBe('H2');
    expect(h2).toHaveClass('ideasui-text--h2');
    expect(h3.tagName).toBe('H3');
    expect(h3).toHaveClass('ideasui-text--h3');
    expect(h4.tagName).toBe('H4');
    expect(h4).toHaveClass('ideasui-text--h4');
    expect(h5.tagName).toBe('H5');
    expect(h5).toHaveClass('ideasui-text--h5');
    expect(h6.tagName).toBe('H6');
    expect(h6).toHaveClass('ideasui-text--h6');
  });

  it('renders helper variant correctly for form supporting text', () => {
    render(<Text variant="helper">Form helper note</Text>);
    const helper = screen.getByText('Form helper note');

    expect(helper).toHaveClass('ideasui-text--helper');
  });

  it('applies alignment and truncate props correctly', () => {
    render(
      <Text truncate align="center">
        Centered Truncated Text
      </Text>,
    );
    const element = screen.getByText('Centered Truncated Text');

    expect(element).toHaveClass('ideasui-text--align-center');
    expect(element).toHaveClass('ideasui-text--truncate');
  });

  it('applies multi-line lineClamp styles correctly', () => {
    render(<Text lineClamp={3}>Clamped Text</Text>);
    const element = screen.getByText('Clamped Text');

    expect(element).toHaveStyle({
      '--ideasui-line-clamp': '3',
    });
    expect(element).toHaveClass('ideasui-text--line-clamp');
  });

  it('supports slot prop for composition while retaining data-slot="text"', () => {
    render(<Text slot="description">Description Slot</Text>);
    const element = screen.getByText('Description Slot');

    expect(element).toHaveAttribute('data-slot', 'text');
    expect(element).toHaveAttribute('slot', 'description');
  });

  it('ensures lineClamp takes precedence over truncate prop', () => {
    render(
      <Text truncate lineClamp={2}>
        Prioritized Clamped Text
      </Text>,
    );
    const element = screen.getByText('Prioritized Clamped Text');

    expect(element).toHaveStyle({
      '--ideasui-line-clamp': '2',
    });
    expect(element).toHaveClass('ideasui-text--line-clamp');
    // Truncate BEM class 'ideasui-text--truncate' should not be applied when lineClamp is active
    expect(element).not.toHaveClass('ideasui-text--truncate');
  });

  it('forwards data-testid and custom attributes to the DOM element', () => {
    render(
      <Text data-testid="user-bio" id="bio-field" slot="description">
        Bio Content
      </Text>,
    );

    const element = screen.getByTestId('user-bio');

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('id', 'bio-field');
    expect(element).toHaveAttribute('data-slot', 'text');
    expect(element).toHaveAttribute('slot', 'description');
  });

  it('passes automated accessibility tests with zero violations', async () => {
    const { container } = render(
      <main>
        <Text variant="body">Body copy</Text>
        <Text as="label" variant="label">
          Field Label
        </Text>
        <Text color="secondary" size="sm" variant="caption">
          Caption note
        </Text>
      </main>,
    );

    await expectAccessible(container);
  });
});

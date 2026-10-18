/* eslint-disable testing-library/no-container, testing-library/no-node-access */
import '@testing-library/jest-dom';

import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { expectAccessible } from '@ideasui/utils/test';

import { Divider } from '../src';

describe('Divider Component', () => {
  describe('Basic Rendering & Semantics', () => {
    it('renders a semantic <hr> element when horizontal without a label', () => {
      const { container } = render(<Divider />);
      const hr = container.querySelector('hr');

      expect(hr).toBeInTheDocument();
      expect(hr).toHaveAttribute('role', 'separator');
      expect(hr).toHaveAttribute('aria-orientation', 'horizontal');
      expect(hr).toHaveAttribute('data-slot', 'divider');
      expect(hr).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('renders a <div> element when vertical without a label', () => {
      const { container } = render(<Divider orientation="vertical" />);
      const div = container.querySelector('div');

      expect(div).toBeInTheDocument();
      expect(container.querySelector('hr')).not.toBeInTheDocument();
      expect(div).toHaveAttribute('role', 'separator');
      expect(div).toHaveAttribute('aria-orientation', 'vertical');
      expect(div).toHaveAttribute('data-slot', 'divider');
      expect(div).toHaveAttribute('data-orientation', 'vertical');
    });

    it('renders role="none" and aria-hidden="true" when decorative', () => {
      const { container } = render(<Divider decorative />);
      const element = container.querySelector('[data-slot="divider"]');

      expect(element).toHaveAttribute('role', 'none');
      expect(element).toHaveAttribute('aria-hidden', 'true');
      expect(element).not.toHaveAttribute('aria-orientation');
    });
  });

  describe('Label Rendering & Placements', () => {
    it('renders label inside a flex container with two line segments for center placement', () => {
      const { container } = render(<Divider label="OR" labelPlacement="center" />);
      const root = container.querySelector('[data-slot="divider"]');
      const lines = container.querySelectorAll('[data-slot="divider-line"]');
      const label = screen.getByText('OR');

      expect(root).toBeInstanceOf(HTMLDivElement);
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute('data-slot', 'divider-label');
      expect(lines).toHaveLength(2);
      expect(lines[0]).toHaveAttribute('aria-hidden', 'true');
      expect(lines[1]).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders only the end line segment when labelPlacement="start"', () => {
      const { container } = render(<Divider label="Section Heading" labelPlacement="start" />);
      const lines = container.querySelectorAll('[data-slot="divider-line"]');

      expect(screen.getByText('Section Heading')).toBeInTheDocument();
      expect(lines).toHaveLength(1);
    });

    it('renders only the start line segment when labelPlacement="end"', () => {
      const { container } = render(<Divider label="Trailing Note" labelPlacement="end" />);
      const lines = container.querySelectorAll('[data-slot="divider-line"]');

      expect(screen.getByText('Trailing Note')).toBeInTheDocument();
      expect(lines).toHaveLength(1);
    });

    it('renders complex ReactNode inside label slot', () => {
      render(<Divider label={<span data-testid="custom-chip">Custom Chip</span>} />);
      expect(screen.getByTestId('custom-chip')).toBeInTheDocument();
    });

    it('treats empty string, null, and undefined as no-label', () => {
      const { container: emptyContainer } = render(<Divider label="" />);

      expect(emptyContainer.querySelector('hr')).toBeInTheDocument();

      const { container: nullContainer } = render(<Divider label={null} />);

      expect(nullContainer.querySelector('hr')).toBeInTheDocument();

      const { container: undefContainer } = render(<Divider label={undefined} />);

      expect(undefContainer.querySelector('hr')).toBeInTheDocument();
    });
  });

  describe('Variants, Thickness, and Colors', () => {
    it('applies variant classes correctly', () => {
      const { container: solid } = render(<Divider variant="solid" />);

      expect(solid.querySelector('[data-slot="divider"]')).toHaveClass('ideasui-divider--solid');

      const { container: dashed } = render(<Divider variant="dashed" />);

      expect(dashed.querySelector('[data-slot="divider"]')).toHaveClass('ideasui-divider--dashed');

      const { container: dotted } = render(<Divider variant="dotted" />);

      expect(dotted.querySelector('[data-slot="divider"]')).toHaveClass('ideasui-divider--dotted');
    });

    it('applies layout variants correctly via variant prop (middle, inset, full)', () => {
      const { container: middle } = render(<Divider variant="middle" />);
      const middleEl = middle.querySelector('[data-slot="divider"]');

      expect(middleEl).toHaveClass('ideasui-divider--middle');
      expect(middleEl).toHaveClass('mx-6');

      const { container: inset } = render(<Divider variant="inset" />);
      const insetEl = inset.querySelector('[data-slot="divider"]');

      expect(insetEl).toHaveClass('ideasui-divider--inset');
      expect(insetEl).toHaveClass('ms-16');

      const { container: insetEnd } = render(<Divider variant="inset-end" />);
      const insetEndEl = insetEnd.querySelector('[data-slot="divider"]');

      expect(insetEndEl).toHaveClass('ideasui-divider--inset-end');
      expect(insetEndEl).toHaveClass('me-16');

      const { container: full } = render(<Divider variant="full" />);
      const fullEl = full.querySelector('[data-slot="divider"]');

      expect(fullEl).toHaveClass('ideasui-divider--full');
      expect(fullEl).toHaveClass('w-full');
    });

    it('supports boolean shorthands and explicit layout prop', () => {
      const { container: insetBool } = render(<Divider inset />);

      expect(insetBool.querySelector('[data-slot="divider"]')).toHaveClass(
        'ideasui-divider--inset',
      );

      const { container: insetEndBool } = render(<Divider inset="end" />);

      expect(insetEndBool.querySelector('[data-slot="divider"]')).toHaveClass(
        'ideasui-divider--inset-end',
      );

      const { container: insetEndProp } = render(<Divider insetEnd />);

      expect(insetEndProp.querySelector('[data-slot="divider"]')).toHaveClass(
        'ideasui-divider--inset-end',
      );

      const { container: middleBool } = render(<Divider middle />);

      expect(middleBool.querySelector('[data-slot="divider"]')).toHaveClass(
        'ideasui-divider--middle',
      );

      const { container: fullBool } = render(<Divider full />);

      expect(fullBool.querySelector('[data-slot="divider"]')).toHaveClass('ideasui-divider--full');

      const { container: layoutMiddle } = render(<Divider layout="middle" variant="dashed" />);
      const el = layoutMiddle.querySelector('[data-slot="divider"]');

      expect(el).toHaveClass('ideasui-divider--middle');
      expect(el).toHaveClass('ideasui-divider--dashed');
    });

    it('applies thickness classes correctly', () => {
      const { container: sm } = render(<Divider thickness="sm" />);

      expect(sm.querySelector('[data-slot="divider"]')).toHaveClass('ideasui-divider--sm');

      const { container: md } = render(<Divider thickness="md" />);

      expect(md.querySelector('[data-slot="divider"]')).toHaveClass('ideasui-divider--md');

      const { container: lg } = render(<Divider thickness="lg" />);

      expect(lg.querySelector('[data-slot="divider"]')).toHaveClass('ideasui-divider--lg');
    });

    it('applies semantic color classes correctly', () => {
      const colors = ['default', 'primary', 'neutral', 'success', 'warning', 'danger'] as const;

      for (const color of colors) {
        const { container } = render(<Divider color={color} />);

        expect(container.querySelector('[data-slot="divider"]')).toHaveClass(
          `ideasui-divider--${color}`,
        );
      }
    });

    it('supports slot overrides via classNames and className', () => {
      const { container } = render(
        <Divider
          className="custom-root"
          classNames={{
            root: 'slot-root',
            line: 'slot-line',
            label: 'slot-label',
          }}
          label="Custom Slots"
        />,
      );

      const root = container.querySelector('[data-slot="divider"]');
      const line = container.querySelector('[data-slot="divider-line"]');
      const label = container.querySelector('[data-slot="divider-label"]');

      expect(root).toHaveClass('custom-root');
      expect(root).toHaveClass('slot-root');
      expect(line).toHaveClass('slot-line');
      expect(label).toHaveClass('slot-label');
    });
  });

  describe('Refs & DisplayName', () => {
    it('sets correct displayName', () => {
      expect(Divider.displayName).toBe('IdeasUI.Divider');
    });

    it('forwards ref to HTMLHRElement when plain horizontal', () => {
      const ref = createRef<HTMLElement>();

      render(<Divider ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLHRElement);
    });

    it('forwards ref to HTMLDivElement when vertical or with label', () => {
      const verticalRef = createRef<HTMLElement>();

      render(<Divider ref={verticalRef} orientation="vertical" />);
      expect(verticalRef.current).toBeInstanceOf(HTMLDivElement);

      const labelRef = createRef<HTMLElement>();

      render(<Divider ref={labelRef} label="Test" />);
      expect(labelRef.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Accessibility (WCAG 2.1 AA)', () => {
    it('plain horizontal divider has zero a11y violations', async () => {
      const { container } = render(<Divider />);

      await expectAccessible(container);
      expect(container).toBeInTheDocument();
    });

    it('horizontal divider with label has zero a11y violations', async () => {
      const { container } = render(<Divider label="OR" />);

      await expectAccessible(container);
      expect(container).toBeInTheDocument();
    });

    it('vertical divider in flex container has zero a11y violations', async () => {
      const { container } = render(
        <div style={{ display: 'flex', height: 32 }}>
          <span>Left</span>
          <Divider orientation="vertical" />
          <span>Right</span>
        </div>,
      );

      await expectAccessible(container);
      expect(container).toBeInTheDocument();
    });

    it('decorative divider has zero a11y violations', async () => {
      const { container } = render(<Divider decorative />);

      await expectAccessible(container);
      expect(container).toBeInTheDocument();
    });

    it('divider with start label placement has zero a11y violations', async () => {
      const { container } = render(<Divider label="Section Heading" labelPlacement="start" />);

      await expectAccessible(container);
      expect(container).toBeInTheDocument();
    });
  });
});

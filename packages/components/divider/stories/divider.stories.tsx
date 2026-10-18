import type { Meta, StoryObj } from '@storybook/react-vite';
import type { DividerProps } from '../src';

import { Divider } from '../src';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <p className="text-content-primary text-sm">Above the divider</p>
      <Divider />
      <p className="text-content-primary text-sm">Below the divider</p>
    </div>
  ),
};

export const WithLabelCenter: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Divider label="OR" />
      <Divider label="AND" />
      <Divider label="continue with" />
    </div>
  ),
};

export const LabelPlacements: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div>
        <p className="text-content-secondary mb-2 text-xs">start</p>
        <Divider label="Personal Information" labelPlacement="start" />
      </div>
      <div>
        <p className="text-content-secondary mb-2 text-xs">center</p>
        <Divider label="OR" labelPlacement="center" />
      </div>
      <div>
        <p className="text-content-secondary mb-2 text-xs">end</p>
        <Divider label="See all" labelPlacement="end" />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-6">
      {(['solid', 'dashed', 'dotted'] as const).map((variant) => (
        <div key={variant}>
          <p className="text-content-secondary mb-2 text-xs">{variant}</p>
          <Divider label={variant} variant={variant} />
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      {(['default', 'primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
        <div key={color}>
          <p className="text-content-secondary mb-1 text-xs">{color}</p>
          <Divider color={color} label={color} />
        </div>
      ))}
    </div>
  ),
};

export const Thickness: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-6">
      {(['sm', 'md', 'lg'] as const).map((thickness) => (
        <div key={thickness}>
          <p className="text-content-secondary mb-2 text-xs">{thickness}</p>
          <Divider color="primary" thickness={thickness} />
        </div>
      ))}
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex h-6 items-center gap-3">
        <span className="text-content-primary text-sm">Home</span>
        <Divider orientation="vertical" />
        <span className="text-content-primary text-sm">About</span>
        <Divider orientation="vertical" />
        <span className="text-content-primary text-sm">Blog</span>
        <Divider orientation="vertical" />
        <span className="text-content-primary text-sm">Contact</span>
      </div>

      <div className="flex h-8 items-center gap-3">
        <span className="text-sm">Left</span>
        <Divider color="primary" orientation="vertical" thickness="md" />
        <span className="text-sm">Right</span>
      </div>

      <div className="flex h-8 items-center gap-3">
        <span className="text-sm">Left</span>
        <Divider orientation="vertical" variant="dashed" />
        <span className="text-sm">Right</span>
      </div>
    </div>
  ),
};

export const Decorative: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <p className="text-content-primary text-sm">
        The divider below is decorative — hidden from screen readers.
      </p>
      <Divider decorative color="primary" variant="dashed" />
      <p className="text-content-primary text-sm">Content continues here.</p>
    </div>
  ),
};

export const IconLabel: Story = {
  render: () => {
    const StarIcon = () => (
      <svg aria-hidden="true" fill="currentColor" height="14" viewBox="0 0 16 16" width="14">
        <path d="M8 1l1.9 3.8 4.2.6-3 3 .7 4.2L8 10.5l-3.8 2 .7-4.2-3-3 4.2-.6z" />
      </svg>
    );

    return (
      <div className="flex w-full max-w-md flex-col gap-6">
        <Divider label={<StarIcon />} />
        <Divider color="warning" label={<StarIcon />} />
        <Divider color="primary" label={<StarIcon />} variant="dashed" />
      </div>
    );
  },
};

export const Playground: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    color: 'default',
    thickness: 'sm',
    label: 'OR',
    labelPlacement: 'center',
    decorative: false,
  },
  render: (args: DividerProps) => (
    <div className="w-full max-w-md">
      <Divider {...args} />
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { JSX } from 'react';

import { useState } from 'react';

import { Chip, ChipAvatar, ChipGroup, ChipIcon } from '../src';

const StarIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="size-full" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 1l1.9 3.8 4.2.6-3 3 .7 4.2L8 10.5l-3.8 2 .7-4.2-3-3 4.2-.6z" />
  </svg>
);

const meta: Meta<typeof Chip> = {
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Chip',
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  render: () => <Chip>React</Chip>,
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['solid', 'soft', 'outline', 'ghost'] as const).map((variant) => (
        <Chip key={variant} color="primary" variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Chip>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['solid', 'soft', 'outline'] as const).map((variant) => (
        <div key={variant} className="flex flex-wrap gap-2">
          {(['primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
            <Chip key={color} color={color} variant={variant}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Chip>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Chip key={size} color="primary" size={size} variant="soft">
          Size {size}
        </Chip>
      ))}
    </div>
  ),
};

function ModesDemo(): JSX.Element {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="flex flex-wrap gap-3">
      <Chip color="neutral" mode="static" variant="soft">
        Static
      </Chip>
      <Chip defaultSelected color="primary" mode="selectable" variant="soft">
        Selectable
      </Chip>
      {dismissed ? null : (
        <Chip
          color="danger"
          mode="dismissible"
          variant="soft"
          onDismiss={(): void => setDismissed(true)}
        >
          Dismissible
        </Chip>
      )}
    </div>
  );
}

export const Modes: Story = {
  render: () => <ModesDemo />,
};

export const WithAvatar: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip size="md" startContent={<ChipAvatar name="Jane Doe" />}>
        Jane Doe
      </Chip>
      <Chip size="md" startContent={<ChipAvatar name="John Smith" />}>
        John Smith
      </Chip>
      <Chip
        mode="dismissible"
        size="lg"
        startContent={<ChipAvatar name="Alice" />}
        onDismiss={(): void => {}}
      >
        Alice
      </Chip>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip
        color="warning"
        startContent={
          <ChipIcon>
            <StarIcon />
          </ChipIcon>
        }
        variant="soft"
      >
        Featured
      </Chip>
      <Chip
        color="success"
        startContent={
          <ChipIcon>
            <StarIcon />
          </ChipIcon>
        }
        variant="solid"
      >
        Verified
      </Chip>
      <Chip
        color="primary"
        startContent={
          <ChipIcon>
            <StarIcon />
          </ChipIcon>
        }
        variant="outline"
      >
        Premium
      </Chip>
    </div>
  ),
};

function DismissibleListDemo(): JSX.Element {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Next.js', 'Tailwind', 'Vitest']);
  const remove = (tag: string): void => {
    setTags((previous) => previous.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Chip
          key={tag}
          color="primary"
          mode="dismissible"
          variant="soft"
          onDismiss={(): void => remove(tag)}
        >
          {tag}
        </Chip>
      ))}
      {tags.length === 0 ? (
        <span className="text-content-secondary text-sm">All tags removed.</span>
      ) : null}
    </div>
  );
}

export const DismissibleList: Story = {
  render: () => <DismissibleListDemo />,
};

function FilterGroupDemo(): JSX.Element {
  const [filters, setFilters] = useState<string[]>(['react']);

  return (
    <div className="flex flex-col gap-3">
      <ChipGroup
        color="primary"
        label="Filter by framework"
        selectionMode="multiple"
        value={filters}
        variant="outline"
        onChange={setFilters}
      >
        <Chip value="react">React</Chip>
        <Chip value="vue">Vue</Chip>
        <Chip value="angular">Angular</Chip>
        <Chip value="svelte">Svelte</Chip>
        <Chip value="solid">Solid</Chip>
      </ChipGroup>
      <p className="text-content-secondary text-sm">
        Selected: {filters.length > 0 ? filters.join(', ') : 'none'}
      </p>
    </div>
  );
}

export const FilterGroup: Story = {
  render: () => <FilterGroupDemo />,
};

function SingleSelectGroupDemo(): JSX.Element {
  const [size, setSize] = useState<string[]>(['md']);

  return (
    <ChipGroup
      color="primary"
      label="Select size"
      selectionMode="single"
      value={size}
      variant="soft"
      onChange={setSize}
    >
      <Chip value="xs">XS</Chip>
      <Chip value="sm">SM</Chip>
      <Chip value="md">MD</Chip>
      <Chip value="lg">LG</Chip>
      <Chip value="xl">XL</Chip>
    </ChipGroup>
  );
}

export const SingleSelectGroup: Story = {
  render: () => <SingleSelectGroupDemo />,
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip isDisabled color="primary" variant="soft">
        Disabled static
      </Chip>
      <Chip isDisabled color="primary" mode="selectable" variant="soft">
        Disabled selectable
      </Chip>
      <Chip isDisabled color="danger" mode="dismissible" variant="soft" onDismiss={(): void => {}}>
        Disabled dismissible
      </Chip>
    </div>
  ),
};

export const StatusChips: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip color="success" variant="soft">
        Active
      </Chip>
      <Chip color="warning" variant="soft">
        Pending
      </Chip>
      <Chip color="danger" variant="soft">
        Rejected
      </Chip>
      <Chip color="neutral" variant="soft">
        Draft
      </Chip>
      <Chip color="primary" variant="soft">
        In Review
      </Chip>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: 'Chip label',
    color: 'primary',
    isDisabled: false,
    mode: 'static',
    size: 'md',
    variant: 'soft',
  },
  render: (arguments_) => <Chip {...arguments_} />,
};

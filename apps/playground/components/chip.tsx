'use client';

import type { JSX } from 'react';

import { useState } from 'react';
import { Chip, ChipAvatar, ChipGroup, ChipIcon } from '@ideasui/react';

const StarIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="size-full" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 1l1.9 3.8 4.2.6-3 3 .7 4.2L8 10.5l-3.8 2 .7-4.2-3-3 4.2-.6z" />
  </svg>
);

const INITIAL_TAGS = ['Design', 'Accessibility', 'Performance', 'React'];
const VARIANTS = ['solid', 'soft', 'outline'] as const;
const COLORS = ['primary', 'neutral', 'success', 'warning', 'danger'] as const;

export default function ChipPreview(): JSX.Element {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['react', 'tailwind']);
  const [singleChoice, setSingleChoice] = useState<string[]>(['md']);
  const [tags, setTags] = useState(INITIAL_TAGS);

  const handleResetTags = (): void => {
    setTags(INITIAL_TAGS);
  };

  const removeTag = (tagToRemove: string): void => {
    setTags((previous) => previous.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <div>
        <h1 className="text-content-primary mb-2 text-3xl font-bold">Chip Component</h1>
        <p className="text-content-secondary mb-4">
          Interactive showcase of the Chip compound component with modes, visual variants,
          adornments, and groups.
        </p>
      </div>

      {/* Modes */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Interaction Modes</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Chip color="neutral" mode="static" variant="soft">
            Static Tag
          </Chip>
          <Chip defaultSelected color="primary" mode="selectable" variant="soft">
            Selectable Chip
          </Chip>
          <Chip color="danger" mode="dismissible" variant="soft" onDismiss={(): void => {}}>
            Dismissible Chip
          </Chip>
        </div>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-3">
          <Chip color="primary" variant="solid">
            Solid
          </Chip>
          <Chip color="primary" variant="soft">
            Soft
          </Chip>
          <Chip color="primary" variant="outline">
            Outline
          </Chip>
          <Chip color="primary" variant="ghost">
            Ghost
          </Chip>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Color Schemes</h2>
        <div className="flex flex-col gap-3">
          {VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <Chip key={color} color={color} variant={variant}>
                  {color}
                </Chip>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Chip color="primary" size="sm" variant="soft">
            Small (20px)
          </Chip>
          <Chip color="primary" size="md" variant="soft">
            Medium (24px)
          </Chip>
          <Chip color="primary" size="lg" variant="soft">
            Large (32px)
          </Chip>
        </div>
      </div>

      {/* Adornments: Avatar & Icon */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Adornments (Avatar & Icon)</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Chip size="md" startContent={<ChipAvatar name="John Doe" />}>
            John Doe
          </Chip>
          <Chip
            color="primary"
            mode="dismissible"
            startContent={<ChipAvatar name="Sarah Connor" />}
            variant="soft"
            onDismiss={(): void => {}}
          >
            Sarah Connor
          </Chip>
          <Chip
            color="warning"
            startContent={
              <ChipIcon>
                <StarIcon />
              </ChipIcon>
            }
            variant="soft"
          >
            Featured Star
          </Chip>
        </div>
      </div>

      {/* Dismissible List */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Dismissible List</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Chip
              key={tag}
              color="primary"
              mode="dismissible"
              variant="soft"
              onDismiss={(): void => removeTag(tag)}
            >
              {tag}
            </Chip>
          ))}
          {tags.length === 0 ? (
            <button
              className="text-primary text-xs underline"
              type="button"
              onClick={handleResetTags}
            >
              Reset Tags
            </button>
          ) : null}
        </div>
      </div>

      {/* ChipGroup: Multi-select */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">
          Filter Chip Group (Multi-select)
        </h2>
        <ChipGroup
          label="Filters"
          selectionMode="multiple"
          value={selectedFilters}
          onChange={setSelectedFilters}
        >
          <Chip value="react">React</Chip>
          <Chip value="vue">Vue</Chip>
          <Chip value="svelte">Svelte</Chip>
          <Chip value="tailwind">Tailwind</Chip>
        </ChipGroup>
        <p className="text-content-secondary text-xs">
          Selected: {selectedFilters.join(', ') || 'None'}
        </p>
      </div>

      {/* ChipGroup: Single-select */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Single Select Group</h2>
        <ChipGroup
          color="primary"
          label="Size selection"
          selectionMode="single"
          value={singleChoice}
          variant="outline"
          onChange={setSingleChoice}
        >
          <Chip value="sm">Small</Chip>
          <Chip value="md">Medium</Chip>
          <Chip value="lg">Large</Chip>
        </ChipGroup>
      </div>
    </div>
  );
}

import type { JSX } from 'react';

import { Heart, Download, ArrowRight, Star, Plus } from 'lucide-react';
import { Button } from '@ideasui/button';

function ButtonPreview(): JSX.Element {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="mb-4 text-3xl font-bold">Button Component</h1>
        <p className="mb-8 text-gray-600">
          A versatile button component with multiple variants, sizes, and states.
        </p>
      </div>

      {/* Variants */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="solid">Solid</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>

      {/* Colors */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Colors</h2>
        <div className="flex flex-wrap gap-4">
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="success">Success</Button>
          <Button color="warning">Warning</Button>
          <Button color="danger">Danger</Button>
          <Button color="info">Info</Button>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </div>

      {/* With Icons */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">With Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Button startContent={<Heart className="h-4 w-4" />}>Like</Button>
          <Button endContent={<Download className="h-4 w-4" />}>Download</Button>
          <Button
            endContent={<ArrowRight className="h-4 w-4" />}
            startContent={<Star className="h-4 w-4" />}
          >
            Star & Share
          </Button>
          <Button size="sm" startContent={<Plus className="h-4 w-4" />}>
            Add Item
          </Button>
        </div>
      </div>

      {/* Loading States */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Loading States</h2>
        <div className="flex flex-wrap gap-4">
          <Button loading>Loading</Button>
          <Button loading loadingText="Saving...">
            Save
          </Button>
          <Button loading variant="outline">
            Loading Outline
          </Button>
          <Button loading size="lg" variant="ghost">
            Loading Ghost
          </Button>
        </div>
      </div>

      {/* States */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">States</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Border Radius</h2>
        <div className="flex flex-wrap gap-4">
          <Button radius="none">None</Button>
          <Button radius="sm">Small</Button>
          <Button radius="md">Medium</Button>
          <Button radius="lg">Large</Button>
          <Button radius="xl">Extra Large</Button>
          <Button radius="full">Full</Button>
        </div>
      </div>

      {/* Full Width */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Full Width</h2>
        <div className="max-w-md space-y-2">
          <Button fullWidth>Full Width Button</Button>
          <Button fullWidth variant="outline">
            Full Width Outline
          </Button>
          <Button fullWidth variant="ghost">
            Full Width Ghost
          </Button>
        </div>
      </div>

      {/* Combined Examples */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Combined Examples</h2>
        <div className="flex flex-wrap gap-4">
          <Button
            color="primary"
            radius="lg"
            size="lg"
            startContent={<Heart className="h-5 w-5" />}
            variant="solid"
          >
            Primary Large
          </Button>
          <Button
            color="success"
            endContent={<ArrowRight className="h-4 w-4" />}
            radius="full"
            size="md"
            variant="outline"
          >
            Success Outline
          </Button>
          <Button color="danger" radius="none" size="sm" variant="ghost">
            Danger Ghost
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ButtonPreview;

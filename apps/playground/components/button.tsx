'use client'
import React from 'react'
import { Button } from '@ideasui/button'
import { Heart, Download, ArrowRight, Star, Plus } from 'lucide-react'

function ButtonPreview() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">Button Component</h1>
        <p className="text-gray-600 mb-8">A versatile button component with multiple variants, sizes, and states.</p>
      </div>

      {/* Variants */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="solid">Solid</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>

      {/* Colors */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Colors</h2>
        <div className="flex flex-wrap gap-4">
          <Button color="default">Default</Button>
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
        <h2 className="text-xl font-semibold mb-4">Sizes</h2>
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
        <h2 className="text-xl font-semibold mb-4">With Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Button startContent={<Heart className="w-4 h-4" />}>
            Like
          </Button>
          <Button endContent={<Download className="w-4 h-4" />}>
            Download
          </Button>
          <Button 
            startContent={<Star className="w-4 h-4" />}
            endContent={<ArrowRight className="w-4 h-4" />}
          >
            Star & Share
          </Button>
          <Button startContent={<Plus className="w-4 h-4" />} size="sm">
            Add Item
          </Button>
        </div>
      </div>

      {/* Loading States */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Loading States</h2>
        <div className="flex flex-wrap gap-4">
          <Button loading>Loading</Button>
          <Button loading loadingText="Saving...">Save</Button>
          <Button loading variant="outline">Loading Outline</Button>
          <Button loading variant="ghost" size="lg">Loading Ghost</Button>
        </div>
      </div>

      {/* States */}
      <div>
        <h2 className="text-xl font-semibold mb-4">States</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Border Radius</h2>
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
        <h2 className="text-xl font-semibold mb-4">Full Width</h2>
        <div className="space-y-2 max-w-md">
          <Button fullWidth>Full Width Button</Button>
          <Button fullWidth variant="outline">Full Width Outline</Button>
          <Button fullWidth variant="ghost">Full Width Ghost</Button>
        </div>
      </div>

      {/* Combined Examples */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Combined Examples</h2>
        <div className="flex flex-wrap gap-4">
          <Button 
            color="primary" 
            variant="solid" 
            size="lg" 
            radius="lg"
            startContent={<Heart className="w-5 h-5" />}
          >
            Primary Large
          </Button>
          <Button 
            color="success" 
            variant="outline" 
            size="md" 
            radius="full"
            endContent={<ArrowRight className="w-4 h-4" />}
          >
            Success Outline
          </Button>
          <Button 
            color="danger" 
            variant="ghost" 
            size="sm" 
            radius="none"
          >
            Danger Ghost
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ButtonPreview
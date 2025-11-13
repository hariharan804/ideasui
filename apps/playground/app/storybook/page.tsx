'use client'

import { useState } from 'react'
import { Button } from '@your-org/button'

const stories = {
  Default: { children: 'Button' },
  Destructive: { variant: 'destructive' as const, children: 'Delete' },
  Outline: { variant: 'outline' as const, children: 'Outline' },
  Secondary: { variant: 'secondary' as const, children: 'Secondary' },
  Ghost: { variant: 'ghost' as const, children: 'Ghost' },
  Link: { variant: 'link' as const, children: 'Link' },
  Small: { size: 'sm' as const, children: 'Small' },
  Large: { size: 'lg' as const, children: 'Large' },
  Icon: { size: 'icon' as const, children: '🚀' },
  Disabled: { disabled: true, children: 'Disabled' }
}

export default function StorybookPage() {
  const [selectedStory, setSelectedStory] = useState('Default')
  const [customProps, setCustomProps] = useState({})

  const currentStory = { ...stories[selectedStory as keyof typeof stories], ...customProps }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Storybook in Next.js</h1>
      
      {/* Story Selector */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(stories).map(story => (
          <button
            key={story}
            onClick={() => setSelectedStory(story)}
            className={`px-3 py-1 rounded text-sm ${
              selectedStory === story 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {story}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
        <div>
          <label className="block text-sm font-medium mb-2">Variant</label>
          <select
            value={customProps.variant || currentStory.variant || 'default'}
            onChange={(e) => setCustomProps(prev => ({ ...prev, variant: e.target.value }))}
            className="w-full p-2 border rounded"
          >
            <option value="default">Default</option>
            <option value="destructive">Destructive</option>
            <option value="outline">Outline</option>
            <option value="secondary">Secondary</option>
            <option value="ghost">Ghost</option>
            <option value="link">Link</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Size</label>
          <select
            value={customProps.size || currentStory.size || 'default'}
            onChange={(e) => setCustomProps(prev => ({ ...prev, size: e.target.value }))}
            className="w-full p-2 border rounded"
          >
            <option value="default">Default</option>
            <option value="sm">Small</option>
            <option value="lg">Large</option>
            <option value="icon">Icon</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Children</label>
          <input
            type="text"
            value={customProps.children || currentStory.children}
            onChange={(e) => setCustomProps(prev => ({ ...prev, children: e.target.value }))}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">State</label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={customProps.disabled ?? currentStory.disabled ?? false}
              onChange={(e) => setCustomProps(prev => ({ ...prev, disabled: e.target.checked }))}
              className="mr-2"
            />
            Disabled
          </label>
        </div>
      </div>

      {/* Story Preview */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Story: {selectedStory}</h2>
        
        <div className="p-8 border rounded-lg bg-gray-50 flex items-center justify-center">
          <Button {...currentStory} onClick={() => alert(`${selectedStory} clicked!`)} />
        </div>
        
        {/* Code Display */}
        <div className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto">
          <pre className="text-sm">
{`<Button${Object.entries(currentStory)
  .filter(([key]) => key !== 'children')
  .map(([key, value]) => {
    if (typeof value === 'boolean') {
      return value ? `\n  ${key}` : ''
    }
    return `\n  ${key}="${value}"`
  })
  .join('')}
>
  ${currentStory.children}
</Button>`}
          </pre>
        </div>
      </div>
    </div>
  )
}
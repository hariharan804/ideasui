'use client'

import { useState, createElement } from 'react'
import { componentRegistry, getComponentNames, PropConfig } from '../lib/component-registry'

export default function DynamicPlayground() {
  const [selectedComponent, setSelectedComponent] = useState(getComponentNames()[0])
  const [props, setProps] = useState<Record<string, any>>(() => {
    const config = componentRegistry[getComponentNames()[0]]
    return Object.entries(config.props).reduce((acc, [key, propConfig]) => {
      acc[key] = propConfig.defaultValue
      return acc
    }, {} as Record<string, any>)
  })

  const handleComponentChange = (componentName: string) => {
    setSelectedComponent(componentName)
    const config = componentRegistry[componentName]
    const newProps = Object.entries(config.props).reduce((acc, [key, propConfig]) => {
      acc[key] = propConfig.defaultValue
      return acc
    }, {} as Record<string, any>)
    setProps(newProps)
  }

  const handlePropChange = (propName: string, value: any) => {
    setProps(prev => ({ ...prev, [propName]: value }))
  }

  const renderPropControl = (propName: string, propConfig: PropConfig) => {
    switch (propConfig.type) {
      case 'select':
        return (
          <select
            value={props[propName]}
            onChange={(e) => handlePropChange(propName, e.target.value)}
            className="w-full p-2 border rounded"
          >
            {propConfig.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )
      case 'boolean':
        return (
          <input
            type="checkbox"
            checked={props[propName]}
            onChange={(e) => handlePropChange(propName, e.target.checked)}
            className="mr-2"
          />
        )
      case 'string':
        return (
          <input
            type="text"
            value={props[propName]}
            onChange={(e) => handlePropChange(propName, e.target.value)}
            className="w-full p-2 border rounded"
          />
        )
      case 'number':
        return (
          <input
            type="number"
            value={props[propName]}
            onChange={(e) => handlePropChange(propName, Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        )
      default:
        return null
    }
  }

  const config = componentRegistry[selectedComponent]
  const Component = config.component

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Dynamic Component Playground</h1>
      
      {/* Component Selector */}
      <div>
        <label className="block text-sm font-medium mb-2">Component</label>
        <select
          value={selectedComponent}
          onChange={(e) => handleComponentChange(e.target.value)}
          className="p-2 border rounded"
        >
          {getComponentNames().map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">{selectedComponent} Component</h2>
        
        {/* Dynamic Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
          {Object.entries(config.props).map(([propName, propConfig]) => (
            <div key={propName}>
              <label className="block text-sm font-medium mb-2">{propConfig.label}</label>
              {renderPropControl(propName, propConfig)}
            </div>
          ))}
        </div>
        
        {/* Preview */}
        <div className="p-8 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-4">Preview</h3>
          {createElement(
            Component,
            { ...props, onClick: () => alert(`${selectedComponent} clicked!`) },
            config.defaultChildren
          )}
        </div>
        
        {/* Code */}
        <div className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto">
          <pre className="text-sm">
{`<${selectedComponent}${Object.entries(props)
  .map(([key, value]) => {
    if (typeof value === 'boolean') {
      return value ? `\n  ${key}` : ''
    }
    return `\n  ${key}="${value}"`
  })
  .join('')}
  onClick={() => alert('${selectedComponent} clicked!')}
>
  ${config.defaultChildren}
</${selectedComponent}>`}
          </pre>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Button } from '@your-org/button'
import { componentRegistry, getComponentNames } from '../../lib/component-registry'

const componentCategories = {
  'Form': ['Button'],
  'Navigation': [],
  'Feedback': [],
  'Data Display': [],
  'Layout': []
}

export default function LibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState('Form')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredComponents = getComponentNames().filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    componentCategories[selectedCategory as keyof typeof componentCategories].includes(name)
  )

  const ComponentCard = ({ name }: { name: string }) => {
    const config = componentRegistry[name]
    const defaultProps = Object.entries(config.props).reduce((acc, [key, propConfig]) => {
      acc[key] = propConfig.defaultValue
      return acc
    }, {} as Record<string, any>)

    return (
      <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-gray-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            </div>
          </div>
          
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center min-h-[80px]">
            <config.component {...defaultProps}>
              {config.defaultChildren}
            </config.component>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Props:</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                {Object.keys(config.props).length}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {Object.keys(config.props).slice(0, 3).map(prop => (
                <span key={prop} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {prop}
                </span>
              ))}
              {Object.keys(config.props).length > 3 && (
                <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                  +{Object.keys(config.props).length - 3}
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-4 flex space-x-2">
            <a
              href={`/components`}
              className="flex-1 bg-blue-500 text-white text-center py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Playground
            </a>
            <a
              href={`/storybook`}
              className="flex-1 bg-gray-100 text-gray-700 text-center py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Stories
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Component Library
              </h1>
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">{getComponentNames().length} components</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search components..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4">Categories</h2>
              <nav className="space-y-1">
                {Object.entries(componentCategories).map(([category, components]) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category}</span>
                      <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {components.length}
                      </span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedCategory} Components
              </h2>
              <p className="text-gray-600">
                Explore and interact with our {selectedCategory.toLowerCase()} components
              </p>
            </div>

            {filteredComponents.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No components found</h3>
                <p className="text-gray-500">Try adjusting your search or category selection</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredComponents.map(name => (
                  <ComponentCard key={name} name={name} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
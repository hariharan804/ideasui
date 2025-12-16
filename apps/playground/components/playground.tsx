'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Search, Grid, List } from 'lucide-react'
import Header from './header'

// ### IMPORT COMPONENT HERE ###

interface ComponentItem {
  name: string
  category?: string
}

/**
 * Add your components here...
 */
const COMPONENT_LIST: ComponentItem[] = [
  // ### APPEND COMPONENT HERE ###

  {
    name: 'Ripple',
    category: 'Core',
  },

  {
    name: 'Button',
    category: 'Form',
  },
  {
    name: 'Lib',
    category: 'Core',
  },
]

const categories = Array.from(
  new Set(COMPONENT_LIST.map((item) => item.category).filter(Boolean))
)

function Playground() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All')
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')

  const navigateToComponent = (name: string) => {
    router.push(`/playground/${name.toLowerCase()}`)
  }

  const filteredComponents = COMPONENT_LIST.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      {/* Filters */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-300 rounded-lg p-1 bg-white">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Components Grid/List */}
      <main className="container mx-auto px-6 pb-12">
        {filteredComponents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No components found matching your criteria.
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {filteredComponents.map((item, index) => (
              <div
                key={index}
                onClick={() => navigateToComponent(item.name)}
                className={`group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-primary-300 ${
                  viewMode === 'list' ? 'flex items-center gap-6' : ''
                }`}
              >
                <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                      {item.name}
                    </h3>
                    {item.category && (
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center text-sm text-primary-600 font-medium">
                    View Component
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Playground

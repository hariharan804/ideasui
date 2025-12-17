"use client";

import {useState} from "react";

import {componentRegistry, getComponentNames} from "../../lib/component-registry";

const componentCategories = {
  Form: ["Button"],
  Navigation: [],
  Feedback: [],
  "Data Display": [],
  Layout: [],
};

export default function LibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState("Form");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredComponents = getComponentNames().filter(
    (name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      componentCategories[selectedCategory as keyof typeof componentCategories].includes(name),
  );

  const ComponentCard = ({name}: {name: string}) => {
    const config = componentRegistry[name];
    const defaultProps = Object.entries(config.props).reduce(
      (acc, [key, propConfig]) => {
        acc[key] = propConfig.defaultValue;

        return acc;
      },
      {} as Record<string, any>,
    );

    return (
      <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-gray-300 hover:shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 transition-opacity group-hover:opacity-100" />

        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <div className="flex space-x-1">
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <div className="h-2 w-2 rounded-full bg-yellow-400" />
              <div className="h-2 w-2 rounded-full bg-red-400" />
            </div>
          </div>

          <div className="mb-4 flex min-h-[80px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-4">
            <config.component {...defaultProps}>{config.defaultChildren}</config.component>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Props:</span>
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                {Object.keys(config.props).length}
              </span>
            </div>

            <div className="flex flex-wrap gap-1">
              {Object.keys(config.props)
                .slice(0, 3)
                .map((prop) => (
                  <span key={prop} className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                    {prop}
                  </span>
                ))}
              {Object.keys(config.props).length > 3 && (
                <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
                  +{Object.keys(config.props).length - 3}
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 flex space-x-2">
            <a
              className="flex-1 rounded-lg bg-blue-500 px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-600"
              href={`/components`}
            >
              Playground
            </a>
            <a
              className="flex-1 rounded-lg bg-gray-100 px-3 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              href={`/storybook`}
            >
              Stories
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                Component Library
              </h1>
              <div className="hidden items-center space-x-2 sm:flex">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <span className="text-sm text-gray-500">
                  {getComponentNames().length} components
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  className="w-64 rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="Search components..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <div className="flex-shrink-0 lg:w-64">
            <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-4">
              <h2 className="mb-4 font-semibold text-gray-900">Categories</h2>
              <nav className="space-y-1">
                {Object.entries(componentCategories).map(([category, components]) => (
                  <button
                    key={category}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category}</span>
                      <span className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-600">
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
              <h2 className="mb-2 text-xl font-semibold text-gray-900">
                {selectedCategory} Components
              </h2>
              <p className="text-gray-600">
                Explore and interact with our {selectedCategory.toLowerCase()} components
              </p>
            </div>

            {filteredComponents.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">No components found</h3>
                <p className="text-gray-500">Try adjusting your search or category selection</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredComponents.map((name) => (
                  <ComponentCard key={name} name={name} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

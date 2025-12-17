"use client";
import React from "react";
import {useRouter} from "next/navigation";
import {Search, Grid, List} from "lucide-react";

// ### IMPORT COMPONENT HERE ###

interface ComponentItem {
  name: string;
  category?: string;
}

/**
 * Add your components here...
 */
const COMPONENT_LIST: ComponentItem[] = [
  // ### APPEND COMPONENT HERE ###

  {
    name: "Ripple",
    category: "Core",
  },

  {
    name: "Ripple",
    category: "Core",
  },

  {
    name: "Button",
    category: "Form",
  },
  {
    name: "Lib",
    category: "Core",
  },
];

const categories = Array.from(new Set(COMPONENT_LIST.map((item) => item.category).filter(Boolean)));

function Playground() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  const navigateToComponent = (name: string) => {
    router.push(`/playground/${name.toLowerCase()}`);
  };

  const filteredComponents = COMPONENT_LIST.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Filters */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative max-w-md flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <input
              className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 focus:border-transparent focus:ring-2"
              placeholder="Search components..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Category Filter */}
            <select
              className="focus:ring-primary-500 rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-transparent focus:ring-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg border border-gray-300 bg-white p-1">
              <button
                className={`rounded p-1.5 ${viewMode === "grid" ? "bg-primary-500 text-white" : "text-gray-600"}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                className={`rounded p-1.5 ${viewMode === "list" ? "bg-primary-500 text-white" : "text-gray-600"}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Components Grid/List */}
      <main className="container mx-auto px-6 pb-12">
        {filteredComponents.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">No components found matching your criteria.</p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                : "space-y-4"
            }
          >
            {filteredComponents.map((item, index) => (
              <div
                key={index}
                className={`group hover:border-primary-300 cursor-pointer rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
                  viewMode === "list" ? "flex items-center gap-6" : ""
                }`}
                onClick={() => navigateToComponent(item.name)}
              >
                <div className={`${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="group-hover:text-primary-600 text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    {item.category ? (
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                        {item.category}
                      </span>
                    ) : null}
                  </div>

                  <div className="text-primary-600 flex items-center text-sm font-medium">
                    View Component
                    <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Playground;

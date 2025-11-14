'use client'

export function PlaygroundEmbed() {
  return (
    <div className="my-8 p-6 border rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-900/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">🎮</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Interactive Playground
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Test components with live props and real-time updates
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Live component testing with Storybook
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Real-time prop modifications
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
          Accessibility testing built-in
        </div>
      </div>
      
      <div className="mt-6 flex gap-3">
        <button 
          onClick={() => window.open('http://localhost:6006', '_blank')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
        >
          Launch Playground →
        </button>
        <code className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
          npm run playground
        </code>
      </div>
    </div>
  )
}
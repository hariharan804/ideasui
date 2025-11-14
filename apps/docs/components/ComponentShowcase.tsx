'use client'

import { useState } from 'react'

// Mock Button component for demo
const Button = ({ children, variant = 'default', onClick, disabled, ...props }: any) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
  }
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export function ComponentShowcase() {
  const [count, setCount] = useState(0)

  return (
    <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-900/50 p-8">
      <div className="relative z-10">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Interactive Component Preview
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Experience our components in action. This button uses our Button component with built-in accessibility and theming.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {count}
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setCount(c => Math.max(0, c - 1))}
                disabled={count === 0}
              >
                Decrease
              </Button>
              <Button onClick={() => setCount(c => c + 1)}>
                Increase
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
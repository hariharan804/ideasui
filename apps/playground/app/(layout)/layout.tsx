'use client'
import Header from '@/components/header'
import { ReactNode, useState, useEffect } from 'react'

export default function PlaygroundLayout({
  children,
}: {
  children: ReactNode
}) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Header theme={theme as 'light' | 'dark'} onToggleTheme={toggleTheme} />
      {children}
    </div>
  )
}

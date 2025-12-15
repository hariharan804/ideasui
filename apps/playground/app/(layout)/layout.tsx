'use client'
import Header from '@/components/header'
import { ReactNode } from 'react'

export default function PlaygroundLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {children}
    </div>
  )
}

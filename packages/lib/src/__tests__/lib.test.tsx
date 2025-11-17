import { render, screen } from '@testing-library/react'
import { Lib } from '@/components/lib'

describe('Lib', () => {
  it('renders correctly', () => {
    render(<Lib>Test content</Lib>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies variant styles', () => {
    render(<Lib variant="secondary">Test</Lib>)
    expect(screen.getByText('Test')).toHaveClass('bg-secondary')
  })

  it('applies size styles', () => {
    render(<Lib size="sm">Test</Lib>)
    expect(screen.getByText('Test')).toHaveClass('h-9')
  })
})
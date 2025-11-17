import { render, screen } from '@testing-library/react'
import { Button } from '@/components/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Test content</Button>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies variant styles', () => {
    render(<Button variant="secondary">Test</Button>)
    expect(screen.getByText('Test')).toHaveClass('bg-secondary')
  })

  it('applies size styles', () => {
    render(<Button size="sm">Test</Button>)
    expect(screen.getByText('Test')).toHaveClass('h-9')
  })
})
import { render, screen } from '@testing-library/react'
import { {{name}} } from '@/components/{{kebabCase name}}'

describe('{{name}}', () => {
  it('renders correctly', () => {
    render(<{{name}}>Test content</{{name}}>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies variant styles', () => {
    render(<{{name}} variant="secondary">Test</{{name}}>)
    expect(screen.getByText('Test')).toHaveClass('bg-secondary')
  })

  it('applies size styles', () => {
    render(<{{name}} size="sm">Test</{{name}}>)
    expect(screen.getByText('Test')).toHaveClass('h-9')
  })
})
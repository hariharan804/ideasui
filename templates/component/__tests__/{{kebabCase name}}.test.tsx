import { render, screen } from '@testing-library/react'
import { {{pascalCase name}} } from '../{{kebabCase name}}'

describe('{{pascalCase name}}', () => {
  it('renders correctly', () => {
    render(<{{pascalCase name}}>Test content</{{pascalCase name}}>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies variant styles', () => {
    render(<{{pascalCase name}} variant="secondary">Test</{{pascalCase name}}>)
    const element = screen.getByText('Test')
    expect(element).toHaveClass('bg-secondary')
  })

  it('applies size styles', () => {
    render(<{{pascalCase name}} size="sm">Test</{{pascalCase name}}>)
    const element = screen.getByText('Test')
    expect(element).toHaveClass('h-8')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<{{pascalCase name}} ref={ref}>Test</{{pascalCase name}}>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
import { render, screen } from '@testing-library/react'
import { Ripple } from '../ripple'

describe('Ripple', () => {
  it('renders correctly', () => {
    render(<Ripple>Test content</Ripple>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies variant styles', () => {
    render(<Ripple variant="secondary">Test</Ripple>)
    const element = screen.getByText('Test')
    expect(element).toHaveClass('bg-secondary')
  })

  it('applies size styles', () => {
    render(<Ripple size="sm">Test</Ripple>)
    const element = screen.getByText('Test')
    expect(element).toHaveClass('h-8')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Ripple ref={ref}>Test</Ripple>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
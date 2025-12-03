import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { Box } from '../box'

describe('Box', () => {
  it('renders correctly', () => {
    render(<Box>Test content</Box>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders as different elements', () => {
    render(<Box as="section">Section content</Box>)
    const element = screen.getByText('Section content')
    expect(element.tagName).toBe('SECTION')
  })

  it('applies padding classes', () => {
    render(<Box p={4}>Padded content</Box>)
    const element = screen.getByText('Padded content')
    expect(element).toHaveClass('p-4')
  })

  it('applies margin classes', () => {
    render(<Box m={2}>Margin content</Box>)
    const element = screen.getByText('Margin content')
    expect(element).toHaveClass('m-2')
  })

  it('applies background classes', () => {
    render(<Box bg="primary">Background content</Box>)
    const element = screen.getByText('Background content')
    expect(element).toHaveClass('bg-primary')
  })

  it('applies border classes', () => {
    render(<Box border={1} borderColor="gray">Border content</Box>)
    const element = screen.getByText('Border content')
    expect(element).toHaveClass('border', 'border-gray-200')
  })

  it('applies rounded classes', () => {
    render(<Box rounded="lg">Rounded content</Box>)
    const element = screen.getByText('Rounded content')
    expect(element).toHaveClass('rounded-lg')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Box ref={ref}>Test</Box>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('combines multiple variants', () => {
    render(
      <Box p={4} m={2} bg="gray" rounded="md" shadow="lg">
        Combined styles
      </Box>
    )
    const element = screen.getByText('Combined styles')
    expect(element).toHaveClass('p-4', 'm-2', 'bg-gray-50', 'rounded-md', 'shadow-lg')
  })
})
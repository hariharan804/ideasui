import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { IdeasUIProvider, useIdeasUI } from '../provider'

const TestComponent = () => {
  const config = useIdeasUI()
  return (
    <div>
      <span data-testid="theme">{config.defaultTheme}</span>
      <span data-testid="prefix">{config.cssPrefix}</span>
      <span data-testid="animations">{config.disableAnimations ? 'disabled' : 'enabled'}</span>
    </div>
  )
}

describe('IdeasUIProvider', () => {
  it('provides default configuration', () => {
    render(
      <IdeasUIProvider>
        <TestComponent />
      </IdeasUIProvider>
    )

    expect(screen.getByTestId('theme')).toHaveTextContent('system')
    expect(screen.getByTestId('prefix')).toHaveTextContent('--iui')
    expect(screen.getByTestId('animations')).toHaveTextContent('enabled')
  })

  it('provides custom configuration', () => {
    render(
      <IdeasUIProvider
        defaultTheme="dark"
        cssPrefix="--custom"
        disableAnimations={true}
      >
        <TestComponent />
      </IdeasUIProvider>
    )

    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    expect(screen.getByTestId('prefix')).toHaveTextContent('--custom')
    expect(screen.getByTestId('animations')).toHaveTextContent('disabled')
  })

  it('throws error when useIdeasUI is used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    
    expect(() => {
      render(<TestComponent />)
    }).toThrow('useIdeasUI must be used within an IdeasUIProvider')
    
    consoleSpy.mockRestore()
  })

  it('sets CSS custom properties on document root', () => {
    render(
      <IdeasUIProvider disableAnimations={true}>
        <div>Test</div>
      </IdeasUIProvider>
    )

    const root = document.documentElement
    expect(root.style.getPropertyValue('--iui-animations')).toBe('0')
    expect(root.getAttribute('data-iui-animations')).toBe('disabled')
  })
})
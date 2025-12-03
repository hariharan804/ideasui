import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Toggle } from '../toggle'

describe('Toggle', () => {
  it('renders with default state', () => {
    render(
      <Toggle>
        {({ isOn }) => <button>{isOn ? 'ON' : 'OFF'}</button>}
      </Toggle>
    )
    
    expect(screen.getByText('OFF')).toBeInTheDocument()
  })

  it('renders with default pressed state', () => {
    render(
      <Toggle defaultPressed>
        {({ isOn }) => <button>{isOn ? 'ON' : 'OFF'}</button>}
      </Toggle>
    )
    
    expect(screen.getByText('ON')).toBeInTheDocument()
  })

  it('toggles state when clicked', () => {
    render(
      <Toggle>
        {({ isOn, toggle }) => (
          <button onClick={toggle}>{isOn ? 'ON' : 'OFF'}</button>
        )}
      </Toggle>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('OFF')
    
    fireEvent.click(button)
    expect(button).toHaveTextContent('ON')
    
    fireEvent.click(button)
    expect(button).toHaveTextContent('OFF')
  })

  it('calls onPressedChange when toggled', () => {
    const onPressedChange = jest.fn()
    
    render(
      <Toggle onPressedChange={onPressedChange}>
        {({ toggle }) => <button onClick={toggle}>Toggle</button>}
      </Toggle>
    )
    
    fireEvent.click(screen.getByRole('button'))
    expect(onPressedChange).toHaveBeenCalledWith(true)
    
    fireEvent.click(screen.getByRole('button'))
    expect(onPressedChange).toHaveBeenCalledWith(false)
  })

  it('works in controlled mode', () => {
    const ControlledToggle = () => {
      const [pressed, setPressed] = React.useState(false)
      
      return (
        <Toggle pressed={pressed} onPressedChange={setPressed}>
          {({ isOn, toggle }) => (
            <button onClick={toggle}>{isOn ? 'ON' : 'OFF'}</button>
          )}
        </Toggle>
      )
    }
    
    render(<ControlledToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('OFF')
    
    fireEvent.click(button)
    expect(button).toHaveTextContent('ON')
  })

  it('does not toggle when disabled', () => {
    render(
      <Toggle disabled>
        {({ isOn, toggle }) => (
          <button onClick={toggle}>{isOn ? 'ON' : 'OFF'}</button>
        )}
      </Toggle>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('OFF')
    
    fireEvent.click(button)
    expect(button).toHaveTextContent('OFF')
  })
})
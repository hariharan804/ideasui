# Switch Component Specification

## Component Name

Switch

## Props

- `checked` (optional): Switch state
- `defaultChecked` (optional): Default switch state
- `disabled` (optional): Disable switch
- `label` (optional): Switch label
- `description` (optional): Helper text
- `onChange` (optional): Handle state changes
- `className` (optional): Custom CSS classes

## React Aria Integration

- Uses `useSwitch` hook
- Implements `useFocusRing` for focus management
- ARIA attributes for toggle states

## Behavior & States

- **Off**: Default unchecked state
- **On**: Checked/active state
- **Focus**: Keyboard focus indication
- **Disabled**: Non-interactive state

## Accessibility Features

- WCAG 2.1 AA compliant
- Keyboard navigation (Space key)
- Screen reader compatible
- Proper ARIA states

# Checkbox Component Specification

## Component Name
Checkbox

## Props
- `checked` (optional): Checked state
- `defaultChecked` (optional): Default checked state
- `indeterminate` (optional): Indeterminate state
- `disabled` (optional): Disable checkbox
- `label` (optional): Checkbox label
- `description` (optional): Helper text
- `onChange` (optional): Handle state changes
- `className` (optional): Custom CSS classes

## React Aria Integration
- Uses `useCheckbox` hook
- Implements `useFocusRing` for focus management
- ARIA attributes for states

## Behavior & States
- **Unchecked**: Default state
- **Checked**: Selected state
- **Indeterminate**: Partial selection
- **Focus**: Keyboard focus indication
- **Disabled**: Non-interactive state

## Accessibility Features
- WCAG 2.1 AA compliant
- Keyboard navigation (Space key)
- Screen reader compatible
- Proper ARIA states
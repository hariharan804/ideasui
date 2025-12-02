# Badge Component Specification

## Component Name
Badge

## Props
- `children` (required): Badge content
- `variant` (optional, default: 'solid'): 'solid', 'outline', 'soft'
- `color` (optional, default: 'primary'): 'primary', 'secondary', 'success', 'warning', 'danger'
- `size` (optional, default: 'md'): 'sm', 'md', 'lg'
- `className` (optional): Custom CSS classes

## React Aria Integration
- Uses semantic HTML with proper ARIA labels
- Screen reader accessible content

## Behavior & States
- **Default**: Static display element
- **Interactive**: Optional click handling

## Accessibility Features
- WCAG 2.1 AA compliant
- Proper color contrast
- Screen reader compatible
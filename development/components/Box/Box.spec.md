# Box Component Specification

## Component Name

Box

## Props

- `children` (required): Box content
- `as` (optional, default: 'div'): HTML element or React component
- `padding` (optional): 'none', 'xs', 'sm', 'md', 'lg', 'xl'
- `margin` (optional): 'none', 'xs', 'sm', 'md', 'lg', 'xl'
- `bg` (optional): Background color variant
- `border` (optional): Border variant
- `radius` (optional): Border radius variant
- `shadow` (optional): Box shadow variant
- `className` (optional): Custom CSS classes

## React Aria Integration

- Semantic HTML structure
- Proper ARIA attributes when needed
- Keyboard navigation support

## Behavior & States

- **Default**: Basic container with semantic HTML
- **Interactive**: Can be made clickable with proper focus states
- **Responsive**: Supports responsive design patterns

## Accessibility Features

- WCAG 2.1 AA compliant
- Semantic HTML elements
- Proper focus management
- Screen reader compatible

## Implementation Approach

- React functional component with forwardRef
- TypeScript for type safety
- Tailwind CSS with variants
- Polymorphic component (as prop)
- Semantic HTML structure

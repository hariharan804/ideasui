# Button Component Specification

## Component Name

Button

## Props

- `children` (required): Button label or content
- `variant` (optional, default: 'solid'): 'solid', 'outline', 'ghost', 'soft', 'link'
- `color` (optional, default: 'primary'): 'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'gray'
- `size` (optional, default: 'md'): 'xs', 'sm', 'md', 'lg', 'xl', 'icon'
- `disabled` (optional): Disable interaction
- `loading` (optional): Show loading state with spinner
- `onClick` (optional): Handle click events
- `className` (optional): Custom CSS classes
- `aria-label` (optional): Accessibility label
- `leftIcon` (optional): Icon before text
- `rightIcon` (optional): Icon after text
- `fullWidth` (optional): Make button full width
- `ripple` (optional, default: true): Enable ripple effect

## React Aria Integration

- Uses `useButton` hook for keyboard navigation
- Implements `usePress` for touch/mouse interactions
- Supports `useFocusRing` for focus management
- ARIA attributes automatically handled

## Behavior & States

- **Default**: Ready for interaction with proper focus management
- **Hover**: Visual feedback with smooth transitions
- **Focus**: Visible focus ring with keyboard navigation support
- **Active**: Visual feedback during press state
- **Disabled**: Non-interactive with reduced opacity
- **Loading**: Shows spinner, blocks interaction, maintains accessibility

## Accessibility Features

- WCAG 2.1 AA compliant (4.5:1 color contrast)
- Keyboard navigation (Enter/Space keys)
- Screen reader compatible
- Focus management with React Aria
- Proper ARIA attributes

## Implementation Approach

- React functional component with forwardRef
- TypeScript for type safety
- Tailwind CSS with class-variance-authority
- React Aria hooks for accessibility
- Semantic HTML button element

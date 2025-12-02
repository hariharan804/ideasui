# Card Component Specification

## Component Name
Card

## Props
- `children` (required): Card content
- `variant` (optional, default: 'elevated'): 'elevated', 'outlined', 'filled'
- `padding` (optional, default: 'md'): 'none', 'sm', 'md', 'lg', 'xl'
- `radius` (optional, default: 'md'): 'none', 'sm', 'md', 'lg', 'xl', 'full'
- `shadow` (optional, default: 'md'): 'none', 'sm', 'md', 'lg', 'xl'
- `className` (optional): Custom CSS classes
- `header` (optional): Card header content
- `footer` (optional): Card footer content
- `clickable` (optional): Make card clickable
- `onClick` (optional): Handle click events
- `disabled` (optional): Disable card interactions

## React Aria Integration
- Uses `useButton` when clickable
- Implements `useFocusRing` for keyboard focus
- Supports `usePress` for interaction handling
- ARIA attributes for interactive cards
- Proper semantic structure

## Behavior & States
- **Default**: Static container with proper spacing
- **Clickable**: Interactive with hover and focus states
- **Hover**: Subtle elevation change for clickable cards
- **Focus**: Clear focus indication for keyboard users
- **Disabled**: Non-interactive with muted appearance
- **Loading**: Optional loading state with skeleton

## Accessibility Features
- WCAG 2.1 AA compliant
- Proper semantic structure
- Keyboard navigation for interactive cards
- Screen reader compatible
- Focus management
- Color contrast compliance

## Implementation Approach
- React functional component with forwardRef
- TypeScript for type safety
- Tailwind CSS with variants
- React Aria hooks for interactive behavior
- Semantic HTML structure (article/section)
Component Name: [Component Name]

Props:
children (required): Button label or content
variant (optional, default: 'default'): 'default', 'outline', 'ghost', 'destructive'
size (optional, default: 'md'): 'sm', 'md', 'lg', 'icon'
disabled (optional): Disable interaction
isLoading (optional): Show loading state with spinner
onClick (optional): Handle click events
className (optional): Custom CSS classes
aria-label (optional): Accessibility label

Behavior & States:
Default: Component ready for interaction
Hover: Visual feedback when mouse hovers
Focus: Keyboard accessible with visible focus ring
Active: Visual change when being pressed
Disabled: Not interactive, reduced opacity
Loading: Show spinner, block user interaction

Approach:
Use React functional component with React.forwardRef for ref support
TypeScript for full type safety
Tailwind CSS for styling with class-variance-authority (CVA) for variant management
Semantic HTML (<button> element) for accessibility
Keyboard navigation support (Enter/Space keys)
ARIA attributes for screen reader compatibility
WCAG 2.1 AA compliance (4.5:1 color contrast minimum)
No external dependencies beyond existing project packages

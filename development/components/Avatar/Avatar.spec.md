# Avatar Component Specification

## Component Name
Avatar

## Props
- `src` (optional): Image source URL
- `alt` (optional): Alt text for image
- `fallback` (optional): Fallback content when image fails
- `size` (optional, default: 'md'): 'sm', 'md', 'lg', 'xl'
- `shape` (optional, default: 'circle'): 'circle', 'square'
- `className` (optional): Custom CSS classes

## React Aria Integration
- Proper image alt text handling
- Semantic HTML structure

## Behavior & States
- **Loading**: Shows fallback while image loads
- **Loaded**: Displays image when available
- **Error**: Shows fallback when image fails
- **Fallback**: Shows initials or icon

## Accessibility Features
- WCAG 2.1 AA compliant
- Proper alt text for images
- Screen reader compatible
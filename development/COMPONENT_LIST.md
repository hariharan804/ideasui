# Component Library - Complete List

## Basic Components (Ready for First Publish)

### Form Components
- **Button** - Interactive button with variants, loading states, icons
- **Input** - Text input with validation, labels, helper text
- **Textarea** - Multi-line text input with validation
- **Checkbox** - Checkbox with indeterminate state support
- **Switch** - Toggle switch component
- **Select** - Dropdown select with options

### Display Components
- **Card** - Container component with header/footer
- **Badge** - Status indicators and labels
- **Avatar** - User profile images with fallbacks
- **Box** - Flexible container with spacing and styling variants

### Overlay Components
- **Dialog** - Modal dialogs with focus management

## React Aria Integration

All components implement:
- ✅ Keyboard navigation
- ✅ Screen reader compatibility
- ✅ Focus management
- ✅ WCAG 2.1 AA compliance
- ✅ Proper ARIA attributes

## File Structure

```
components/
├── Button/
│   ├── Button.spec.md
│   └── Button.tsx
├── Input/
│   ├── Input.spec.md
│   └── Input.tsx
├── Card/
│   ├── Card.spec.md
│   └── Card.tsx
├── Badge/
│   ├── Badge.spec.md
│   └── Badge.tsx
├── Checkbox/
│   ├── Checkbox.spec.md
│   └── Checkbox.tsx
├── Select/
│   ├── Select.spec.md
│   └── Select.tsx
├── Switch/
│   ├── Switch.spec.md
│   └── Switch.tsx
├── Textarea/
│   ├── Textarea.spec.md
│   └── Textarea.tsx
├── Avatar/
│   ├── Avatar.spec.md
│   └── Avatar.tsx
├── Dialog/
│   ├── Dialog.spec.md
│   └── Dialog.tsx
└── index.ts
```

## Usage Example

```tsx
import { 
  Button, 
  Input, 
  Card, 
  Badge, 
  Checkbox, 
  Switch,
  Avatar,
  Dialog,
  Box 
} from './components'

function App() {
  return (
    <Box padding="lg" bg="gray" radius="lg">
      <Card header={<h2>User Profile</h2>}>
        <Avatar src="/user.jpg" fallback="JD" />
        <Badge variant="solid" color="success">Active</Badge>
        
        <Input label="Name" placeholder="Enter name" />
        <Checkbox label="Subscribe to newsletter" />
        <Switch label="Enable notifications" />
        
        <Button variant="solid" size="md">
          Save Changes
        </Button>
      </Card>
    </Box>
  )
}
```
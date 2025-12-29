# Development Components

This folder contains basic components ready for first publish with React Aria integration.

## Components

### Button

- **Location**: `./components/Button/`
- **Spec**: `Button.spec.md`
- **Implementation**: `Button.tsx`
- **Features**: React Aria hooks, accessibility, loading states, variants

### Input

- **Location**: `./components/Input/`
- **Spec**: `Input.spec.md`
- **Implementation**: `Input.tsx`
- **Features**: React Aria text field, validation, icons, helper text

### Card

- **Location**: `./components/Card/`
- **Spec**: `Card.spec.md`
- **Implementation**: `Card.tsx`
- **Features**: Interactive cards, header/footer, variants

## React Aria Integration

Each component uses appropriate React Aria hooks:

- `useButton` - Button interactions
- `useTextField` - Input field management
- `useFocusRing` - Focus indication
- `usePress` - Touch/mouse interactions

## Usage

```tsx
import {Button, Input, Card} from "./components";

function App() {
  return (
    <Card header={<h2>Form</h2>}>
      <Input label="Name" placeholder="Enter your name" />
      <Button variant="solid" size="md">
        Submit
      </Button>
    </Card>
  );
}
```

## Next Steps

1. Install React Aria dependencies
2. Test components with screen readers
3. Add Storybook stories
4. Create unit tests
5. Publish to npm

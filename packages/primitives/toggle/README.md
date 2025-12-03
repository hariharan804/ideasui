# Toggle Primitive

Headless toggle component that provides toggle state management without any styling.

## Installation

```bash
npm install @iui/toggle-primitive
```

## Usage

```tsx
import { Toggle } from '@iui/toggle-primitive'

function App() {
  return (
    <Toggle>
      {({ isOn, toggle }) => (
        <button onClick={toggle}>
          {isOn ? 'ON' : 'OFF'}
        </button>
      )}
    </Toggle>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| defaultPressed | boolean | false | Initial toggle state |
| pressed | boolean | - | Controlled toggle state |
| onPressedChange | (pressed: boolean) => void | - | Called when state changes |
| disabled | boolean | false | Whether toggle is disabled |
| children | (state: ToggleState) => ReactNode | - | Render prop function |

## State Object

The render prop receives a state object with:

| Property | Type | Description |
|----------|------|-------------|
| isOn | boolean | Current toggle state |
| toggle | () => void | Toggle the state |
| turnOn | () => void | Set state to true |
| turnOff | () => void | Set state to false |

## Examples

### Basic Toggle
```tsx
<Toggle>
  {({ isOn, toggle }) => (
    <button onClick={toggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  )}
</Toggle>
```

### Controlled Toggle
```tsx
const [pressed, setPressed] = useState(false)

<Toggle pressed={pressed} onPressedChange={setPressed}>
  {({ isOn, toggle }) => (
    <button onClick={toggle}>
      {isOn ? 'Active' : 'Inactive'}
    </button>
  )}
</Toggle>
```

### Custom Switch
```tsx
<Toggle>
  {({ isOn, toggle }) => (
    <div className="flex items-center gap-2">
      <span>Dark Mode</span>
      <button
        onClick={toggle}
        className={`w-12 h-6 rounded-full ${
          isOn ? 'bg-blue-500' : 'bg-gray-300'
        }`}
      >
        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
          isOn ? 'translate-x-7' : 'translate-x-1'
        }`} />
      </button>
    </div>
  )}
</Toggle>
```

### Separate Controls
```tsx
<Toggle>
  {({ isOn, turnOn, turnOff }) => (
    <div className="flex gap-2">
      <button onClick={turnOn} disabled={isOn}>
        Turn On
      </button>
      <span>{isOn ? 'ON' : 'OFF'}</span>
      <button onClick={turnOff} disabled={!isOn}>
        Turn Off
      </button>
    </div>
  )}
</Toggle>
```

## Features

- **Headless**: No styling, complete control over appearance
- **Flexible**: Render prop pattern for maximum flexibility
- **Controlled/Uncontrolled**: Supports both modes
- **TypeScript**: Full type safety
- **Accessible**: Provides state management for accessible toggles
- **Lightweight**: No dependencies except React

This primitive can be used to build switches, toggles, checkboxes, or any binary state component.
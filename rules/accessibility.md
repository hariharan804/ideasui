# Accessibility Rules (WCAG 2.1 AA)

## 🎯 Core Accessibility Principles

### WCAG 2.1 AA Compliance

- All components must meet WCAG 2.1 AA standards
- Color contrast ratio minimum 4.5:1 for normal text
- Color contrast ratio minimum 3:1 for large text
- Support keyboard navigation
- Provide screen reader compatibility

## ⌨️ Keyboard Navigation

### Required Support:

- Tab navigation through interactive elements
- Enter/Space activation for buttons
- Arrow key navigation for lists/menus
- Escape key to close modals/dropdowns
- Focus management for dynamic content

### Implementation:

```tsx
// ✅ Proper keyboard support
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ onKeyDown, ...props }, ref) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Handle activation
    }
    onKeyDown?.(event);
  };

  return <button ref={ref} onKeyDown={handleKeyDown} {...props} />;
});
```

## 🔊 Screen Reader Support

### ARIA Attributes:

- Use semantic HTML elements first
- Add ARIA labels when needed
- Provide ARIA descriptions for complex interactions
- Use ARIA live regions for dynamic updates

### Examples:

```tsx
// ✅ Proper ARIA usage
<button
  aria-label="Close dialog"
  aria-describedby="close-description"
  onClick={onClose}
>
  <X aria-hidden="true" />
</button>
<div id="close-description" className="sr-only">
  Closes the current dialog and returns to the main content
</div>

// ✅ Form labels
<label htmlFor="email">Email Address</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
{hasError && (
  <div id="email-error" role="alert">
    Please enter a valid email address
  </div>
)}
```

## 🎨 Visual Accessibility

### Color & Contrast:

- Never rely on color alone to convey information
- Provide text alternatives for color-coded content
- Use sufficient color contrast ratios
- Support high contrast mode

### Focus Indicators:

```tsx
// ✅ Visible focus indicators
const focusStyles = 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'

<button className={cn(baseStyles, focusStyles)}>
  Click me
</button>
```

## 🏗️ Semantic HTML

### Use Proper Elements:

- `<button>` for actions
- `<a>` for navigation
- `<input>` for form controls
- `<h1>-<h6>` for headings
- `<main>`, `<nav>`, `<aside>` for landmarks

### Examples:

```tsx
// ✅ Semantic structure
<main>
  <h1>Page Title</h1>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
  <section>
    <h2>Section Title</h2>
    <p>Content here...</p>
  </section>
</main>

// ❌ Non-semantic structure
<div>
  <div className="title">Page Title</div>
  <div className="nav">
    <div className="link">Home</div>
    <div className="link">About</div>
  </div>
</div>
```

## 🔄 Dynamic Content

### Live Regions:

```tsx
// ✅ Announce dynamic changes
<div aria-live="polite" aria-atomic="true">
  {status && <p>{status}</p>}
</div>

// ✅ Error announcements
<div role="alert" aria-live="assertive">
  {error && <p>{error}</p>}
</div>
```

### Focus Management:

```tsx
// ✅ Manage focus in modals
const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      {children}
    </div>
  );
};
```

## 📱 Mobile Accessibility

### Touch Targets:

- Minimum 44px × 44px touch targets
- Adequate spacing between interactive elements
- Support for zoom up to 200%

### Examples:

```tsx
// ✅ Adequate touch targets
<button className="min-h-[44px] min-w-[44px] p-2">
  <Icon className="h-6 w-6" />
</button>
```

## 🧪 Testing Requirements

### Automated Testing:

Tools: `@testing-library/jest-dom`, `axe-core`, `@axe-core/playwright`

Test Requirements:

- Check role attributes
- Verify aria-\* props
- Test Tab navigation
- Validate Screen-reader labels

```tsx
// ✅ Accessibility tests (role and state)
it('should have the proper role', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
```

### Manual Testing:

- Test with keyboard only
- Test with screen reader (NVDA, JAWS, VoiceOver)
- Test with high contrast mode
- Test with 200% zoom
- Test with reduced motion preferences

## 📋 Accessibility Checklist

### For Every Component:

- [ ] Semantic HTML elements used
- [ ] Proper ARIA attributes added
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast meets standards
- [ ] Screen reader announces correctly
- [ ] Proper roles and states are used
- [ ] Touch targets are adequate size
- [ ] Works with zoom up to 200%
- [ ] Respects reduced motion preferences

### For Interactive Components:

- [ ] Role and state communicated
- [ ] Keyboard shortcuts documented
- [ ] Focus management implemented
- [ ] Error states announced
- [ ] Loading states communicated
- [ ] Success feedback provided

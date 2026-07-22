# IdeasUI Design Token Rules

> **These rules protect the design system long-term.**  
> If someone breaks one → PR rejected.

---

## 🔒 Locked Rules

### 1. Components may NOT use `space-*` directly

```css
/* ❌ FORBIDDEN */
.button {
  padding: var(--space-4);
}

/* ✅ CORRECT */
.button {
  padding: var(--proximity-default-padding);
}
```

**Why?** Components use semantic spacing. Layout uses raw spacing.

---

### 2. Components may NOT use `shadow-*` directly

```css
/* ❌ FORBIDDEN */
.card {
  box-shadow: var(--shadow-md);
}

/* ✅ CORRECT */
.card {
  box-shadow: var(--elevation-raised-shadow);
}
```

**Why?** `shadow-*` are primitives. `elevation-*` are semantic.

---

### 3. Components may NOT invent motion

```css
/* ❌ FORBIDDEN */
.button {
  transition: 0.3s ease-in-out;
}

/* ✅ CORRECT */
.button {
  transition: var(--transition-fast);
}
```

**Why?** Motion must be coordinated (Gestalt: Common Fate).

---

### 4. Themes may NOT add new token names

Themes can only **override values** of existing tokens.  
Creating new tokens requires design system review.

---

### 5. `ideasui.tokens.css` is read-only output

**Never edit directly.** Source of truth is `ideasui.tokens.json`.

---

### 6. All new tokens must justify a Gestalt law

Before adding a token, answer:

| Question                              | Must Answer                                                            |
| ------------------------------------- | ---------------------------------------------------------------------- |
| Which Gestalt law does it support?    | Similarity, Proximity, Common Fate, Continuity, Closure, Figure/Ground |
| Does it describe meaning or behavior? | Must be meaning                                                        |
| Can an existing token solve this?     | Must justify why not                                                   |

---

### 7. Components may NOT use `--color-*` directly

```css
/* ❌ FORBIDDEN */
.card {
  background: var(--color-white);
}

/* ✅ CORRECT */
.card {
  background: var(--surface-base);
}
```

**Why?** Base colors (`--color-white`, `--color-black`, `--color-transparent`) are primitives. Only **themes** may reference them.

---

### 8. Border token naming convention (LOCKED)

| Token Pattern            | Purpose                                                                |
| ------------------------ | ---------------------------------------------------------------------- |
| `--border-*` (no suffix) | **Width** primitives (`--border-thin`, `--border-medium`)              |
| `--border-color-*`       | **Color** semantics (`--border-color-default`, `--border-color-focus`) |

**Never** create ambiguous `--border-*` tokens that could be width OR color.

---

### 9. Haptic tokens are non-CSS (platform-mapped)

```js
// These are NOT CSS values — they are intent signals
const intensity = getToken('--haptic-medium'); // 20

// Implementation maps to platform APIs
if (Platform.OS === 'ios') {
  Haptics.impactAsync(intensity);
} else {
  Vibration.vibrate(intensity);
}
```

Document this in component APIs that use haptics.

---

## 📋 Token Usage Guidelines

### Spacing: When to use what

| Context                         | Token to Use    |
| ------------------------------- | --------------- |
| Component internal spacing      | `--proximity-*` |
| Layout/page spacing             | `--space-*`     |
| Never mix both in one component | ❌              |

---

### Intent Colors: Default usage

Components should default to:

```css
/* Primary use case */
background: var(--color-primary-base);
color: var(--color-primary-content);
border-color: var(--color-primary-border);
```

**Advanced cases only:**

- `emphasis` → Hover/active states
- `subtle` → Background highlights

---

### Typography: Semantic-first

```css
/* ❌ FORBIDDEN in components */
font-size: var(--font-size-lg);

/* ✅ CORRECT */
font-size: var(--text-label-size);
font-weight: var(--text-label-weight);
```

**Locked semantic text styles:**

- `--text-display-*` → Hero text
- `--text-headline-*` → Section headers
- `--text-title-*` → Card/modal titles
- `--text-body-*` → Content
- `--text-label-*` → Form labels, buttons
- `--text-caption-*` → Helper text

---

## ✅ Quick Reference

| Want to...                 | Use this                    |
| -------------------------- | --------------------------- |
| Add padding to a component | `--proximity-*-padding`     |
| Add shadow to a card       | `--elevation-raised-shadow` |
| Style button text          | `--text-label-*`            |
| Animate a hover            | `--transition-fast`         |
| Show a focus ring          | `--focus-ring-*`            |
| Indicate success           | `--color-success-base`      |
| Stack elements             | `--proximity-*-gap`         |

---

## 🧠 Philosophy

> **Tokens describe meaning.**  
> **Code describes behavior.**

---

### 10. Color scales MUST be duplicated per theme (DO NOT DEDUPE)

```css
/* ⚠️ INTENTIONAL DUPLICATION — DO NOT "FIX" */

:root,
[data-theme='light'] {
  --neutral-50: #fafafa;
  --primary-500: #3b82f6;
  /* ... full scale */
}

[data-theme='dark'] {
  --neutral-50: #fafafa;
  --primary-500: #3b82f6;
  /* ... full scale (can differ per theme) */
}
```

**Why this is NOT duplication:**

1. **Theme isolation** — Each theme owns its palette completely
2. **Future flexibility** — Dark mode may need adjusted hues (warmer blues, etc.)
3. **Testing** — Themes can be tested independently
4. **Specificity** — Theme overrides work correctly

**This is BY DESIGN.** Do not move color scales to `:root`.

Tokens are the _what_. CSS is the _how_.

# IdeasUI Monorepo — `/packages` Developer Guide

This guide explains **what belongs where**, **how to add new code**, and **how to work locally** inside the `lib/packages` workspace. Share this doc with any new contributor.

---

## 1) Package taxonomy (what lives where)

```
packages/
├─ react/                # Aggregator entrypoint: re-exports public API (@ideasui/react)
├─ components/           # One package per fully‑styled UI component
│  ├─ box/               # @ideasui/box
│  └─ button/            # @ideasui/button
├─ primitives/           # Headless, accessible building blocks
│  └─ toggle/            # @ideasui/toggle-primitive
├─ core/
│  ├─ provider/          # Theme/dir/config provider (@ideasui/provider)
│  └─ system/            # Low-level styling system (@ideasui/system)
├─ hooks/                # Cross-cutting React hooks (@ideasui/hooks)
├─ utils/                # Public utilities (@ideasui/utils)
│  └─ shared/            # Internal-only helpers (not published)
├─ icons/                # Icon set as React components (@ideasui/icons)
├─ tokens/               # Design tokens (colors, spacing, radii) (@ideasui/tokens)
├─ themes/
│  ├─ base/              # Base theme definitions (not always published)
│  └─ controller/        # Theme switching logic (@ideasui/theme-controller)
└─ cli/                  # DX tooling/CLIs (@ideasui/cli)
```

> **Rule of thumb**
>
> * **`components/*`** → styled, themable, end‑user components.
> * **`primitives/*`** → headless, accessible logic only (no brand styles).
> * **`core/*`** → engines and global providers.
> * **`react/`** → single import surface for apps: `import { Button } from "@ideasui/react"`.

---

## 2) Naming, versioning & publishing

* Package names are **scoped**: `@ideasui/<name>` (e.g., `@ideasui/button`).
* Use **kebab-case** for package folders and names.
* Versioning via **Changesets** (recommended): create a changeset for any user-facing change.
* Public packages include only built outputs via the `files` field.

**Minimal `package.json` template**

```json
{
  "name": "@ideasui/button",
  "version": "0.0.1",
  "private": false,
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "sideEffects": false,
  "files": ["dist"],
  "scripts": {
    "build": "tsup src/index.ts --dts --format cjs,esm",
    "dev": "tsup src/index.ts --watch",
    "test": "vitest run",
    "lint": "eslint ."
  },
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  }
}
```

---

## 3) Dependency rules (keep layers clean)

* `components/*` may depend on: `@ideasui/system`, `@ideasui/provider`, `@ideasui/tokens`, `@ideasui/hooks`, `@ideasui/utils`, `@ideasui/icons`.
* `primitives/*` may depend on: `@ideasui/hooks`, `@ideasui/utils` (no `system` styles).
* `react/` depends on: all publishable leaf packages (re-exports only).
* `utils/shared` is **internal-only**; never list it as a dependency—import via relative path within the monorepo.
* **No circular deps.** If needed, extract shared bits into `@ideasui/utils` or `@ideasui/system`.

---

## 4) File conventions inside a package

```
packages/components/button/
├─ src/
│  ├─ Button.tsx           # Component implementation
│  ├─ Button.types.ts      # Public types
│  ├─ Button.classes.ts    # Classnames/variants mapping
│  ├─ index.ts             # Local barrel (export * from './Button')
│  └─ __tests__/Button.test.tsx
├─ README.md
├─ package.json
└─ tsconfig.json
```

**Index files**

* Each package: `src/index.ts` → exports the public API of that package.
* Aggregator `@ideasui/react`: `src/index.ts` re-exports from components/primitives/hooks.

**Styling**

* Prefer `@ideasui/system` (variant utilities, slot classes).
* Keep tokens in `@ideasui/tokens` and access via CSS vars or JS exports.

---

## 5) Creating a new **component** package (styled)

**Folder**: `packages/components/<name>` → published as `@ideasui/<name>`.

**Quick scaffold**

```ts
// src/Button.tsx
import * as React from 'react'
import { cx, cva } from '@ideasui/system'
import { useMergedRefs } from '@ideasui/hooks'

const buttonStyles = cva('iui-btn', {
  variants: {
    variant: {
      solid: 'iui-btn--solid',
      outline: 'iui-btn--outline',
      ghost: 'iui-btn--ghost'
    },
    size: {
      sm: 'iui-btn--sm',
      md: 'iui-btn--md',
      lg: 'iui-btn--lg'
    }
  },
  defaultVariants: { variant: 'solid', size: 'md' }
})

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button ref={ref} className={cx(buttonStyles({ variant, size }), className)} {...props} />
    )
  }
)
Button.displayName = 'Button'
```

```ts
// src/index.ts
export * from './Button'
```

**Tests** (`vitest`): `src/__tests__/Button.test.tsx`

**Docs**: add usage in Storybook `apps/storybook`.

---

## 6) Creating a new **primitive** package (headless)

**Goal**: no branded styles, only ARIA/keyboard behavior.

```ts
// src/Toggle.tsx
import * as React from 'react'
import { useControllableState } from '@ideasui/hooks'

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ pressed, defaultPressed, onPressedChange, ...props }, ref) => {
    const [isOn, setIsOn] = useControllableState({ value: pressed, defaultValue: defaultPressed, onChange: onPressedChange })
    return (
      <button
        ref={ref}
        role="switch"
        aria-checked={isOn}
        data-state={isOn ? 'on' : 'off'}
        onClick={() => setIsOn(!isOn)}
        {...props}
      />
    )
  }
)
Toggle.displayName = 'Toggle'
```

```ts
// src/index.ts
export * from './Toggle'
```

Publish as `@ideasui/toggle-primitive`.

---

## 7) Adding a **hook**

Place inside `packages/hooks`.

```ts
// src/useControllableState.ts
import * as React from 'react'

export function useControllableState<T>({ value, defaultValue, onChange }:{ value?: T, defaultValue: T, onChange?: (v:T)=>void }){
  const [state, setState] = React.useState<T>(value ?? defaultValue)
  const isControlled = value !== undefined
  const set = React.useCallback((v: T) => {
    if (!isControlled) setState(v)
    onChange?.(v)
  }, [isControlled, onChange])
  return [isControlled ? (value as T) : state, set] as const
}

// src/index.ts
export * from './useControllableState'
```

---

## 8) `@ideasui/system` (style engine) basics

* Provides: `cva`/`cx` helpers, slot API, and tokens → classnames mapping.
* No React dependency; keeps runtime light.
* Components import from `@ideasui/system` for variants and composition.

Example:

```ts
// src/slot.ts (inside system)
export function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(' ')
}
```

---

## 9) `@ideasui/provider`

* Wraps app with theme, direction (`ltr/rtl`), and config context.

```tsx
// src/IdeasUIProvider.tsx
import * as React from 'react'
import { ThemeController } from '@ideasui/theme-controller'

export function IdeasUIProvider({ children }: { children: React.ReactNode }) {
  return <ThemeController>{children}</ThemeController>
}

export * from './IdeasUIProvider'
```

---

## 10) `@ideasui/react` aggregator

* Single import surface for consumers.
* Re-export from leaf packages (do **not** implement here).

```ts
// packages/react/src/index.ts
export * from '@ideasui/provider'
export * from '@ideasui/button'
export * from '@ideasui/box'
export * from '@ideasui/icons'
export * from '@ideasui/hooks'
// ...and so on
```

---

## 11) Tokens, Themes, Icons

* `@ideasui/tokens`: Export JS + CSS variables for colors, spacing, typography. Keep raw source in JSON/TS; build to ESM/CJS and CSS.
* `themes/base`: primitive theme maps; no runtime switching.
* `@ideasui/theme-controller`: handles system/theme switching + persistence (e.g., `class` or `data-theme` strategy).
* `@ideasui/icons`: React components generated from SVGs (use a build script to convert `/svg/*.svg` → React).

---

## 12) Local development workflow

Assuming **pnpm + Turborepo**:

```bash
# install
pnpm i

# build everything once
pnpm build

# dev watch (recommended during component work)
pnpm -w dev

# run storybook for docs/examples
pnpm -w storybook

# test all
pnpm -w test

# lint all
pnpm -w lint
```

Per package, you can also run inside its folder:

```bash
pnpm dev
pnpm build
```

Linking in the playground app happens automatically via workspace protocol (`workspace:*`).

---

## 13) Testing & visual regression

* Unit tests: `vitest + @testing-library/react` in each package under `src/__tests__`.
* Visual tests: Playwright in `tests/` at repo root, pointing to Storybook stories.

---

## 14) Documentation (Storybook)

* Each component provides a `*.stories.mdx|tsx` under `apps/storybook/stories` or colocated in its package (preferred: colocate and auto-register).
* Include: usage, props table (TS), accessibility notes, and theming examples.

---

## 15) Releases & publishing

* Create/modify changesets → version bump + changelog.
* CI runs: build → test → publish to npm with provenance.
* Scoped public packages require `npm publish --access public` (handled in CI). Ensure `files` only includes `dist`.

---

## 16) Code review checklist (per PR)

* [ ] Public API exported from `src/index.ts`
* [ ] No breaking changes without a changeset
* [ ] No direct imports from `utils/shared`
* [ ] A11y: keyboard + ARIA covered; tests added
* [ ] Theming: respects `@ideasui/provider` context
* [ ] Storybook story added/updated
* [ ] Tree-shakeable (no side effects, proper `module`/`exports`)

---

## 17) FAQ

**Q: Should I start in `components` or `primitives`?**
Start with a primitive if you’re building raw behavior; build a styled component on top in `components`.

**Q: Where do I put one-off helpers?**
If they’re reusable, add to `@ideasui/utils`. If truly internal to one package, keep them local.

**Q: How do I expose a new component via `@ideasui/react`?**
Export from the leaf package, then add a re-export in `packages/react/src/index.ts`.

**Q: How do I integrate Tailwind tokens?**
Expose CSS variables from `@ideasui/tokens`. In the consumer app’s Tailwind config, map tokens to theme values or consume CSS vars directly in classes.

---

## 18) Example commit sequence for a new component

```bash
# 1) scaffold
cp -R packages/components/button packages/components/badge
# or use templates/ generator

# 2) implement + tests
pnpm -w dev
pnpm -w test

# 3) export via aggregator
# add `export * from '@ideasui/badge'` in packages/react/src/index.ts

# 4) storybook preview
pnpm -w storybook

# 5) changeset + PR
pnpm changeset
```

---

**That’s it.** This structure keeps layers strict and contributions predictable, so new devs can ship confidently without breaking the design system.

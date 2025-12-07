@ideasui/variants

Headless Tailwind Variants recipes for a modern React design system.
Pure TypeScript. No React. No CSS. Treeshakable.

⚙️ Pure recipes (tailwind-variants) — framework-agnostic

🎨 Themeable via CSS variables (works with any tokens file)

🧩 Composable: consistent size, variant, intent, radius across components

🧪 Typed variant props (ButtonVariantProps, etc.)

📦 Tiny: zero runtime styling libs, no CSS output

Install
pnpm add @ideasui/variants tailwind-variants
# or
npm i @ideasui/variants tailwind-variants


tailwind-variants is a peer dependency so apps control the version.


Versioning & releases

Use Changesets in the monorepo to version this package alongside others.

Treat changes to scales/variant names as breaking (SemVer major).

Add new variants non-breaking; change defaults cautiously.

Contributing

Add new recipes as *.ts files.

Share scales in system.ts.

Keep tests simple: assert output includes expected classes for given variant combos.

License

MIT © ideas2logic
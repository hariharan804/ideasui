# @ideasui/theme Changelog

## 0.0.5-beta.0

### Patch Changes

- Beta version package publishing

## 0.0.3

### Patch Changes

- update peer dependencies to include react and move tailwind-variants to dependencies

## [0.0.2] - 2026-03-08

### Changed

- **Huge Size Reduction**: Completely dropped CommonJS (CJS) support. The package now only ships standard ESM.
- Enabled aggressive Rollup tree-shaking and chunk-splitting out of the box.

## [0.0.1] - 2026-03-08

### Added

- Initial release of the `@ideasui/theme` package.
- Tailwind CSS v4 integration.
- Semantic, primitive, surface, and content OKLCH color palettes with automatic CSS variable generation.
- Responsive breakpoints, z-index scaling, blur, animation, and spacing token sets.
- Typography constants (fonts, weights, sizes).
- First-class plugin support with `ideasUIPlugin()`.

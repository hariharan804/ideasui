# Icons Package Roadmap

## Current Status: MVP Ready (8 icons)

### Phase 1: Core Icons (✅ Complete)

- ChevronDown, ChevronUp, Check, X, Search, Eye, EyeOff, Loader

### Phase 2: Essential UI Icons (Next 20)

- ArrowLeft, ArrowRight, ArrowUp, ArrowDown
- Plus, Minus, Edit, Delete, Settings
- Home, User, Mail, Phone, Calendar
- Heart, Star, Share, Download, Upload

### Phase 3: Extended Set (50+ icons)

- Navigation, Actions, Objects, Communication
- Media, Files, Weather, Social

### Phase 4: Complete Library (300+ icons)

- Industry-specific icons
- Brand icons
- Advanced UI elements

## Technical Strategy

### Icon Generation Pipeline

1. **Source**: Lucide compatible SVGs
2. **Processing**: Automated component generation
3. **Optimization**: SVGO optimization
4. **Bundling**: Tree-shakeable exports

### Package Structure (300+ icons)

```
@ideasui/icons/
├── core/           # Essential 20 icons
├── ui/             # UI-specific icons
├── media/          # Media icons
├── social/         # Social platform icons
├── brand/          # Brand icons
└── industry/       # Industry-specific
```

### Bundle Size Strategy

- **Core package**: ~5KB (20 essential icons)
- **Full package**: ~50KB (300+ icons)
- **Tree-shaking**: Import only what you use
- **Sub-packages**: Category-based imports

## Implementation Plan

### Automated Generation

```bash
# CLI for adding icons
npm run icons:add <svg-file>
npm run icons:generate-batch <folder>
npm run icons:optimize
```

### API Design (300+ icons)

```tsx
// Category imports
import { ChevronDown } from '@ideasui/icons/ui';
import { Facebook } from '@ideasui/icons/social';
import { Camera } from '@ideasui/icons/media';

// Or full import (tree-shakeable)
import { ChevronDown, Facebook, Camera } from '@ideasui/icons';
```

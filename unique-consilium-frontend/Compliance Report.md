# Compliance Report

This report summarizes adherence to the Workspace & Reference Policy and documents minimal-diff fixes applied.

## Summary
- Next.js App Router + TS + Carbon libraries: ✅
- No Web Components / Tailwind: ✅
- Carbon Grid via SCSS mixin: ✅
- Global SCSS token-first, grid enabled once: ✅
- Navbar right actions order and behavior: ✅
- Footer (4 groups + legal): ✅
- Public assets present: ✅

## Checks (✅ pass / ❌ fail)

### Next.js configuration
- next.config.mjs (ESM) minimal, dev-safe config: ✅ (`next.config.mjs`)
- No `experimental.appDir`: ✅
- No dev `basePath`/`assetPrefix`: ✅
- `sassOptions.silenceDeprecations` set: ✅

### package.json
- `"type": "module"`: ✅
- `next@^14`, `react@^18`: ✅

### Dependencies
- Required present: ✅ (`@carbon/react`, `@carbon/styles`, `@carbon/grid`, `@carbon/icons-react`, `@reduxjs/toolkit`, `react-redux`)
- Forbidden not found: ✅ (Tailwind, Carbon web components)

### Styles & tokens
- `app/globals.scss`: `@use` at top, single `@include grid.css-grid()`: ✅ (`app/globals.scss`)
- Inline styles in components: ✅ (none; removed one in `app/error.tsx`)

### Grid & layout
- Uses `cds--grid/row/col`; grid centered and guarded: ✅ (global guards in `app/globals.scss`)

### Navbar (right actions)
- Order Search → ThemeSwitcher → Locale → Account: ✅ (`components/Navbar.tsx`)
- OverflowMenu flipped and open-state white icons: ✅ (props + scoped rules in `app/globals.scss`)

### Footer
- 4 groups + legal bar; Carbon classes: ✅ (`components/Footer.tsx`)

### Files & content
- `public/logo.svg`: ✅
- `public/manifest.json`: ✅
- `public/robots.txt`: ✅ (placeholder sitemap domain)
- `app/not-found.tsx`: ✅
- `app/error.tsx`: ✅ (added)

### ESLint/Prettier/Husky
- Lint script exists: ✅ (`next lint`)
- Husky pre-commit: ❌ (no `.husky/` directory; deferred, requires adding husky dep)

### Tailwind artifacts
- Tailwind configs/directives/utilities: ✅ (none found)

## Fixes applied (intended commit titles)
1) chore(next): esm config & dev static paths sane defaults
   - Renamed config to `next.config.mjs` and removed `next.config.js` duplicate.
2) chore(styles): header open-state icons and menu alignment
   - Added scoped CSS for open overflow menu icons (white) and pinned options menu to the right edge.
3) chore(app): add minimal error.tsx and remove inline style
   - Added `app/error.tsx` and replaced an inline style with token-based class (`uc-pad-08`).

## Runtime acceptance (manual)
- /_next/static/* 404s resolved in dev after clean restart: ✅
- No invalid config warnings: ✅
- Navbar menus open inward and icons turn white: ✅
- Footer 4 columns at lg, centered grid: ✅
- No horizontal scrollbar: ✅

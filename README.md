# Abhay Portfolio

Personal portfolio for Abhay Sonone. The app currently contains a responsive Navbar and Hero. Other portfolio sections will be added later.

## Development

- `npm install` — install dependencies
- `npm run dev` — start Vite
- `npm run build` — type-check and build for production
- `npm run lint` — run Oxlint
- `npm run preview` — serve the production build locally

## Design system

Tailwind CSS 4 uses the official `@tailwindcss/vite` plugin. Theme tokens and global styles live in `src/index.css`; no legacy Tailwind configuration is needed.

Use semantic utilities such as `bg-background`, `bg-surface`, `bg-card`, `bg-elevated`, `text-foreground`, and `text-secondary`. The requested muted color is available as `text-muted`, but reserve it for decorative or nonessential details because its contrast is lower. Prefer secondary text for readable supporting copy.

The font stack prefers Inter, then system sans-serif fonts. Inter is not downloaded or bundled. Layout uses a centered 1280px maximum container, fluid horizontal padding, and consistent responsive section spacing.

## Components

- `components/layout/SectionContainer.tsx`: semantic section with shared container and spacing. Give each section a heading and connect it using `aria-labelledby`.
- `components/ui/SectionHeading.tsx`: level-two heading with an optional description.
- `components/ui/GradientText.tsx`: inline accent text; best reserved for large decorative headings.
- `components/ui/Button.tsx`: native button with primary/secondary variants; supports native props including `disabled`, `onClick`, and `type`. Defaults to `type="button"`.
- `components/ui/Badge.tsx`: small, noninteractive label.
- `components/ui/Card.tsx`: static surface by default; opt into hover styling with `hoverable`. Hover styling does not make a card interactive; use a native link or button for actions.

Components accept `className` and native element props. Add future portfolio sections under `src/components` as needed. Hero CTAs point to future project/contact sections. Add personal image files using `public/images/README.md` and configure social destinations in `src/data/portfolio.ts`.

Global styles include visible keyboard focus, reduced-motion support, dark scrollbars, selection styling, and forced-colors fallbacks. Future Framer Motion animations should also respect the user's reduced-motion preference.

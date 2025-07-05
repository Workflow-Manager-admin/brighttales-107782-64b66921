# BrightTales - Playful Storybook Frontend

This project is a playful, mobile-friendly React app for reading animated children’s stories, built with Tailwind, custom SVG/illustrations, and a gentle pastel + vibrant accent color palette.

## Features

- Delightful pastel backgrounds with soft accent gradients and floating "clouds"
- **Google Fonts**: Fredoka One, Baloo 2, Comic Neue — round, friendly display and body fonts
- Animated SVG characters and buttons (bouncy, wiggly, pulsating, glowing, waving, etc.)
- Full-screen, floating rounded story cards with a minimal, uncluttered layout
- Large tap targets (≥48x48px), responsive text scaling, and swipe navigation for mobile
- Floating Home button (top-left, house icon) and progress toast
- Progress bar ("Page 1 of N")
- Speech bubble text for story content
- Navigation with animated large next/prev arrows at corners, with playful motion on tap/hover/focus
- Supabase-provided in-app progress saving (auto-save + toast alert)
- All interactivity implements accessible ARIA/keyboard support

## Color Palette

- `primary` – Pastel Yellow (`#FFBB00`)
- `secondary` – Turquoise (`#2EC4B6`)
- `accent` – Vibrant Pink/Red (`#E71D36`)
- `storybg` – Very light warm yellow (`#FFFBEA`)

See `tailwind.config.js` for full palette and animation, or `src/index.css` for font usage.

## Fonts

All fonts are loaded via Google Fonts. See `src/index.css` for the import lines. Fonts used:
- [Fredoka One](https://fonts.google.com/specimen/Fredoka+One)
- [Baloo 2](https://fonts.google.com/specimen/Baloo+2)
- [Comic Neue](https://fonts.google.com/specimen/Comic+Neue)

## Mobile-Friendly

The layout, buttons, tap targets, and scaling are designed first for mobile use. All interactive elements are at least 48x48px.

## Animation

Character and button motion is handled with custom Tailwind keyframes (see `tailwind.config.js`). If you need to add new styles or SVGs, follow the playful, simple illustration style.

## Development

```
npm install
npm start
```
Visit [http://localhost:3000](http://localhost:3000)

## Story Data

Add new chapters in `src/App.js` with appropriate SVG assets for maximally vivid, child-friendly visual storytelling!


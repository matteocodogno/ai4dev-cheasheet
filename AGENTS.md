# AI4Dev cheatsheet

Interactive bilingual (IT/EN) field manual for the AI4Dev course. Static React SPA, deployed on Cloudflare Pages.

## Commands

- `pnpm dev`: dev server on http://localhost:5173
- `pnpm check`: typecheck + lint + format check + tests. Run before every commit.
- `pnpm build`: production build into `dist/`
- `pnpm storybook`: component library on http://localhost:6006
- `pnpm cf:deploy`: build and deploy to Cloudflare Pages (`ai4dev-cheatsheet`)

## Architecture

- `src/ui/`: presentational component library (one folder per component: `.tsx`, `.module.css`, `.stories.tsx`). Import via `@/ui`. No feature knowledge here.
- `src/features/<mission>/`: one folder per mission. `content.ts` holds all copy (IT + EN), `hooks/` the logic, `components/` the rendering.
- `src/features/missions/registry.ts`: mission order, titles, rarity, accent. `Missions.tsx` must list missions in the same order.
- `src/i18n/`: `LangProvider`, `useT()` resolves `{ it, en }` values. Interface strings shared across features live in `ui.ts`.
- `src/styles/tokens.css`: every colour, font and shadow. Use tokens, never hex values in components (exception: data colours in `content.ts`).

## Conventions

- `type`, never `interface`. Arrow functions only. One component per file, one hook per file in a `hooks/` folder.
- Logic in hooks; components only render.
- All user-visible text lives in `content.ts` files as `{ it, en }`. Never hardcode a string in JSX. Content strings support `**bold**`, `` `code` ``, `_marker_`, `[[kbd]]` via `<RichText>`.
- CSS Modules scope `@keyframes`: define keyframes in the same module that uses them.
- Respect `prefers-reduced-motion`: use `useReducedMotion()` for JS animations.
- Copy rule: no em dashes in content.

## Adding a mission

1. Add an entry to `MISSIONS` in `src/features/missions/registry.ts`.
2. Create `src/features/<id>/content.ts` exporting a `MissionCopy` plus any data.
3. Create `src/features/<id>/components/<Name>Mission.tsx` wrapping `<Mission id copy>`.
4. Add it to `Missions.tsx` in the same position as in the registry.

## Don't

- Don't add a state library or a router: React Context is enough for this app.
- Don't load fonts from Google: they are self-hosted via `@fontsource`.
- Don't edit `legacy/index.html`: it is the original single-file version, kept for reference.

# AI4Dev Field Manual

Interactive cheatsheet for the AI4Dev course: nineteen "missions" from what an LLM is to code review in the agent era, each closing with Dos and Don'ts. Italian and English, comic cel-shaded style, animated.

## Stack

| Concern         | Choice                                                   |
| --------------- | -------------------------------------------------------- |
| Package manager | pnpm (pinned in `package.json` and `mise.toml`)          |
| Build           | Vite                                                     |
| UI              | React 19 + TypeScript (strict)                           |
| Styling         | CSS Modules + design tokens (`src/styles/tokens.css`)    |
| Components      | In-house library in `src/ui`, documented with Storybook  |
| i18n            | React Context, typed `{ it, en }` content                |
| Fonts           | Self-hosted with `@fontsource` (no Google requests)      |
| Tests           | Vitest + Testing Library                                 |
| Quality         | ESLint (typescript-eslint, react-hooks), Prettier, husky |
| Hosting         | Cloudflare Pages                                         |

## Getting started

```bash
mise install          # or: install Node 22 and pnpm yourself
pnpm install
pnpm dev              # http://localhost:5173
```

Useful commands:

```bash
pnpm check            # typecheck, lint, format, tests
pnpm storybook        # component library on http://localhost:6006
pnpm build            # production build in dist/
pnpm cf:deploy        # build + deploy to Cloudflare Pages
```

Link to a language directly with `?lang=it` or `?lang=en`. Otherwise the page follows the browser language and remembers the last choice.

## Project layout

```
src/
  ui/                 component library (Panel, Button, Chip, DoDont, Terminal, MissionSection...)
  i18n/               LangProvider, useT, shared interface strings
  shared/             cross-feature hooks and pure utilities
  features/
    missions/         registry (order, titles, rarity) and the generic Mission wrapper
    hud/ hero/ effects/ progress/
    infra/ llm/ tokens/ weights/ ollama/ context/ arsenal/
    agentsmd/ loop/ sandbox/ safety/ worktree/ sdd/
legacy/index.html     the original single-file version
```

Each mission folder has `content.ts` (all IT/EN copy and data), `hooks/` (logic) and `components/` (rendering). To edit text, you only touch `content.ts`.

## Deploy

**Manual:** `pnpm cf:deploy` (needs `npx wrangler login` once).

**Automatic on push:** in the Cloudflare dashboard, connect the GitHub repo to the `ai4dev-cheatsheet` Pages project with:

- Build command: `pnpm build`
- Build output directory: `dist`
- Environment variable: `NODE_VERSION=22`

CI on GitHub Actions (`.github/workflows/ci.yml`) runs `pnpm check`, the build and the Storybook build on every push and PR.

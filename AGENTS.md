# Repository Guidelines

## Project Structure & Module Organization
- `src/app/`: Next.js App Router pages, layouts, and routes (`blog`, `cookies`, `sitemap.xml`).
- `src/components/`: Reusable UI components (cards, header/footer, analytics, contact form wrappers).
- `src/utils/`, `src/hooks/`, `src/context/`, `src/types/`: Shared logic, hooks, providers, and types.
- `src/content/posts/`: Blog content in Markdown with frontmatter metadata.
- `public/`: Static files and blog/media assets.
- `functions/`: Firebase Cloud Functions project (TypeScript -> `lib/`).
- `scripts/`: Utility scripts (`cleanup.sh`, token helpers).

## Build, Test, and Development Commands
- `npm run dev`: Start local Next.js dev server with Turbopack.
- `npm run build`: Create production build and static export output.
- `npm run start`: Serve the exported `out/` directory locally.
- `npm run lint`: Run ESLint with `--max-warnings=0` (must pass cleanly).
- `npm run clean` / `npm run clean:firebase`: Clean generated artifacts.
- `npm run functions:build`: Build Firebase Functions TypeScript.
- `cd functions && npm run serve`: Run Functions emulator locally.

## Coding Style & Naming Conventions
- Language: TypeScript + React (strict mode enabled).
- Formatting style in repo: 2-space indentation, semicolons, double quotes.
- Components/files: `PascalCase` (example: `ProjectCard.tsx`).
- Hooks/utilities: `camelCase` (example: `useAnalytics.ts`, `posts.ts`).
- Prefer alias imports from `@/*` for app source paths.
- Linting: root `eslint.config.mjs` (Next.js config) and `functions` ESLint setup.

## Testing Guidelines
- No automated test suite is currently configured in root or `functions/`.
- Minimum quality gate: `npm run lint` and successful production build.
- For UI/content changes, manually verify key routes (`/`, `/blog`, blog post pages, `/cookies`).
- If adding tests, use `*.test.ts` / `*.test.tsx` naming and place near source or under `src/__tests__/`.

## Commit & Pull Request Guidelines
- Follow Conventional Commit style used in history: `feat:`, `fix:`, `chore(deps):`.
- Keep commits focused and descriptive (example: `fix: correct sitemap route metadata`).
- PRs should include:
  - Clear summary and scope.
  - Linked issue/task when applicable.
  - Screenshots/GIFs for UI updates.
  - Notes on config/env changes (use `env.local.example` as reference).

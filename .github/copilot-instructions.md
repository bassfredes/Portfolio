# GitHub Copilot Custom Instructions

## 1. Coding Standards

- **Language & Frameworks**:
  - Use **TypeScript** for all code. Ensure `strict` mode compliance as per `tsconfig.json`.
  - Use **Next.js 16** with the **App Router** (`src/app`) for all frontend pages and layouts.
  - Use **React 19** Functional Components with Hooks.
  - Use **Tailwind CSS 4** for styling. Avoid inline styles or CSS modules unless absolutely necessary.

- **Component Structure**:
  - Define props using `interface` (e.g., `interface BlogCardProps`).
  - Use named exports for components: `export default function ComponentName({ prop }: Props)`.
  - Keep components small and focused. Extract logic into custom hooks (`src/hooks`) or utility functions (`src/utils`).

- **Data Validation**:
  - Use **Zod** for all schema validation, especially for API routes and form inputs.
  - Always validate `req.body` and `req.query` in API routes.

- **Imports**:
  - Use absolute imports with `@/` alias where possible (e.g., `import { PostData } from '@/utils/posts'`).
  - Group imports: External libraries first, then internal components, then utils/types.

## 2. Project Architecture

- **Directory Structure**:
  - `src/app`: App Router pages, layouts, and route handlers.
  - `src/pages/api`: API routes (Legacy/Hybrid support).
  - `src/components`: Reusable UI components.
  - `src/utils`: Shared utility functions (business logic, formatting).
  - `src/hooks`: Custom React hooks.
  - `src/types`: Global TypeScript type definitions.
  - `src/content`: Markdown/MDX content files.

- **Routing**:
  - Use `page.tsx` for routes in `src/app`.
  - Use `[slug]/page.tsx` for dynamic routes.
  - Use `layout.tsx` for shared page structures.

## 3. Naming Conventions

- **Files & Folders**:
  - **Components**: `PascalCase.tsx` (e.g., `BlogCard.tsx`, `ContactForm.tsx`).
  - **Utilities/Hooks**: `camelCase.ts` or `kebab-case.ts` (e.g., `useAnalytics.ts`, `posts.ts`).
  - **App Routes**: `kebab-case` folders (e.g., `blog/`, `contact/`).
  - **API Routes**: `kebab-case.ts` (e.g., `contact.ts`).

- **Code Identifiers**:
  - **Components**: `PascalCase` (e.g., `function BlogCard`).
  - **Interfaces/Types**: `PascalCase` (e.g., `interface PostData`).
  - **Variables/Functions**: `camelCase` (e.g., `getSortedPostsData`, `sanitizeSlug`).
  - **Constants**: `UPPER_CASE` for global constants, `camelCase` for local.

## 4. Test Strategy

- **Current Status**: No automated testing framework is currently configured.
- **Guidelines**:
  - Focus on writing **testable code** (pure functions, separated logic).
  - Rely on **ESLint** (`npm run lint`) and **TypeScript** compilation for static analysis.
  - Manually verify critical flows (Contact Form, Blog Rendering).
  - *Future*: Recommend installing Vitest or Jest for unit testing utils and components.

## 5. Security Rules

- **Input Handling**:
  - **NEVER** trust user input. Validate everything with **Zod**.
  - Sanitize all HTML inputs to prevent XSS. Use helper functions like `escapeHtml` or `sanitizeSlug`.
  - Sanitize email headers to prevent Header Injection (`sanitizeHeaderField`).

- **Bot Protection**:
  - Implement **reCAPTCHA v3** on all public forms.
  - Use **Honeypot fields** (hidden inputs) to trap bots.
  - Implement **Timing checks** (reject submissions that are too fast).

- **Rate Limiting**:
  - Use **Upstash Redis** for production rate limiting.
  - Implement in-memory fallback for development or Redis failure.
  - Hash IP addresses before logging or storing to protect user privacy.

## 6. Performance Rules

- **Images**:
  - Always use `next/image`.
  - Define `sizes` prop for responsive images.
  - Use `priority` for LCP (Largest Contentful Paint) images (e.g., hero section).

- **Scripts**:
  - Use `next/script` for third-party scripts (Analytics, GTM).
  - Use `strategy="afterInteractive"` or `strategy="lazyOnload"` to avoid# GitHub Copilot Custom Instructions

## 1. Coding Standards

- **Language & Frameworks**:
  - Use **TypeScript** for all code. Ensure `strict` mode compliance as per `tsconfig.json`.
  - Use **Next.js 16** with the **App Router** (`src/app`) for all frontend pages and layouts.
  - Use **React 19** Functional Components with Hooks.
  - Use **Tailwind CSS 4** for styling. Avoid inline styles or CSS modules unless absolutely necessary.

- **Component Structure**:
  - Define props using `interface` (e.g., `interface BlogCardProps`).
  - Use named exports for components: `export default function ComponentName({ prop }: Props)`.
  - Keep components small and focused. Extract logic into custom hooks (`src/hooks`) or utility functions (`src/utils`).

- **Data Validation**:
  - Use **Zod** for all schema validation, especially for API routes and form inputs.
  - Always validate `req.body` and `req.query` in API routes.

- **Imports**:
  - Use absolute imports with `@/` alias where possible (e.g., `import { PostData } from '@/utils/posts'`).
  - Group imports: External libraries first, then internal components, then utils/types.

## 2. Project Architecture

- **Directory Structure**:
  - `src/app`: App Router pages, layouts, and route handlers.
  - `src/pages/api`: API routes (Legacy/Hybrid support).
  - `src/components`: Reusable UI components.
  - `src/utils`: Shared utility functions (business logic, formatting).
  - `src/hooks`: Custom React hooks.
  - `src/types`: Global TypeScript type definitions.
  - `src/content`: Markdown/MDX content files.

- **Routing**:
  - Use `page.tsx` for routes in `src/app`.
  - Use `[slug]/page.tsx` for dynamic routes.
  - Use `layout.tsx` for shared page structures.

## 3. Naming Conventions

- **Files & Folders**:
  - **Components**: `PascalCase.tsx` (e.g., `BlogCard.tsx`, `ContactForm.tsx`).
  - **Utilities/Hooks**: `camelCase.ts` or `kebab-case.ts` (e.g., `useAnalytics.ts`, `posts.ts`).
  - **App Routes**: `kebab-case` folders (e.g., `blog/`, `contact/`).
  - **API Routes**: `kebab-case.ts` (e.g., `contact.ts`).

- **Code Identifiers**:
  - **Components**: `PascalCase` (e.g., `function BlogCard`).
  - **Interfaces/Types**: `PascalCase` (e.g., `interface PostData`).
  - **Variables/Functions**: `camelCase` (e.g., `getSortedPostsData`, `sanitizeSlug`).
  - **Constants**: `UPPER_CASE` for global constants, `camelCase` for local.

## 4. Test Strategy

- **Current Status**: No automated testing framework is currently configured.
- **Guidelines**:
  - Focus on writing **testable code** (pure functions, separated logic).
  - Rely on **ESLint** (`npm run lint`) and **TypeScript** compilation for static analysis.
  - Manually verify critical flows (Contact Form, Blog Rendering).
  - *Future*: Recommend installing Vitest or Jest for unit testing utils and components.

## 5. Security Rules

- **Input Handling**:
  - **NEVER** trust user input. Validate everything with **Zod**.
  - Sanitize all HTML inputs to prevent XSS. Use helper functions like `escapeHtml` or `sanitizeSlug`.
  - Sanitize email headers to prevent Header Injection (`sanitizeHeaderField`).

- **Bot Protection**:
  - Implement **reCAPTCHA v3** on all public forms.
  - Use **Honeypot fields** (hidden inputs) to trap bots.
  - Implement **Timing checks** (reject submissions that are too fast).

- **Rate Limiting**:
  - Use **Upstash Redis** for production rate limiting.
  - Implement in-memory fallback for development or Redis failure.
  - Hash IP addresses before logging or storing to protect user privacy.

## 6. Performance Rules

- **Images**:
  - Always use `next/image`.
  - Define `sizes` prop for responsive images.
  - Use `priority` for LCP (Largest Contentful Paint) images (e.g., hero section).

- **Scripts**:
  - Use `next/script` for third-party scripts (Analytics, GTM).
  - Use `strategy="afterInteractive"` or `strategy="lazyOnload"` to avoid blocking the main thread.

General:
Use next/link for client-side navigation.
Minimize client-side JavaScript by using Server Components where possible (in app).

## 7. Git Workflow

- **Commit Messages**:
  - Follow **Conventional Commits** standard: `type(scope): subject`.
  - **Types**:
    - `feat`: A new feature.
    - `fix`: A bug fix.
    - `docs`: Documentation only changes.
    - `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
    - `refactor`: A code change that neither fixes a bug nor adds a feature.
    - `perf`: A code change that improves performance.
    - `test`: Adding missing tests or correcting existing tests.
    - `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
    - `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).
    - `chore`: Other changes that don't modify src or test files.
    - `revert`: Reverts a previous commit.
  - **Scope**: Optional, but recommended (e.g., `auth`, `blog`, `ui`).
  - **Subject**: Imperative mood, no period at the end (e.g., "add contact form validation").

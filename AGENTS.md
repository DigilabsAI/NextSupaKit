# AGENTS.md — Next.js + Supabase Starter

## Commands

- `pnpm dev` — dev server (localhost:3000)
- `pnpm build` — production build
- `pnpm lint` — ESLint (`next/core-web-vitals` + `next/typescript`)
- `pnpm test` — Vitest (jsdom env)
- Package manager: **pnpm** (lockfile is `pnpm-lock.yaml`)

## Setup

1. Copy `.env.example` → `.env` and fill `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
2. `pnpm install`
3. `pnpm dev`

Without Supabase env vars the proxy skips auth checks (`lib/utils.ts:hasEnvVars`), so all routes become publicly accessible.

## Architecture

**Framework:** Next.js App Router (React 19, TypeScript strict)
**Backend:** Supabase (Auth + Postgres). Cookie-based sessions via `@supabase/ssr`.
**UI:** shadcn/ui (new-york style), Tailwind CSS v3, Lucide icons, next-themes
**State:** Zustand (`store/`)
**Validation:** Zod v4 (`lib/zod-schema/`)
**Forms:** react-hook-form + @hookform/resolvers

### Route boundaries

| Route group   | Path                                                   | Purpose                                                |
| ------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| `(marketing)` | `/`                                                    | Public landing page                                    |
| `auth`        | `/auth/*`                                              | Login, sign-up, forgot/update password, confirm, error |
| `(system)`    | `/dashboard`, `/admin`, `/items`, `/logs`, `/settings` | Protected app area with sidebar layout                 |

The `(system)` route group shares a layout (`app/(system)/layout.tsx`) that wraps everything in a `SidebarProvider` with `AppSidebar`, header breadcrumb, and theme switcher.

### Auth flow

- **Proxy** (`proxy.ts`) runs on every non-static request. It calls `supabase.auth.getClaims()` to refresh the session and redirects unauthenticated users to `/auth/login` (except `/` and `/auth/*` paths).
- **Server client** (`lib/supabase/server.ts`) — create fresh per-call; never globalize (Supabase Fluid compute). Uses `cookies()` from `next/headers`.
- **Browser client** (`lib/supabase/client.ts`) — for client components only.
- **Session provider** (`components/auth/SessisonProvider.tsx`) — note the typo in filename.

### Data layer

- Server actions in `lib/actions/` (`admin.ts`, `item.ts`, `profile.ts`, `session.ts`) handle all mutations.
- Zod schemas in `lib/zod-schema/` mirror the data models (`item.ts`, `profile.ts`).
- Use server actions for all data access — validate inputs with Zod.

### Key conventions

- Path alias: `@/*` maps to project root (`tsconfig.json`)
- `cn()` utility in `lib/utils.ts` for Tailwind class merging
- Components follow shadcn structure: `components/ui/` for primitives, `components/system/` for app shell, `components/marketing/` for public pages, `components/auth/` for auth UI
- Remote images allowed from the configured Supabase storage bucket (`next.config.ts`)

## Testing

- Vitest with jsdom environment, React plugin, and tsconfig paths
- Run single test: `pnpm test <file-pattern>`
- `@testing-library/react` and `@testing-library/dom` available

## Gotchas

- The Supabase server client must be created fresh each call — do not hoist to module scope (comment in `lib/supabase/server.ts`)
- If modifying the proxy, always return the `supabaseResponse` object as-is or manually copy cookies back (see comments in `lib/supabase/proxy.ts`)
- `components.json` has multiple external shadcn registries configured — new components can be pulled from them

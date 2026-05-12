# AI Project Quick Reference

## Project Name

SaaSify Next Starter Kit (Next.js SaaS Boilerplate)

## Purpose

A modern, production-ready SaaS starter kit for rapid development of SaaS products, admin dashboards, and internal tools using Next.js, Supabase, and Tailwind CSS.

## Core Features

- Next.js App Router structure
- Supabase authentication (email/password)
- User profile & preferences management
- Admin dashboard, items, logs, and settings
- Modular, reusable component system
- Zod schema validation
- State management (context provider)
- TypeScript, Tailwind CSS, ESLint, Vitest

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, TypeScript
- **Backend:** Supabase (Postgres, Auth)
- **State:** Zustand or React Context (store/)
- **Testing:** Vitest
- **Linting:** ESLint

## Folder Structure (Key Folders)

- `app/` — Next.js routes (marketing, system, auth)
- `components/` — Reusable UI and feature components
- `hooks/` — Custom React hooks
- `lib/` — Server actions, utilities, Supabase, Zod schemas
- `store/` — State management
- `public/` — Static assets

## Important Files

- `next.config.ts` — Next.js config
- `tailwind.config.ts` — Tailwind CSS config
- `package.json` — Dependencies & scripts
- `.env.example` — Required environment variables

## Data & Auth Flow

- Auth via Supabase (email/password)
- User, profile, item, and log tables (Postgres)
- Zod schemas for validation
- Server actions in `lib/actions/` for business logic
- Protected routes under `app/(system)/`

## Customization

- Theme: `tailwind.config.ts`, global styles
- Branding: `components/marketing/logo.tsx`
- Sidebar: `components/system/app-sidebar.tsx`
- Add modules: new folders under `app/(system)/`

## Onboarding

- Install: `pnpm install`
- Env: Copy `.env.example` → `.env`, fill Supabase keys
- Run: `pnpm dev`

## Best Practices

- Use server actions for all data access
- Validate all input with Zod
- Enforce RLS in Supabase
- Keep components modular and typed

## Quick Links

- [README.md](README.md)
- [app/](app/)
- [components/](components/)
- [lib/](lib/)
- [store/](store/)

---

This file is intended for AI agents and developers to quickly understand the project structure, tech stack, and essential patterns for effective onboarding and automation.

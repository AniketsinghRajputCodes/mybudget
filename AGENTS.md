<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

# AGENT.md

## Project
Multi-user expense/income tracker. Installable PWA (Next.js), works on phone and desktop.
Each user has a private account with their own transactions — no shared/admin views in v1.

## Stack
- Next.js + TypeScript (App Router), src/ directory
- Tailwind CSS + shadcn/ui for components
- Supabase for auth (email/password) + Postgres database
- Recharts for dashboard charts
- SheetJS (xlsx) for Excel import/export
- Hosted on Vercel free tier, code on GitHub

## Non-negotiable rules
- NEVER put the Supabase service-role key in code, .env committed to git, or in any prompt/chat. Only the public URL + anon key belong in the app.
- Every user-data table (transactions, categories, imports, profiles) MUST have Row Level Security enabled, scoped to `auth.uid() = user_id`.
- `user_id` on any row must be set by the database (default/trigger), never trusted from client input.
- No cross-user data access anywhere — not even for the admin/owner account. No in-app admin panel.
- Excel export/import only ever reads/writes the signed-in user's own rows.
- Do not add paid services, paid domains, or subscription/payment code — this is a free-tier-only project.

## Data model
Single `transactions` table (not separate income/expense tables):
id, user_id, transaction_date, type (income|expense), amount, category, description, payment_method, created_at, updated_at.
Supporting tables: `profiles`, `categories`, `imports`.

## Conventions
- Mobile-first UI; bottom nav on mobile, wider dashboard layout on desktop.
- Keep components small and typed; prefer server components where no client interactivity is needed.
- Don't invent new libraries/services outside the stack above without asking.

## Current phase
Phase 0 setup complete (Next.js scaffolded). Next: Supabase schema + RLS policies (see implementation plan).
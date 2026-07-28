# Float.us Platform

Monorepo for the Float.us hub and its per-service booking sub-sites, built
with Next.js (App Router, JavaScript) and CSS Modules from the original
Figma "Coming Soon" design — no CSS framework.

## Structure

```
apps/
  hub/        Float.us — the landing hub (4 service buttons + rewards banner)
  moving/     Float Moving — flagship sub-site with a full booking engine
packages/
  ui/         @float/ui — shared design tokens + component library
```

Float.us is a **hub only**: it links out to independently deployable
sub-sites, one per service (Moving, Towing, Fishing Charters, Detailing).
Only Float Moving is built out in this pass; see `packages/ui/README.md` for
how the remaining three get spun up from the same base.

## Getting started

```bash
npm install                          # installs and links the whole workspace
npm run dev:hub                      # http://localhost:3010
npm run dev:moving                   # http://localhost:3011
```

Each app has its own `.env.local` (gitignored, see its `.env.example`)
pointing cross-app links (hub → Moving, Moving → hub) at the other app's
local dev port. In production these become the real domains
(`floatmoving.com`, etc.).

## Stack

- **Next.js** (App Router, JavaScript, Turbopack)
- **CSS Modules** — every component/page ships its own scoped stylesheet
- **next/font** — self-hosted Montserrat (headings) + Inter (body)
- **next/image** — optimized background/logo assets
- npm workspaces — no build step for `@float/ui`; consumed via
  `transpilePackages` in each app's `next.config.mjs`

## Key UX decisions

- **Hub is a directory, not a marketplace.** Per the client's direction,
  Float.us itself has no booking engine — each service owns its own site
  and booking flow, sharing only the design system and a rewards program.
- **Airbnb-pattern booking flow** on Float Moving: browse (search/filter) →
  card grid → detail page with gallery + sticky booking panel → multi-step
  book (Details → Quote → Confirm & Pay) → confirmation. This mirrors
  current best practice for service marketplaces (Airbnb/Turo/Thumbtack-style
  flows) rather than a plain contact form.
- **Quote-before-book pricing.** The booking flow shows a low–high price
  range (labor + travel + materials) *before* asking for payment details,
  and again at the final confirm step — research on booking/checkout UX
  consistently flags surprise pricing as the top cause of drop-off.
- **Guest checkout is first-class**, not an afterthought — the confirm step
  defaults to "Continue as guest" with "Create an account" as the opt-in,
  since forcing an account before checkout is one of the most common
  reasons booking flows get abandoned.
- **Mobile-first booking chrome**: the listing detail page's booking panel
  is a sticky sidebar on desktop and collapses to a fixed bottom bar
  (price + CTA) on mobile, matching how most real bookings actually happen
  (on a phone).
- **Gamified incentive banner** ("$1 spent = 1 entry to win an offshore
  fishing trip") lives on the hub as a live-feeling animated counter, not
  a static line of text, per the brief's ask for something visibly
  gamified rather than just informational copy.

## What's stubbed vs. functional

This is a front-end build with no backend yet. Concretely:

| Area | Status |
|---|---|
| Browsing, filtering, listing detail, multi-step booking UI | **Fully functional** (client-side state) |
| Pricing / quote math | **Real formula** (hourly rate × hours range + travel fee by distance tier + flat materials fee) — see `apps/moving/lib/packages.js` |
| Availability ("next available" slots) | **Mocked** — hardcoded slot strings per package, not a real calendar |
| Booking confirmation | **Mocked** — a confirmation number is generated client-side (`FLM-######`) and nothing is persisted; refreshing the page loses it |
| Guest vs. account checkout | UI only — no real auth, no account persisted anywhere |
| Payment | **Stubbed** — card fields are disabled/decorative; "Confirm Booking" never contacts a payment processor |
| Confirmation email | **Not sent** — the confirmation screen says so explicitly |
| Rewards ledger ("$1 = 1 entry") | **Mocked** numbers on the hub (`REWARD_ENTRIES` / `REWARD_GOAL` in `apps/hub/app/page.js`) — not wired to real purchase data from any sub-site |
| Stat bands (jobs completed, ratings, etc.) | **Placeholder** figures — swap for real numbers before launch |
| Social links | `#` placeholders in both apps |
| Apple Business Connect presence per sub-brand | **Not started** — noted as a future consideration per the brief, out of scope for this pass |

## Genuine blockers / things to flag

- No real crew/truck photography exists yet — listing cards and the detail
  gallery use icon-on-gradient placeholders instead of photos (clearly
  marked in code comments). Swap in real photos as they're shot.
- The Figma MCP connection used for the original Coming Soon page requires
  its own auth; the new pages in this pass were built directly in code
  (no new Figma source), extending the same visual system.

# @float/ui

Shared design tokens and components for every Float property (the `Float.us`
hub plus each service sub-site: Moving, Towing, Fishing, Detailing). This is
what keeps four separately-deployed sites feeling like one brand.

Not published to npm — it's a workspace-local package (`apps/*` depend on it
as `"@float/ui": "*"` and npm workspaces symlinks it into `node_modules`).

## Tokens

`tokens/tokens.css` defines the brand DNA established on the Float.us
"Coming Soon" page as CSS custom properties: midnight-ocean background,
glowing cyan/blue accents, spacing scale, radii, glow/shadow values, motion
easing. Import it once per app, before your own `globals.css`:

```js
// app/layout.js
import "@float/ui/tokens/tokens.css";
import "./globals.css";
```

Reference tokens as `var(--float-*)` in your own CSS Modules — don't hardcode
hex values in app code. If a color/spacing/shadow you need doesn't exist yet,
add it to `tokens.css` rather than one-off-ing it in an app.

## Components

All components are plain `.jsx` + colocated CSS Modules under
`components/<Name>/`, re-exported from `index.js`:

| Component | Purpose |
|---|---|
| `Button` | Primary/secondary/ghost CTA, polymorphic via `as` |
| `Badge` | Small pill label (status, tags) |
| `StarRating` | Partial-fill star rating with review count |
| `SectionHeading` | Eyebrow + title + description, center or left aligned |
| `ListingCard` | Photo/icon-placeholder + price + specs + rating, links out |
| `SearchBar` | Configurable filter bar (select/date/text fields) + submit |
| `StatBand` | Row of big glow numbers with dividers |
| `TrustGrid` | 4-up icon + title + description grid |
| `TestimonialCarousel` | Auto-rotating quote card with dot navigation |
| `SiteHeader` | Sticky nav: logo slot, links, CTA, mobile menu |
| `SiteFooter` | Logo/tagline + link columns + socials + copyright |
| `IncentiveBanner` | Gamified count-up banner (the "$1 = 1 entry" rewards widget) |
| `Stepper` | Numbered step indicator for multi-step flows (e.g. booking) |
| `PriceBreakdown` | Itemized quote card with a total and optional notes |
| `Container` / `Section` | Layout primitives (max-width + responsive padding) |

Import from the package root:

```js
import { Button, SiteHeader, ListingCard } from "@float/ui";
```

### The `as` prop and Server Components

`Button`, `SiteHeader`, `SiteFooter`, and `ListingCard` accept an `as` prop so
callers can swap the rendered tag (e.g. `next/link`'s `Link` for
client-side transitions instead of a plain `<a>`).

**Important:** these components are all `"use client"`. React Server
Components cannot pass a function/component *reference* as a prop into a
client component — only plain data (strings, numbers, objects) or JSX
children cross that boundary safely. Concretely:

- From a **Server Component** page (e.g. a `generateStaticParams` detail
  page), pass `as="a"` (a string) — not `as={Link}`. A real `<Link href="/">
  text</Link>` written directly as JSX is still fine anywhere; it's only
  passing the component *as a prop value* that breaks.
- From a page that's already `"use client"` (e.g. a page with interactive
  filters or a multi-step form), `as={Link}` is safe and gives you real
  client-side navigation.

Getting this wrong fails at build time with `Functions cannot be passed
directly to Client Components...` — see `apps/moving/app/listings/[id]/page.js`
(Server Component, uses `as="a"`) vs `apps/hub/app/page.js` (Client
Component, uses `as={Link}`) for both patterns side by side.

## Spinning up a new sub-site (Towing / Fishing / Detailing)

Float Moving (`apps/moving`) is the template. To start a new one:

1. Copy `apps/moving` to `apps/<name>` (e.g. `apps/towing`).
2. In its `package.json`, rename to `@float/<name>`, and give `dev`/`start` a
   free port (hub=3010, moving=3011 — use 3012, 3013, ...).
3. Swap `lib/packages.js` for that service's real catalog (marine towing
   packages, charter boats, detailing packages) and update the copy in
   `app/page.js`, `app/listings/[id]/page.js`, and `app/book/[id]/page.js`
   (headline, trust grid copy, testimonials, stats).
4. Swap `public/images/hero-bg.webp` and any icons for the new service's
   art — keep the same file names so the CSS/JS referencing them doesn't
   need to change.
5. Everything else — tokens, `SiteHeader`/`SiteFooter`, the booking-flow
   pattern (`Stepper` + `PriceBreakdown` + guest/account + stub payment),
   the `ListingCard` grid, `SearchBar` — carries over unchanged from
   `@float/ui`, so the new site inherits the same brand and UX automatically.
6. Add a `.env.example` / `.env.local` pair pointing `NEXT_PUBLIC_HUB_URL`
   back at the hub, and add the new service's URL env var to
   `apps/hub/lib/services.js` + `apps/hub/.env.local`, flipping its
   `status` from `"coming-soon"` to `"live"`.
7. Add a matching entry to the root `.claude/launch.json` (or your own dev
   tooling) so it runs on its own port alongside the others.

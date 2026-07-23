# Float.us — Coming Soon

A responsive "coming soon" landing page for Float.us (moving, towing, marine, and hauling services), built with Next.js (App Router) and CSS Modules from the Figma design.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Stack

- **Next.js** (App Router, JavaScript)
- **CSS Modules** for scoped, component-level styling — no CSS framework
- **next/font** for self-hosted Montserrat (heading) and Inter (body) fonts
- **next/image** for optimized raster assets (background photo, logo)

## Structure

- `app/page.js` — the coming-soon page markup and content
- `app/page.module.css` — page styling, including all responsive breakpoints
- `app/layout.js` — root layout, fonts, and metadata
- `public/images`, `public/icons` — exported design assets (background, logo, service and social icons)

## Notes

- Social links in the footer currently point to `#` placeholders — update `socialLinks` in `app/page.js` with real URLs before launch.

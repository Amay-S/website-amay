# heyitsamay.com

Personal site of Amay Shah. It's a static export built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and TypeScript.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Edit content

Everything lives in `src/data/portfolioData.json`. See [DESIGN.md](DESIGN.md) for how to add a project or certification, and for the design tokens and motion rules.

## Build and deploy

```bash
npx tsc --noEmit && npm run lint && npm run build
```

`npm run build` writes the static site to `out/`. Upload the contents of `out/` to the web host. Generated alongside the page:

- `sitemap.xml`
- `robots.txt`
- `opengraph-image.png` (the share card; its source is `scripts/og-image.tsx`)
- `404.html`

Caching: serve HTML with `Cache-Control: no-cache`. Files under `/_next/static/` are content-hashed and can be cached as `public, max-age=31536000, immutable`.

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

Deploys are automatic: push (or merge) to `main`.

1. `.github/workflows/deploy.yml` runs the type check, lint, and `npm run build`, then publishes the `out/` folder to the `deploy` branch.
2. Hostinger's Git integration (hPanel → Websites → Advanced → Git) tracks `deploy` and pulls it into `public_html` through its auto-deployment webhook.

To redeploy without a code change, use **Actions → Build and publish → Run workflow** on GitHub.

To check a build locally:

```bash
npx tsc --noEmit && npm run lint && npm run build   # output in out/
```

The build also generates `sitemap.xml`, `robots.txt`, `opengraph-image.png` (source: `scripts/og-image.tsx`), `404.html`, and `.htaccess` (404 page and cache headers: HTML `no-cache`, hashed JS/CSS cached for a year).

# Sonicverse Docs Content

This directory contains the MDX documentation pages, navigation config, and public docs assets for Sonicverse Docs.

## Editing Pages

- Add or edit `.mdx` files in this directory.
- Add new pages to `docs/docs.json` so they appear in navigation.
- Keep shared brand assets in `docs/brand/` and logo files in `docs/logo/`.

## Publishing

The Astro app builds these files into the static Vercel output directory, `dist`.

```bash
npm run build
```

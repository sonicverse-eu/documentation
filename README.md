# Sonicverse Docs

Sonicverse Docs is the Astro documentation frontend for Sonicverse, the open broadcast stack for modern radio. It uses Mintlify content tooling for MDX rendering, navigation resolution, search, and the assistant while keeping the presentation layer in this repository.

## Prerequisites

- Node.js v20.17.0 or later
- npm v10 or later
- Optional Mintlify search and assistant credentials

## Local Development

```bash
npm ci
npm run dev
```

The local dev server runs at `http://localhost:4321` by default.

## Environment Variables

Copy `.env.example` to `.env` when you need local search, assistant, or canonical URL behavior.

```bash
PUBLIC_MINTLIFY_ASSISTANT_KEY=
PUBLIC_MINTLIFY_SUBDOMAIN=
PUBLIC_SITE_URL=https://docs.sonicverse.tech
```

## Deployment

This site is ready for Vercel. The repository includes `vercel.json` with the Astro framework preset, `npm ci` install command, `npm run build` build command, and `dist` output directory.

```bash
npm run lint
npm run build
npm run preview
```

## Project Structure

```text
docs/                    Documentation content and public docs assets
src/layouts/             Astro HTML shell
src/pages/               Catch-all docs route
src/components/          Header, sidebar, assistant, footer, and docs chrome
src/styles/              Sonicverse docs tokens, prose, and component CSS
astro.config.mjs         Astro, React, MDX, and Mintlify integration
vercel.json              Vercel build configuration
```

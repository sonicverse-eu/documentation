# Development Guide

This guide covers local development for the Sonicverse documentation site.

## Getting Started

Install dependencies from the lockfile:

```bash
npm ci
```

Create a local environment file when search, assistant, or canonical URLs are needed:

```bash
cp .env.example .env
```

Start the Astro development server:

```bash
npm run dev
```

The site is available at `http://localhost:4321` by default.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Build the static site into `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |
| `npm run format` | Format the repository with Prettier. |

## Content

Documentation pages live in `docs/` as MDX files. Navigation and public docs metadata live in `docs/docs.json`.

## Branding

Sonicverse brand assets live in `docs/brand/` and `docs/logo/`. The shared light documentation palette is defined in `src/styles/global.css`.

## Vercel

Vercel uses `vercel.json`:

```json
{
  "framework": "astro",
  "installCommand": "npm ci",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

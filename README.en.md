# Jung Archive

> A digital space for archiving emotions, memories, and experiences

[![Lighthouse](https://img.shields.io/badge/Lighthouse-99-brightgreen)](https://www.geojung.com)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

🔗 **Live**: https://www.geojung.com | 📖 **한국어**: [README.md](./README.md)

---

## Quick Start

```bash
pnpm install
pnpm dev  # http://localhost:3000
```

Environment variables: See [`.env.example`](./.env.example)

---

## Core Features

- **AI Chatbot** (CMD+J): RAG + Gemini for site content-based conversations
- **Global Search** (CMD+K): Hybrid Search (Vector + Keyword)
- **Blog**: Markdown editor, comments, multilingual (Korean/English)
- **Gallery**: Photo collections, Lightbox, Masonry layout
- **Places**: Google Maps integration, clustering

---

## Tech Stack

| Frontend | Backend | AI/ML | Infra |
|----------|---------|-------|-------|
| Next.js 16 | Supabase | Gemini 2.5 Flash | Cloudflare R2 |
| React 19 | tRPC 11 | pgvector | Resend |
| TypeScript 5.8 | PostgreSQL | Vercel AI SDK | Turborepo |
| TanStack Query | Zod | HyDE, RRF | pnpm |
| Vanilla Extract | - | - | Playwright |

**Monorepo**: pnpm workspaces + Turborepo (4 apps, multiple packages)

<details>
<summary>Full Tech Stack (27 technologies)</summary>

- **Framework**: Next.js 16.1, React 19.2
- **Language**: TypeScript 5.8
- **State**: TanStack Query 5.90, Zustand 5.0
- **API**: tRPC 11.8, Zod 3.23
- **Styling**: Vanilla Extract 1.15, Motion 12.23
- **Backend**: Supabase 2.93, pgvector
- **AI**: Vercel AI SDK 6.0, Gemini 2.5 Flash, Gemini Embedding 001
- **Storage**: Cloudflare R2
- **Email**: Resend 4.3
- **i18n**: next-intl 4.7
- **Editor**: BlockNote 0.46, Shiki 3.20
- **Monorepo**: pnpm 8.9, Turborepo 2.7
- **Linter**: Biome 2.3
- **Testing**: Vitest 4.0, Playwright 1.57
</details>

---

## Monorepo Structure

```
apps/
  web/           # Next.js (user pages)
  admin/         # Vite (admin dashboard)
  subscription/  # Next.js (newsletter subscription)
  workshop/      # Storybook (design system)
packages/
  api/            # tRPC routers
  shared/         # Common utilities
  design-system/  # Vanilla Extract components
```

---

## Achievements

- **Lighthouse 99** (FCP 0.4s, Bundle 29KB)
- **Page transition 90% improvement** (await → void prefetch)
- **Bundle size 89% reduction** (2.6MB → 29KB)

---

## Documentation

- 🛠 [CLAUDE.md](./CLAUDE.md) - Development Guide, Conventions

---

## Links

| Category | Link |
|----------|------|
| **Live** | [https://www.geojung.com](https://www.geojung.com) |
| **Storybook** | [Chromatic](https://664d5ae9bd834c32cc784632-uwgqtjvjge.chromatic.com) |
| **Blog** | [geojung.com/ko/blog](https://www.geojung.com/ko/blog) |

---

## License

MIT © 2024 Jung · [GitHub](https://github.com/dgd03146) · [Email](mailto:ibory1220@gmail.com)

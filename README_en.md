<p align="right">
  🇺🇸 This document is in English. → <a href="./README.md"><strong>📄 Korean Version</strong></a>
</p>

# 🌟 Jung Archive

> A fully self-directed full-stack project — from planning and design to frontend and backend development.  
> A digital space that encapsulates my identity, memories, and emotions.

---

## 🧭 Summary

**Jung Archive** is not just a blog. It's a digital archive that emotionally expresses the personal brand of developer **GeoJung Im**.  
It was entirely designed, built, and deployed by myself, incorporating a blog, gallery, map-based spot recording, guestbook, and a custom design system.

---

## ✨ Key Features

- 🖼 **Gallery** – Photo collection viewer with lightbox
- 📍 **Spots** – Map-based spot recording with clustering UI
- ✍️ **Blog** – Markdown-based blog with nested comment system
- 💬 **Guestbook** – Anonymous message board with emotion reactions
- 🛠 **Admin Dashboard** – Content and user management interface

---

## ⚙️ Tech Stack & Why

| Area | Tech | Reason |
|------|------|--------|
| Web | Next.js 14 | SSR + SSG with App Router flexibility |
| State | TanStack Query / Zustand | Clear separation of server & client state |
| API | tRPC + Zod | Type-safe end-to-end API contracts |
| Styling | Vanilla Extract | Type-safe, zero-runtime CSS with design tokens |
| Backend | Supabase | Unified auth, DB, and storage management |
| Admin | Vite + React 18 | Fast and isolated dashboard dev experience |
| Architecture | Turborepo | Monorepo for structured modular development |
| Testing | Vitest, Storybook, Chromatic | Test and visual QA automation |

---

## 📦 Monorepo Structure

```bash
apps/
  ├── web/             # Public website (Next.js)
  ├── admin/           # Admin dashboard (Vite + React)
  ├── server/          # API server (tRPC)
  └── workshop/        # Design system docs (Storybook)

packages/
  ├── design-system/   # Shared UI components
  ├── shared/          # Utilities & shared types
  ├── configs/         # Testing & linting configs
  └── typescript-config/ # TS base config
```

---

## 🚀 Performance Optimization & Troubleshooting

### ✅ Page Speed Improvements
- FCP: Reduced from 2.7s → 0.4s
- Lighthouse score: 69 → 99
- Used `generateStaticParams` and fine-tuned `prefetch` logic

### ✅ Bundle Optimization
- Reduced Vanilla Extract sprinkles combination overload
- Minimized CSS output size: 2.6MB → 300KB

### ✅ UX Stability
- Fixed React re-mount issue during optimistic comment updates
- Key stabilization removed blinking on re-render

---

## 🧪 Dev Environment & DX Automation

- ✅ Biome + lint-staged + Husky for auto formatting and pre-commit checks
- ✅ GitHub Actions + Chromatic for PR-based Storybook visual testing
- ✅ Prefetching + localStorage caching with TanStack for smoother UX
- ✅ Branching / commit / release strategy well-documented for scaling teams

---

## 🧠 Project Philosophy

> “This is not just a website, but a trace of myself written on the web.”

Jung Archive is a structured expression of my identity on the web.

- Emotion guided the design before technology
- Flow was considered before structure

The design system wasn't just for consistency — it visualized my brand.  
The blog wasn’t just for sharing information — it was a tool to preserve memory.

What mattered most wasn’t "what I built," but "how I designed the experience."

---



## 🔗 Key Links

- ▶️ Live: [https://www.geojung.com](https://www.geojung.com)
- 📘 Storybook: [Chromatic Deployment](https://664d5ae9bd834c32cc784632-uwgqtjvjge.chromatic.com)
- 📎 GitHub: [https://github.com/dgd03146/jung](https://github.com/dgd03146/jung)

---

## 🙋‍♂️ Author

**GeoJung Im**  
[@dgd03146](https://github.com/dgd03146)  
📧 ibory1220@gmail.com

---

## 🪪 License

MIT License © 2024 Jung


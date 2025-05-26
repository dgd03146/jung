<p align="right">
  🇺🇸 This document is in English. → <a href="./README.md"><strong>📄 Korean Version</strong></a>
</p>


# Jung Archive

> A personal brand archive for emotions, memories, and moments  
> A fully self-built fullstack project — from planning to design, frontend to backend

<br/>

## 🧭 About

**Jung Archive** is more than just a blog.  
It’s a digital space where I archive my thoughts and daily moments with intention and emotion.  
Designed and developed by myself, it’s a brand space that reflects who I am as a developer.

I built it because I needed it.  
I refined it every time something felt off.  
Every feature exists because I designed it to solve my own needs.

<br/>

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 📝 Blog | Markdown editor, threaded comments, static routing |
| 🖼 Gallery | Emotion-driven image collection, lightbox, parallel routes |
| 📍 Spot Log | Map-based location records, zoom-level clustering, memo support |
| 💬 Guestbook | Emotion-tagged anonymous messages, optimistic updates, throttle protection |
| 🛠 Admin | Unified dashboard for content/user management with filter/sort/search |
| 🧩 Design System | Polymorphic components, compound pattern, fully documented via Storybook |

<br/>

## ⚙️ Tech Stack

| Category | Tech | Reason |
|----------|------|--------|
| Framework | Next.js 14 | App Router, SSR + SSG, i18n support |
| State Management | TanStack Query / Zustand | Clear client/server state separation |
| API | tRPC + Zod | End-to-end type safety with schema validation |
| Styling | Vanilla Extract | Zero-runtime CSS-in-TS with design tokens |
| Backend | Supabase | Auth, DB, storage — all managed together |
| Structure | Turborepo | Monorepo for modular code reuse |
| Dev Tools | Biome, Husky, lint-staged | Fast linting with automated workflows |
| Test & Docs | Vitest, Storybook, Chromatic | Component-level tests and documentation |

<br/>

## 🗂 Monorepo Structure

```bash
apps/
  web/         # User-facing website
  admin/       # Admin dashboard
  server/      # tRPC API server
  workshop/    # Storybook for design system

packages/
  design-system/       # UI components
  shared/              # Common hooks, utils, types
  configs/             # ESLint, Biome, test settings
  typescript-config/   # Shared TS config
````

<br/>

## 🚀 Performance Optimization

| Metric               | Before | After | What Changed                     |
| -------------------- | ------ | ----- | -------------------------------- |
| FCP                  | 2.7s   | 0.4s  | Static path + prefetch           |
| Design system bundle | 2.6MB  | 300KB | Cleaned Sprinkles + tree-shaking |
| TBT                  | 150ms  | 50ms  | Style chunking & async loading   |
| Gallery modal render | 2.5ms  | 1.5ms | Async image size with rAF        |
| Lighthouse score     | 69     | 99    | Full-page performance tuning     |

<br/>

## 🔧 Architecture & Code Strategy

* **FSD architecture**: Feature-based folder structure and separation of concerns
* **Custom Hooks**: Generic-based hooks for debounce, observer, localStorage, etc.
* **Design System**: Accessible, polymorphic components with consistent styling patterns
* **API design**: Unified request/response schema with tRPC + Zod
* **DX focused**: Biome formatter, fast lint feedback, automated commit checks

<br/>

## 🧠 Project Philosophy

This isn’t just about “making it work.”
It’s about being able to explain *why* it was built that way — and crafting experiences that I genuinely want to use.

* I believe every tech decision should have a reason.
* A design system isn’t just for visuals — it’s how a brand communicates.
* A blog isn’t just a list of posts — it’s a method to organize memory.
* UX isn’t something you patch after release — it’s part of the design from the start.

<br/>

## 🔗 Demo & Docs

* 🌐 Live: [https://www.geojung.com](https://www.geojung.com)
* 🧪 Storybook: [Chromatic](https://664d5ae9bd834c32cc784632-uwgqtjvjge.chromatic.com)
* 📘 GitHub: [https://github.com/dgd03146/jung](https://github.com/dgd03146/jung)
* 📓 Blog: [https://www.geojung.com/ko/blog](https://www.geojung.com/ko/blog)

<br/>

## 🙋‍♂️ Creator

| Name   | Geojung Lim (Jung)                                |
| ------ | ------------------------------------------------- |
| Email  | [ibory1220@gmail.com](mailto:ibory1220@gmail.com) |
| GitHub | [@dgd03146](https://github.com/dgd03146)          |
| Blog   | [geojung.com](https://www.geojung.com/ko/blog)    |

<br/>

## 🪪 License

MIT License © 2024 Jung

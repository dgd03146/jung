# Jung Archive

> 감정, 기억, 경험을 아카이빙하는 개인 브랜드 디지털 공간

[![Lighthouse](https://img.shields.io/badge/Lighthouse-99-brightgreen)](https://www.geojung.com)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

🔗 **Live**: https://www.geojung.com | 📖 **English**: [README.en.md](./README.en.md)

---

## Quick Start

```bash
pnpm install
pnpm dev  # http://localhost:3000
```

환경 변수: [`.env.example`](./.env.example) 참고

---

## 핵심 기능

- **AI 챗봇** (CMD+J): RAG + Gemini로 사이트 콘텐츠 기반 대화
- **글로벌 검색** (CMD+K): Hybrid Search (Vector + Keyword)
- **블로그**: Markdown 에디터, 댓글, 다국어 (한/영)
- **갤러리**: 사진 컬렉션, Lightbox, Masonry 레이아웃
- **장소 기록**: Google Maps 통합, 클러스터링

---

## 기술 스택

| Frontend | Backend | AI/ML | Infra |
|----------|---------|-------|-------|
| Next.js 16 | Supabase | Gemini 2.5 Flash | Cloudflare R2 |
| React 19 | tRPC 11 | pgvector | Resend |
| TypeScript 5.8 | PostgreSQL | Vercel AI SDK | Turborepo |
| TanStack Query | Zod | HyDE, RRF | pnpm |
| Vanilla Extract | - | - | Playwright |

**Monorepo**: pnpm workspaces + Turborepo (3개 앱, 3개 패키지)

<details>
<summary>전체 기술 스택 (27개)</summary>

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

## 모노레포 구조

```
apps/
  web/        # Next.js (사용자 페이지)
  admin/      # Vite (관리자 대시보드)
  workshop/   # Storybook (디자인 시스템)
packages/
  api/        # tRPC 라우터 (13개)
  shared/     # 공통 유틸리티
  design-system/  # Vanilla Extract 컴포넌트 (19개)
```

---

## 성과

- **Lighthouse 99점** (FCP 0.4s, 번들 29KB)
- **페이지 전환 90% 개선** (await → void prefetch)
- **번들 크기 89% 감소** (2.6MB → 29KB)

상세: [PERFORMANCE.md](./docs/PERFORMANCE.md)

---

## 문서

- 📐 [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - FSD, 모노레포, 타입 안전성
- ⚡ [PERFORMANCE.md](./docs/PERFORMANCE.md) - 번들, 캐싱, DB 쿼리
- 🧠 [TECHNICAL_DECISIONS.md](./docs/TECHNICAL_DECISIONS.md) - Trade-offs, 문제 해결
- 📚 [LEARNINGS.md](./docs/LEARNINGS.md) - 메타 학습, 사고 구조
- 🛠 [CLAUDE.md](./CLAUDE.md) - 개발 가이드, 컨벤션

---

## Links

| 구분 | 링크 |
|------|------|
| **Live** | [https://www.geojung.com](https://www.geojung.com) |
| **Storybook** | [Chromatic](https://664d5ae9bd834c32cc784632-uwgqtjvjge.chromatic.com) |
| **Blog** | [geojung.com/ko/blog](https://www.geojung.com/ko/blog) |

---

## License

MIT © 2024 Jung · [GitHub](https://github.com/dgd03146) · [Email](mailto:ibory1220@gmail.com)

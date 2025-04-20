<p align="right">
  🇰🇷 이 문서는 한국어입니다. → <a href="./README_en.md"><strong>📄 English Version</strong></a>
</p>

# 🌟 Jung Archive

> 기획부터 디자인, 프론트·백엔드까지 직접 구현한 **1인 풀스택 프로젝트**
>
> 감정, 기억, 기록을 담은 나만의 브랜드 공간

---

## 🧭 Summary

**Jung Archive**는 단순한 블로그가 아닌, 개발자 Jung의 개인 브랜드를 감성적으로 표현한 디지털 아카이브입니다.
기록 중심의 블로그, 감정을 담은 방명록, 장소 기반 기록 시스템, 디자인 시스템 기반 UI 등 모든 영역을 직접 설계하고 운영합니다.

---

## ✨ 주요 기능 (Features)

- ✍️ **Blog** – Markdown 기반 블로그 + 댓글/대댓글 시스템
- 🖼 **Gallery** – 감성 기반 사진 컬렉션 뷰 + lightbox
- 📍 **Spots** – 지도 기반 장소 기록 + 클러스터링 UI
- 💬 **Guestbook** – 익명 감정 방명록 + 반응 기능
- 🛠 **Admin Dashboard** – 콘텐츠 및 유저 관리 인터페이스

---

## ⚙️ 기술 스택 및 선택 이유 (Why this Stack?)

| 영역   | 기술                           | 선택 이유                            |
| ---- | ---------------------------- | -------------------------------- |
| Web  | Next.js 14                   | App Router 기반 SSR + SSG 전략 유연성   |
| 상태   | TanStack Query / Zustand     | 서버·클라이언트 상태 분리 관리                |
| API  | tRPC + Zod                   | 타입 안전한 End-to-End API 설계         |
| 스타일링 | Vanilla Extract              | Zero runtime + 타입 안전 + 디자인 토큰 기반 |
| 백엔드  | Supabase                     | 인증 + DB + 스토리지 일체형 관리            |
| 관리도구 | Vite + React 18              | 빠른 개발 속도와 별도 UI 구조               |
| 구조화  | Turborepo                    | 모노레포 구조로 앱·패키지 분리 운영             |
| 테스트  | Vitest, Storybook, Chromatic | UI 품질 보장 및 문서화                   |

---

## 📦 Monorepo 구조

```bash
apps/
  ├── web/             # 사용자용 웹사이트 (Next.js)
  ├── admin/           # 관리자 대시보드 (Vite + React)
  ├── server/          # tRPC API 서버
  └── workshop/        # 디자인 시스템 문서화 (Storybook)

packages/
  ├── design-system/   # 공통 UI 컴포넌트
  ├── shared/          # 유틸리티 및 공통 타입
  ├── configs/         # 테스트 및 린트 설정
  └── typescript-config # TypeScript base 설정
```

---

## 🚀 성능 최적화 및 트러블슈팅

### ✅ Page 성능 개선

- FCP: 2.7s → 0.4s
- Lighthouse 점수: 69 → 99
- 블로그 상세 페이지에 `generateStaticParams`, `prefetch` 최적화 적용

### ✅ 번들 최적화

- Vanilla Extract sprinkles 조합 수 최적화
- 디자인 시스템 CSS 파일 정리 → 2.6MB → 300KB

### ✅ UX 안정화

- 댓글 낙관적 업데이트 시 ID 변경 → React re-mount 이슈 해결
- key 안정화로 깜빡임 제거

---

## 🧪 개발 환경 및 자동화 (DX)

- ✅ Biome + lint-staged + Husky → 코드 퀄리티 자동 보장
- ✅ GitHub Actions + Chromatic → PR 기반 Storybook 테스트 자동화
- ✅ TanStack prefetch + localStorage 캐싱 전략 → UX 향상
- ✅ 커밋/브랜치/릴리즈 기준 문서화로 협업 확장 대비



---



## 🧠 프로젝트 철학

> **"이건 단순한 웹사이트가 아니라, 디지털 위에 남긴 저저의 흔적입니다."**

Jung Archive는 단순히 기능을 구현한 결과물이 아닙니다.  
**나 자신을 표현하고, 감정을 담아낼 수 있는 디지털 공간을 시각적으로 구조화한 실험**입니다.

- 기술보다 먼저 **감정의 흐름**을 고민했고,  
- 구조보다 먼저 **사용자의 경험 여정**을 상상했습니다.

디자인 시스템은 일관성을 위한 도구가 아니라,  
**브랜드의 정체성을 시각화하기 위한 수단**이었고,  
블로그는 정보를 나열하는 공간이 아닌,  
**기억과 경험을 보존하는 아카이브**였습니다.

결국 이 프로젝트는 **무엇을 만들었는가보다,  
'어떻게 풀어냈는가'를 보여주는 과정 그 자체**입니다.



---



## 🔗 주요 링크

- ▶️ Live: [https://www.geojung.com](https://www.geojung.com)
- 📘 Storybook: [Chromatic](https://664d5ae9bd834c32cc784632-uwgqtjvjge.chromatic.com)
- 📎 GitHub: [https://github.com/dgd03146/jung](https://github.com/dgd03146/jung)

---

## 🙋‍♂️ 제작자

- Jung — [@dgd03146](https://github.com/dgd03146)
- Email: [ibory1220@gmail.com](mailto:ibory1220@gmail.com)

---

## 🪪 License

MIT License © 2024 Jung


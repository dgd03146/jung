<p align="right">
  🇰🇷 이 문서는 한국어입니다. → <a href="./README_en.md"><strong>📄 English Version</strong></a>
</p>

# Jung Archive

> 감정, 기억, 경험을 아카이빙하는 개인 브랜드 공간  
> **기획부터 디자인, 프론트·백엔드까지 직접 만든 실사용 중심 1인 풀스택 프로젝트**

</br>

## 🧭 About

**Jung Archive**는 단순한 블로그가 아닙니다.  
매일의 생각과 장면들을 감각적으로 저장하고, 직접 경험을 바탕으로 지속적으로 개선해온  
**디지털 아카이브이자, 개발자로서의 정체성을 담은 브랜드 공간**입니다.

- 내가 사용하기 위해 만들었고  
- 불편할 때마다 개선했고  
- 필요한 기능은 직접 설계했습니다.


</br>

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 📝 블로그 | Markdown 기반 에디터, 댓글/대댓글, 정적 경로 처리 |
| 🖼 갤러리 | 감성 기반 이미지 컬렉션, 라이트박스, Parallel Routes |
| 📍 장소 기록 | 지도 기반 위치 저장, 줌 클러스터링, 메모 시스템 |
| 💬 방명록 | 감정형 메시지, 낙관적 업데이트, 쓰로틀링 처리 |
| 🛠 어드민 | 콘텐츠/유저 관리, TanStack Table 기반 CRUD |
| 🧩 디자인 시스템 | Polymorphic 컴포넌트, Compound 패턴, Storybook 문서화 |

</br>

## ⚙️ 기술 스택

| 분류 | 기술 | 이유 |
|------|------|------|
| 프레임워크 | Next.js 14 | App Router, SSR + SSG, i18n 최적화 |
| 상태관리 | TanStack Query / Zustand | 서버·클라이언트 상태 분리 |
| API | tRPC + Zod | 타입 안전한 E2E API, 스키마 기반 검증 |
| 스타일 | Vanilla Extract | 제로 런타임 CSS-in-TS, 디자인 토큰 기반 |
| 백엔드 | Supabase | 인증, DB, 스토리지 통합 관리 |
| 구조화 | Turborepo | 모노레포 기반 앱/패키지 분리 및 재사용 |
| 개발환경 | Biome, Husky, lint-staged | 빠른 린트 환경, 일관된 커밋 워크플로우 |
| 테스트/문서화 | Vitest, Storybook, Chromatic | UI 품질 보장 및 문서 자동화 |

</br>

## 🗂 Monorepo 구조

```bash
apps/
  web/         # 사용자 웹사이트
  admin/       # 관리자 대시보드
  server/      # tRPC API 서버
  workshop/    # 디자인 시스템 문서

packages/
  design-system/       # UI 컴포넌트
  shared/              # 공통 훅, 유틸, 타입
  configs/             # 설정 패키지 (ESLint, Biome 등)
  typescript-config/   # TS 설정 공유
````

</br>

## 🚀 성능 최적화

| 항목                        | 개선 전  | 개선 후  | 비고                   |
| ------------------------- | ----- | ----- | -------------------- |
| FCP                       | 2.7s  | 0.4s  | 정적 경로 생성 + prefetch  |
| 디자인 시스템 번들                | 2.6MB | 300KB | Sprinkles 정리 + 트리쉐이킹 |
| TBT (Total Blocking Time) | 150ms | 50ms  | 스타일 분할 및 로딩 최적화      |
| 갤러리 상세 렌더                 | 2.5ms | 1.5ms | 비동기 이미지 사이즈 계산       |
| Lighthouse 점수             | 69점   | 99점   | 전체 페이지 성능 최적화        |

</br>

## 🔧 구조 & 설계 전략

* **FSD 아키텍처**: 기능 중심 구조, 관심사 분리
* **Custom Hook 추상화**: debounce, observer, localStorage 등 제네릭 기반
* **디자인 시스템**: Polymorphic Box, Compound Pattern, 접근성 기준 적용
* **API 설계**: tRPC + Zod 기반 일관된 요청·응답 타입 구성
* **DX 최적화**: Biome 기반 포맷터, 린트 자동화, 빠른 피드백 루프

</br>

## 🧠 프로젝트 철학

> 단순히 만드는 게 목적이 아닙니다.
> **왜 이렇게 만들었는지 설명할 수 있는 구조**,
> 그리고 **내가 쓰고 싶은 경험**을 담는 것이 더 중요했습니다.

* 기술 선택에는 이유가 있어야 한다고 믿습니다.
* 디자인 시스템은 단순한 UI 도구가 아니라 **브랜드의 언어**입니다.
* 블로그는 글을 쓰는 공간이 아니라, **기억을 정리하는 방식**입니다.
* 사용자 경험은 구현 이후가 아니라 **기획 초기부터 설계해야 할 대상**입니다.

</br>

## 🔗 Demo & Docs

* 🌐 Live: [https://www.geojung.com](https://www.geojung.com)
* 🧪 Storybook: [Chromatic](https://664d5ae9bd834c32cc784632-uwgqtjvjge.chromatic.com)
* 📘 GitHub: [https://github.com/dgd03146/jung](https://github.com/dgd03146/jung)
* 📓 Blog: [https://www.geojung.com/ko/blog](https://www.geojung.com/ko/blog)

---

## 🙋‍♂️ 제작자

| 이름     | 임거정 (Jung)                                        |
| ------ | ------------------------------------------------- |
| Email  | [ibory1220@gmail.com](mailto:ibory1220@gmail.com) |
| GitHub | [@dgd03146](https://github.com/dgd03146)          |
| Blog   | [geojung.com](https://www.geojung.com/ko/blog)    |

</br>

## 🪪 License

MIT License © 2024 Jung


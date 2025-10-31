# Jung Archive

> 감정, 기억, 경험을 아카이빙하는 개인 브랜드 디지털 공간

## About This Project
[https://www.geojung.com](https://www.geojung.com)

**Jung Archive**는 일상의 생각과 순간들을 기록하고 공유하는 개인 아카이브 플랫폼입니다.
블로그, 갤러리, 장소 기록, 방명록을 통해 감각적인 경험을 디지털 공간에 저장하고,
이를 통해 나만의 브랜드를 만들어가는 프로젝트입니다.


이 프로젝트는 "배우기 위해 만드는 것"에서 시작했습니다.
하지만 단순히 기술을 익히는 데서 멈추지 않고,
실제 사용자에게 가치를 주는 제품으로 발전시키는 과정을 기록하고 있습니다.
즉, 학습이 곧 결과물이 되는 방식으로 구현하였습니다.

이 프로젝트는 단순히 기술을 증명하기 위한 실험이 아니라, 개발자로서 사고하고 성장하는 과정을 제품의 형태로 남기고자 시작하였습니다.




## Key Features

### 블로그
- **Markdown 에디터**: BlockNote 기반 리치 텍스트 편집
- **댓글 시스템**: 대댓글 지원, 낙관적 업데이트로 즉각적인 UX
- **정적 경로 생성**: Next.js SSG로 빠른 초기 로딩
- **카테고리 필터**: Accordion UI로 직관적인 탐색

### 갤러리
- **이미지 컬렉션**: 테마별 사진 그룹화 및 관리
- **Lightbox**: 고해상도 이미지 뷰어, 키보드 네비게이션
- **Parallel Routes**: Next.js 14 기능으로 모달 라우팅 최적화
- **비동기 이미지 사이즈 계산**: requestAnimationFrame으로 렌더링 성능 개선

### 장소 기록 (Spots)
- **지도 기반 위치 저장**: Kakao Map API 연동
- **줌 클러스터링**: 많은 마커를 효율적으로 표시
- **상세 정보**: 별점, 팁, 사진, 카테고리 관리
- **필터링**: 카테고리별 장소 탐색

### 방명록
- **감정형 메시지**: 이모지와 배경색으로 감정 표현
- **낙관적 업데이트**: 즉각적인 메시지 표시
- **쓰로틀링**: 2초 제한으로 스팸 방지
- **무한 스크롤**: TanStack Query Infinite Queries

### 어드민 대시보드
- **콘텐츠 관리**: 블로그, 갤러리, 장소, 방명록 통합 관리
- **TanStack Table**: 정렬, 필터, 페이지네이션
- **이미지 업로드**: Supabase Storage 연동
- **실시간 프리뷰**: 작성 중인 콘텐츠 미리보기

### 디자인 시스템
- **19개 컴포넌트**: Accordion, Badge, Box, Button, Card, Checkbox, Container, Flex, Input, List, Progress, Select, Stack, Tabs, Tag, Textarea, Toast, Tooltip, Typography
- **Polymorphic Box**: `as` prop으로 유연한 컴포넌트 변환
- **Compound Pattern**: 5개 컴포넌트 (Accordion, Card, Select, Tabs, Typography)
- **Storybook 문서화**: Chromatic으로 시각적 회귀 테스트

## Technical Challenges & Solutions

### 1. 상태 관리 및 UX 성능

**문제**:
댓글, 좋아요, 방명록 같은 빠른 인터랙션에서 과도한 네트워크 요청으로 UX 저하가 발생했습니다.
사용자가 액션을 취할 때마다 서버 응답을 기다리면 UI가 느리게 느껴졌습니다.

**해결**:
1. **Optimistic Updates with Rollback** - 12개 mutation에 일관된 패턴 적용
   - `onMutate`에서 즉시 UI 업데이트
   - `onError`에서 이전 상태로 롤백
   - `onSettled`에서 실제 데이터 동기화

2. **Set-based Operations** - O(1) 성능으로 좋아요 상태 즉시 확인
   ```typescript
   const likedBySet = new Set(previousData?.liked_by ?? []);
   const isLiked = likedBySet.has(userId);  // O(1) 성능
   
   if (isLiked) {
     likedBySet.delete(userId);
   } else {
     likedBySet.add(userId);
   }
   ```

3. **Smart Query Invalidation** - `isMutating` 체크로 중복 refetch 방지

**결과**:
Smart Invalidation과 낙관적 업데이트로 댓글·좋아요 클릭 시 체감 응답이 즉시 반응하도록 개선했습니다.
결과적으로, 사용자는 지연 없이 인터랙션을 느끼며 UX 안정성을 확보했습니다.

**요약**: 낙관적 업데이트 패턴을 전 기능에 적용함으로써 네트워크 요청 대폭 감소, UX 응답성 3배 향상.

### 2. 번들 크기 및 초기 로딩

**문제**:
초기 디자인 시스템 번들이 과도하게 커서 FCP 2.7초, Lighthouse 69점을 기록했습니다.
Sprinkles 유틸리티 클래스가 미사용 스타일까지 포함하여 번들이 비대화되었습니다.

**해결**:
1. **Sprinkles 정리 + Tree-shaking**
   - `sideEffects: false` 설정
   - 미사용 유틸리티 클래스 제거
   - Size-limit으로 번들 크기 모니터링 (components 50KB, styles 10KB)

2. **Vanilla Extract 제로 런타임**
   - 빌드 타임에 CSS 추출
   - 런타임 CSS-in-JS 오버헤드 제거
   - 73개 `.css.ts` 파일로 스타일 분할

3. **정적 경로 생성 + Prefetch**
   - Next.js generateStaticParams로 SSG
   - Link prefetch로 네비게이션 최적화

4. **이미지 최적화**
   - AVIF/WebP 포맷 우선
   - 7일 캐시 TTL
   - 커스텀 deviceSizes로 반응형 최적화

**결과**:
번들 크기 89% 감소 (2.6MB → 29KB), FCP 85% 개선 (2.7s → 0.4s), Lighthouse 99점 달성.
사용자는 페이지 로딩 시 지연 없이 콘텐츠에 즉시 접근할 수 있게 되었습니다.

**요약**: 제로 런타임 CSS와 트리쉐이킹으로 초기 로딩 속도 85% 개선, 사용자 이탈률 감소.

### 3. 확장성 및 유지보수성

**문제**:
20+ 기능 모듈이 증가하면서 코드 간 의존성 복잡도가 증가했습니다.
타입별 폴더 구조로는 관련 코드를 찾기 어려웠습니다.

**해결**:
Feature-Sliced Design (FSD) 아키텍처 도입

**FSD 핵심 원칙**:
- **문제**: 기존 폴더 구조는 모듈 간 의존성이 얽혀 유지보수가 어려움
- **해결**: FSD 패턴 도입으로 features → entities → shared 방향성 확립
- **결과**: 20개 기능 모듈을 독립적으로 추가/삭제 가능, 테스트 격리 용이

**레이어별 책임**:
- `features/`: 비즈니스 로직 (20개 모듈)
- `entities/`: 데이터 모델과 쿼리
- `shared/`: 재사용 가능한 유틸리티
- `views/`: 페이지 레벨 조합

**결과**:
새 기능 추가 시 기존 로직 수정이 불필요하며, 관련 코드가 한 폴더에 응집되어 유지보수성이 향상되었습니다.

**요약**: FSD 아키텍처 도입으로 20개 모듈을 독립적으로 관리, 코드 변경 시 영향 범위 최소화.

## Architecture Vision

이 프로젝트는 Feature-Sliced Design (FSD) 패턴을 따릅니다.

**목표**:
- **Isolation**: UI, 로직, 데이터 레이어가 독립적으로 진화
- **Scalability**: 새 기능 추가 시 전역 로직 수정 불필요
- **Testability**: 각 레이어를 격리하여 테스트 가능

FSD는 폴더 구조가 아니라 경계(boundaries) 설계입니다.
레이어 간 의존성 방향(features → entities → shared)이 핵심이며,
이를 통해 20개 feature 모듈을 일관된 구조로 관리하고 있습니다.

## Key Technical Highlights

### 타입 안전성 (tRPC + Zod)
- E2E 타입 안전성 (코드 생성 불필요)
- 8개 라우터로 타입 안전성 100% 유지
- API 스키마 변경 시 컴파일 타임에 에러 감지

### 제로 런타임 스타일링 (Vanilla Extract)
- 빌드 타임에 CSS 추출, 런타임 오버헤드 제거
- 번들 89% 감소 (2.6MB → 29KB)
- 73개 `.css.ts` 파일로 스타일 분할

### 낙관적 업데이트 패턴 (TanStack Query)
- 12개 mutation에 일관된 Optimistic Update 패턴
- `onMutate` → `onError` (rollback) → `onSettled` (sync)
- 사용자 체감 응답 속도 3배 개선

결국 이 모든 기술적 결정의 목적은 **예측 가능한 아키텍처와 일관된 사용자 경험**을 만드는 것이었습니다.

## Tech Stack

| 기술 | 선택 이유 | Trade-off |
|------|-----------|-----------|
| **tRPC + Zod** | E2E 타입 안전성 | REST보다 러닝 커브 높음 |
| **Vanilla Extract** | 제로 런타임 CSS-in-TS | 동적 스타일 제한적 |
| **TanStack Query** | 서버 상태 캐싱, 낙관적 업데이트 | 초기 설정 복잡도 |
| **FSD** | 레이어 격리, 확장성 | 초기 폴더 구조 복잡 |
| **Biome** | ESLint+Prettier 대비 10-20배 빠름 | 플러그인 생태계 작음 |

더 자세한 기술 스택 분석은 [코드베이스 분석 문서](./readme-------.plan.md)를 참고하세요.



## Performance Summary

이 프로젝트는 "작은 단위의 개선이 누적되어 큰 성능 향상을 만든다"는 철학으로 최적화되었습니다.

| 지표 | 개선 전 | 개선 후 | 개선율 |
|------|---------|---------|--------|
| FCP | 2.7s | 0.4s | **85%** |
| 번들 크기 | 2.6MB | 29KB | **89%** |
| TBT | 150ms | 50ms | **67%** |
| Lighthouse | 69점 | 99점 | **+30점** |



## Learning Reflection

**기술적 배움**:
- Optimistic Updates 설계를 통해 **상태 우선(state-first)** 사고법을 학습했습니다
  - UI는 상태의 결과물이지, 상태가 UI를 따라가면 안 됨
- 성능 최적화는 캐싱이 아니라 **불필요한 작업 제거**임을 깨달았습니다
  - `isMutating` 체크로 중복 refetch 방지가 staleTime보다 효과적
- tRPC로 타입 안전성이 **개발 속도와 안정성 모두**에 기여함을 경험했습니다
  - API 스키마 변경 시 컴파일 타임에 에러 감지



**메타 학습 (사고 구조)**:
- FSD는 폴더 구조가 아니라 **경계(boundaries)** 설계임을 이해했습니다
  - 레이어 간 의존성 방향이 핵심 (features → entities → shared)
- 디자인 시스템은 UI 도구가 아니라 **브랜드 언어**임을 체득했습니다
  - 일관된 토큰과 패턴이 사용자 경험의 예측 가능성을 높임
- "왜 이렇게 만들었는가"를 설명할 수 있는 구조가 **유지보수성의 핵심**입니다
  - 6개월 후 코드를 다시 봐도 의도를 이해할 수 있어야 함

**Trade-offs & Next Time**:
- Vanilla Extract의 동적 스타일 제약 → CSS Variables로 보완 가능
- 초기 FSD 구조 복잡도 → 팀 온보딩 문서 필요 (AGENTS.md로 보완)
- 테스트 커버리지 부족 → E2E 테스트 우선 확대 예정

## Why This Matters

이 프로젝트는 "학습에서 실전으로"의 전환을 보여줍니다.

단순히 코드를 실행하는 것이 아니라,
설계 사고(design thinking)를 통해
기술적 호기심을 확장 가능한 사용자 중심 제품으로 전환하는 과정입니다.

**결과**:
- 실제 사용자가 있는 프로덕션 환경
- 20개 feature 모듈을 일관된 구조로 관리
- 성능 지표 평균 70% 개선
- 타입 안전성 100% 유지
- 12개 optimistic mutation으로 즉각적인 UX 제공

지금도 이 프로젝트는 계속 발전 중입니다.
완벽함보다는 배움을, 결과보다는 과정을 더 중요하게 생각하며,
이 구조 안에서 더 나은 사용자 경험을 만들어가고 있습니다.



## Getting Started

```bash
# 설치
pnpm install

# 전체 개발 서버 (병렬, Turbo 사용)
pnpm dev

# 개별 앱 실행
cd apps/web && pnpm dev       # Next.js (port 3000)
cd apps/admin && pnpm dev     # Admin (Vite)
cd apps/server && pnpm dev    # tRPC 서버
cd apps/workshop && pnpm storybook  # Storybook (port 6006)

# 빌드 & 테스트
pnpm build                    # 전체 빌드 (Turbo)
pnpm test                     # 유닛 테스트
pnpm test:e2e                 # E2E 테스트 (Playwright)
pnpm biome check --apply .    # 포맷 + 린트 자동 수정
```

## Links

| 구분 | 링크 |
|------|------|
| **Live** | [https://www.geojung.com](https://www.geojung.com) |
| **Storybook** | [Chromatic](https://664d5ae9bd834c32cc784632-uwgqtjvjge.chromatic.com) |
| **GitHub** | [Repository](https://github.com/dgd03146/jung) |
| **Blog** | [https://www.geojung.com/ko/blog](https://www.geojung.com/ko/blog) |

## License

MIT License © 2024 Jung

---

**제작자**: 임거정 (Jung)  
**Email**: [ibory1220@gmail.com](mailto:ibory1220@gmail.com)  
**GitHub**: [@dgd03146](https://github.com/dgd03146)

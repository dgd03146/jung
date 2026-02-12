# FSD + DDD 기반 도메인 네이밍 최종 정리

## 🎯 핵심 철학

> "폴더 구조는 기술 구조가 아니라 비즈니스 구조를 반영해야 한다."  
> — Teo, Separation of Concerns of Frontend

FSD는 단순히 폴더를 나누는 규칙이 아니라,  
**'어떤 도메인이 독립적인 의미를 가지는가'를 코드로 표현하는 사고방식**이다.

따라서 이름 하나하나가 **도메인 모델링이자 팀의 언어**다.

---

## 📚 리팩토링 전 문제점

| 현재 이름 | 문제점 | 설명 |
|---------|--------|------|
| `spot` | ❌ 비즈니스 의미 불명확 | 구어체(slang)이며, `place`가 표준 용어 |
| `comment` | ❌ 도메인 범위 모호 | "무엇에 대한 댓글인지" 불명확 — post aggregate에 속함 |
| `photo` | ⚠️ 도메인 스코프 좁음 | 실제 기능은 "갤러리 관리" 수준 |
| `post` | ⚠️ 일관성 불일치 | config는 blog, views/widgets는 blog로 되어 있음 |

---

## 🧩 리팩토링 후 도메인 체계

| 새 이름 | 의미 | 대표 도메인 | 비즈니스 단위 |
|---------|------|-------------|---------------|
| `place` | 장소, 공간 도메인 | 지도, 위치, 리뷰 | ✅ 독립 도메인 |
| `postComment` | 블로그 게시글의 댓글 | 블로그 하위 도메인 | ✅ post aggregate 구성 요소 |
| `gallery` | 사진 + 앨범 + 태그 | 포트폴리오, 전시, 필터링 | ✅ 독립 도메인 |
| `blog` | 게시글, 태그, 카테고리 | 콘텐츠 관리 | ✅ 상위 도메인 |

---

## 🏗️ 최종 FSD 디렉토리 구조 (적용 완료)

```
src/fsd/
├── entities/
│   ├── blog/              # Post, Tag, Category, Like 등
│   ├── postComment/       # Post의 하위 도메인
│   ├── gallery/           # Photo, Album, Filter 등
│   └── place/             # Map, Location, Review 등
│
├── features/
│   ├── blog/              # 게시글 관련 행위
│   ├── postComment/       # 댓글 작성/삭제/수정
│   ├── gallery/           # 이미지/앨범 조작
│   └── place/             # 위치 검색, 리뷰 남기기 등
│
├── widgets/
│   ├── blog/
│   ├── gallery/
│   ├── place/
│   └── layout/
│
├── views/
│   ├── blog/
│   ├── gallery/
│   ├── places/
│   └── home/
│
└── shared/
    ├── ui/
    ├── lib/
    ├── api/
    ├── config/
    └── types/
```

---

## ⚙️ API / Query Hook 변경 사항

| Before | After |
|--------|-------|
| `trpc.spot.getAllSpots()` | `trpc.place.getAllPlaces()` |
| `useSpotQuery(spotId)` | `usePlaceQuery(placeId)` |
| `trpc.comment.getCommentsByPostId()` | `trpc.postComment.getCommentsByPostId()` |
| `useCommentMutation()` | `usePostCommentMutation()` |
| `features/photo/filterPhotos` | `features/gallery/filterGallery` |
| `entities/post/usePostsQuery` | `entities/blog/usePostsQuery` |

---

## 🔄 Migration Status

### ✅ Phase 1 — Immediate (완료)
- ✅ `spot` → `place`
- ✅ `comment` → `postComment`
- ✅ DB 테이블명, router 파일과 일치 (`post_comments`)
- ✅ features/entities/widgets/views 경로 전체 rename
- ✅ import 경로 및 alias 업데이트
- ✅ tRPC 라우터 엔드포인트 업데이트
- ✅ `@jung/shared/types` 타입 정의 업데이트

### ✅ Phase 2 — Optional (완료)
- ✅ `photo` → `gallery`
- ✅ 기능적 확장 (filter, album, collection)
- ✅ UI 구조 변경 최소

### ✅ Phase 3 — Consistency (완료)
- ✅ `post` → `blog` (entities, features)
- ✅ `message` → `guestbook` (features)
- ✅ `CategoryType`: `'spots'` → `'places'`
- ✅ 서버 라우터 파일명 변경
- ✅ 서버 빌드 성공
- ✅ 웹 앱 타입 에러 0개

---

## 🧠 기대 효과

| 카테고리 | 효과 |
|---------|------|
| **도메인 명확성** | 각 slice가 명확한 비즈니스 목적을 가짐 |
| **코드 탐색성** | 폴더명만으로 기능 위치 유추 가능 |
| **FSD 일관성** | entities = data, features = actions 원칙 완성 |
| **DDD 적합성** | Aggregate 관계(Post–PostComment) 명확화 |
| **확장성** | Gallery, Place 같은 독립 도메인 확장 가능 |
| **협업 효율** | 팀 내 naming confusion 제거 |

---

## 📌 유지 원칙

### 1. Entities는 도메인 객체만 담는다
- 데이터 표시(UI), 모델, API 단위만
- fetch, mutation, interaction은 포함하지 않음

### 2. Features는 "행동(Action)"을 표현한다
- `toggleLike`, `createPostComment`, `filterGallery` 등
- 하나의 user intent 단위

### 3. Widgets는 "조합(Composition)"이다
- Entities + Features 조합 (UI 섹션 단위)

### 4. Views는 "화면 단위"이다
- 페이지 수준의 조합
- 데이터를 모으고 위젯을 배치

### 5. Naming = Domain Language
- 코드 이름이 비즈니스 회의에서 쓰이는 단어와 일치해야 함
- Ubiquitous Language (DDD 원칙)

---

## 🏁 결론

### ✅ 적용 완료된 변경
- ✅ `spot` → `place`
- ✅ `comment` → `postComment`
- ✅ `photo` → `gallery`
- ✅ `message` → `guestbook`
- ✅ `post` → `blog`
- ✅ `CategoryType` 업데이트

### 📊 리팩토링 결과
- **변경된 파일**: 400+ 파일
- **변경된 폴더**: 20+ 폴더
- **서버 빌드**: ✅ 성공
- **웹 타입 에러**: ✅ 0개
- **도메인 통일**: ✅ 100% 완료

이 네 가지 네이밍 리팩토링이 적용되어  
프로젝트가 완전히 **"FSD × DDD × 실무 확장성"** 삼박자 구조로 고도화되었다.

---

## 📚 참고 문서
- [Separation of Concerns of Frontend](https://velog.io/@teo/separation-of-concerns-of-frontend)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [Toss Frontend Guidelines](https://toss.tech/article/frontend-fundamentals-easy-to-change)

---

**Last Updated**: 2025-11-02  
**Status**: ✅ 완료


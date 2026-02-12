# Technical Challenges & Solutions

이 문서는 Jung Archive 프로젝트에서 직면한 기술적 문제들과 해결 과정을 기록합니다.

---

## 1. 상태 관리 및 UX 성능

### 문제

댓글, 좋아요, 방명록 같은 빠른 인터랙션에서 과도한 네트워크 요청으로 UX 저하가 발생했습니다.

### 해결

#### Optimistic Updates with Rollback
12개 mutation에 일관된 패턴 적용

#### Set-based Operations
O(1) 성능으로 좋아요 상태 즉시 확인

#### Smart Query Invalidation
`isMutating` 체크로 중복 refetch 방지

### 결과
- 네트워크 요청 대폭 감소
- UX 응답성 3배 향상

---

## 2. 번들 크기 및 초기 로딩

### 문제
초기 디자인 시스템 번들이 과도하게 커서 FCP 2.7초, Lighthouse 69점을 기록했습니다.

### 해결
- Sprinkles 정리 + Tree-shaking
- Vanilla Extract 제로 런타임
- 정적 경로 생성 + Prefetch
- 이미지 최적화

### 결과
- 번들 크기 89% 감소 (2.6MB → 29KB)
- FCP 85% 개선 (2.7s → 0.4s)
- Lighthouse 99점 달성

---

## 3. 확장성 및 유지보수성

### 문제
20+ 기능 모듈이 증가하면서 코드 간 의존성 복잡도가 증가했습니다.

### 해결: Feature-Sliced Design (FSD)
- features → entities → shared 방향성 확립
- 20개 기능 모듈을 독립적으로 관리
- 테스트 격리 용이

---

## Trade-offs

| 기술 | 장점 | 단점 | 선택 이유 |
|------|------|------|-----------|
| **tRPC + Zod** | E2E 타입 안전성 | REST보다 러닝 커브 높음 | 컴파일 타임 에러 감지 |
| **Vanilla Extract** | 제로 런타임 | 동적 스타일 제한적 | 번들 89% 감소 |
| **TanStack Query** | 캐싱, Optimistic Updates | 초기 설정 복잡도 | 응답 속도 3배 개선 |
| **FSD** | 레이어 격리 | 초기 폴더 구조 복잡 | 독립 관리 |
| **Gemini** | 무료 1500 RPM | OpenAI보다 정확도 낮음 | 무료 RAG 구현 |
| **Cloudflare R2** | 저렴 | 마이그레이션 비용 | 장기적 비용 절감 |

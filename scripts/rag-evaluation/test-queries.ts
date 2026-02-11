export interface TestQuery {
	query: string;
	expectedPostIds: string[];
	category: string;
}

export const testQueries: TestQuery[] = [
	{
		query: '성능 최적화',
		expectedPostIds: ['122', '118'], // 느린 페이지, 스크롤 최적화
		category: 'performance',
	},
	{
		query: 'Next.js 렌더링',
		expectedPostIds: ['122'], // 느린 페이지 (Next.js 관련)
		category: 'performance',
	},
	{
		query: '페이지 로딩 속도 개선',
		expectedPostIds: ['122'], // 느린 페이지
		category: 'performance',
	},
	{
		query: '스크롤 이벤트 처리',
		expectedPostIds: ['118'], // 스크롤 이벤트 최적화
		category: 'performance',
	},
	{
		query: 'RequestAnimationFrame',
		expectedPostIds: ['118'], // 스크롤 이벤트 최적화 (RAF 사용)
		category: 'performance',
	},

	{
		query: 'vanilla-extract',
		expectedPostIds: ['120', '115'], // vanilla-extract 글, Polymorphic 컴포넌트
		category: 'styling',
	},
	{
		query: 'CSS-in-JS',
		expectedPostIds: ['120'], // CSS-in-JS를 넘어서다
		category: 'styling',
	},
	{
		query: 'Polymorphic 컴포넌트',
		expectedPostIds: ['115'], // Polymorphic 구현기
		category: 'styling',
	},
	{
		query: '타입 안전한 스타일링',
		expectedPostIds: ['120', '115'], // vanilla-extract, Polymorphic
		category: 'styling',
	},

	{
		query: '코드 품질 향상',
		expectedPostIds: ['121'], // 프론트엔드 코드 품질
		category: 'code-quality',
	},
	{
		query: 'Clean Code',
		expectedPostIds: ['121'], // 코드 품질
		category: 'code-quality',
	},
	{
		query: '변경하기 쉬운 코드',
		expectedPostIds: ['121'], // 코드 품질
		category: 'code-quality',
	},
	{
		query: 'Product Engineer',
		expectedPostIds: ['123', '124'], // 어떤 개발자, 프로덕트
		category: 'code-quality',
	},

	{
		query: '사이드 프로젝트',
		expectedPostIds: ['116'], // 첫 번째 유저
		category: 'experience',
	},
	{
		query: '인턴십 회고',
		expectedPostIds: ['124'], // 프로덕트 살아있나요
		category: 'experience',
	},
	{
		query: '개발자 성장',
		expectedPostIds: ['123', '114'], // 어떤 개발자, 2024 회고
		category: 'experience',
	},
	{
		query: '2024년 회고',
		expectedPostIds: ['114'], // Debug: 2024
		category: 'experience',
	},

	{
		query: '영국 워홀',
		expectedPostIds: ['113'], // 영국으로 떠나다
		category: 'london',
	},
	{
		query: '런던 생활',
		expectedPostIds: ['117', '113'], // 토트넘, 영국으로
		category: 'london',
	},
	{
		query: '노팅힐 여행',
		expectedPostIds: ['119'], // 노팅힐
		category: 'london',
	},
];

export function getQueryStats() {
	const stats = testQueries.reduce(
		(acc, q) => {
			acc[q.category] = (acc[q.category] || 0) + 1;
			return acc;
		},
		{} as Record<string, number>,
	);

	return {
		total: testQueries.length,
		byCategory: stats,
	};
}

import type { Category } from '../types/category';

export const CATEGORIES: Category[] = [
	{
		id: 'all',
		name: 'all',
		displayName: { ko: '전체', en: 'All' },
	},
	{
		id: 'life',
		name: 'life',
		displayName: { ko: '일상', en: 'Life' },
		description: {
			ko: '일상 생활에 관한 이야기',
			en: 'Stories about everyday life',
		},
	},
	{
		id: 'travel',
		name: 'travel',
		displayName: { ko: '여행', en: 'Travel' },
		description: {
			ko: '여행 경험과 팁',
			en: 'Travel experiences and tips',
		},
	},
	{
		id: 'food',
		name: 'food',
		displayName: { ko: '음식', en: 'Food' },
		description: {
			ko: '맛집 리뷰와 요리 레시피',
			en: 'Restaurant reviews and cooking recipes',
		},
	},
	{
		id: 'fashion',
		name: 'fashion',
		displayName: { ko: '패션', en: 'Fashion' },
		description: {
			ko: '최신 패션 트렌드와 스타일 팁',
			en: 'Latest fashion trends and style tips',
		},
	},
	{
		id: 'culture',
		name: 'culture',
		displayName: { ko: '문화', en: 'Culture' },
		description: {
			ko: '문화, 예술, 엔터테인먼트 소식',
			en: 'News about culture, art, and entertainment',
		},
	},
];

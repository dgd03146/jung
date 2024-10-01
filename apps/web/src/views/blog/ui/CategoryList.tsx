import { Container, Flex, Tag } from '@jung/design-system/components';
import Link from 'next/link';

const categories = [
	{ name: 'all', href: '/blog?cat=all' },
	{ name: 'life', href: '/blog?cat=life' },
	{ name: 'travel', href: '/blog?cat=travel' },
	{ name: 'food', href: '/blog?cat=food' },
	{ name: 'fashion', href: '/blog?cat=fashion' },
	{ name: 'culture', href: '/blog?cat=culture' },
];

const CategoryList = () => {
	return (
		<Container marginBottom='4'>
			<Flex flexWrap={{ mobile: 'wrap', miniTablet: 'nowrap' }} gap='1'>
				{categories.map((category) => (
					<Link key={category.name} href={category.href}>
						<Tag
							rounded
							transitionDuration='500'
							background={{ hover: 'primary' }}
							color={{ hover: 'white' }}
						>
							{category.name}
						</Tag>
					</Link>
				))}
			</Flex>
		</Container>
	);
};

export default CategoryList;

// Style: 패션 트렌드, 스타일링 팁, 액세서리 등
// Fashion: 의류 리뷰, 패션 브랜드 소개, 시즌별 패션 가이드 등
// Food: 레시피, 레스토랑 리뷰, 요리 팁, 식문화 등
// Travel: 여행지 추천, 여행 팁, 문화 체험 등
// Culture: 예술, 음악, 영화, 책, 전시회 리뷰 등

import { Container, Flex, Tag } from '@jung/design-system/components';
import Link from 'next/link';

const CategoryList = () => {
	return (
		<Container marginBottom='4'>
			<Flex columnGap='1'>
				<Link href='/blog?cat=life'>
					<Tag rounded>life</Tag>
				</Link>
				<Link href='/blog?cat=style'>
					<Tag rounded>travel</Tag>
				</Link>
				<Link href='/blog?cat=style'>
					<Tag rounded>food</Tag>
				</Link>
				<Link href='/blog?cat=style'>
					<Tag rounded>fashion</Tag>
				</Link>
				<Link href='/blog?cat=style'>
					<Tag rounded>culture</Tag>
				</Link>
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

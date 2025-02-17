import { siteUrl } from '@/fsd/shared';
import { HydrateClient, trpc } from '@/fsd/shared/index.server';
import { GalleryPage } from '@/fsd/views/gallery';
import type { Metadata } from 'next';

type Sort = 'latest' | 'popular';

type PageProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
	title: 'Trending Photos • Gallery',
	description:
		'많은 사람들이 좋아하는 인기 여행 사진과 일상 기록들을 만나보세요.',
	openGraph: {
		title: 'JUNG (@jung) • Trending Gallery',
		description:
			'많은 사람들이 좋아하는 인기 여행 사진과 일상 기록들을 만나보세요.',
		type: 'website',
		siteName: 'JUNG Gallery',
		locale: 'ko_KR',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Trending Photos • JUNG Gallery',
		creator: '@jung',
		description:
			'많은 사람들이 좋아하는 인기 여행 사진과 일상 기록들을 만나보세요.',
	},
	keywords: [
		'JUNG',
		'인기 사진',
		'트렌딩',
		'갤러리',
		'여행',
		'일상',
		'trending photos',
		'popular gallery',
	],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	alternates: {
		canonical: `${siteUrl}/gallery/trending`,
		languages: {
			en: `${siteUrl}/en/gallery/trending`,
			ko: `${siteUrl}/ko/gallery/trending`,
		},
	},
};

export default function TrendingPage({ searchParams }: PageProps) {
	const sort: Sort = 'popular';
	const q = (searchParams.q as string) || '';

	void trpc.photos.getAllPhotos.prefetchInfinite({
		limit: 8,
		sort,
		q,
	});

	return (
		<HydrateClient>
			<GalleryPage />
		</HydrateClient>
	);
}

import { SPOT_PARAMS } from '@/fsd/entities/spot';
import { siteUrl } from '@/fsd/shared';
import { HydrateClient, getCategories, trpc } from '@/fsd/shared/index.server';
import { SpotsPage } from '@/fsd/views';
import type { SpotSort } from '@jung/shared/types';
import type { Metadata } from 'next';

type PageProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
	title: 'Spots',
	description:
		'어디선가 우연히 마주친 공간, 특별한 순간을 채운 장소, 다시 찾고 싶은 나만의 스팟을 기록합니다',
	openGraph: {
		title: '나만의 스팟',
		description:
			'어디선가 우연히 마주친 공간, 특별한 순간을 채운 장소, 다시 찾고 싶은 나만의 스팟을 기록합니다.',
		type: 'website',
		siteName: 'JUNG',
		locale: 'ko_KR',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Spots • 내가 좋았던 장소들',
		creator: '@jung',
		description:
			'어디선가 우연히 마주친 공간, 특별한 순간을 채운 장소, 다시 찾고 싶은 나만의 스팟을 기록합니다.',
	},
	keywords: [
		'JUNG',
		'나만의 스팟',
		'좋았던 곳',
		'숨은 장소',
		'특별한 공간',
		'추천 장소',
		'기억하고 싶은 곳',
		'my spots',
		'favorite places',
	],
	alternates: {
		canonical: `${siteUrl}/spots`,
		languages: {
			en: `${siteUrl}/en/spots`,
			ko: `${siteUrl}/ko/spots`,
		},
	},
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
};

export default async function Page({ searchParams }: PageProps) {
	const sort = (searchParams.sort as SpotSort) || SPOT_PARAMS.SORT;
	const q = (searchParams.q as string) || SPOT_PARAMS.QUERY;
	const cat = (searchParams.category_id as string) || SPOT_PARAMS.CAT;

	const categories = await getCategories('spots');
	void trpc.spot.getAllSpots.prefetchInfinite({
		limit: SPOT_PARAMS.LIMIT,
		sort,
		cat,
		q,
	});

	return (
		<HydrateClient>
			<SpotsPage categories={categories} />
		</HydrateClient>
	);
}

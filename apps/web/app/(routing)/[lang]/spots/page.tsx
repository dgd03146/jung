import { SPOT_PARAMS } from '@/fsd/entities/spot';
import { siteUrl } from '@/fsd/shared';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';
import { SpotsPage } from '@/fsd/views';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';

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

export const revalidate = 21600;

export default async function Page() {
	const queryClient = getQueryClient();

	await queryClient.prefetchInfiniteQuery(
		trpc.spot.getAllSpots.infiniteQueryOptions({
			limit: SPOT_PARAMS.LIMIT,
			sort: SPOT_PARAMS.SORT,
			cat: SPOT_PARAMS.CAT,
			q: SPOT_PARAMS.QUERY,
		}),
	);

	await queryClient.prefetchQuery(
		trpc.category.getCategories.queryOptions({ type: 'spots' }),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<SpotsPage />
		</HydrationBoundary>
	);
}

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { PLACE_DEFAULTS } from '@/fsd/entities/place';
import {
	getApiUrl,
	getGoogleVerificationCode,
	SUPPORTED_LANGS,
} from '@/fsd/shared';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';
import { PlacesLayout } from './_components/PlacesLayout';

export const metadata: Metadata = {
	title: 'Places',
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
		title: 'Places • 내가 좋았던 장소들',
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
		'my places',
		'favorite places',
	],
	alternates: {
		canonical: `${getApiUrl()}/places`,
		languages: {
			en: `${getApiUrl()}/en/places`,
			ko: `${getApiUrl()}/ko/places`,
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
	verification: {
		google: getGoogleVerificationCode(),
	},
};

export const revalidate = 21600;

export async function generateStaticParams() {
	return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export default async function Page() {
	const queryClient = getQueryClient();

	await queryClient.prefetchInfiniteQuery(
		trpc.place.getAllPlaces.infiniteQueryOptions({
			limit: PLACE_DEFAULTS.LIMIT,
			sort: PLACE_DEFAULTS.SORT,
			cat: PLACE_DEFAULTS.CAT,
			q: PLACE_DEFAULTS.QUERY,
		}),
	);

	queryClient.prefetchQuery(
		trpc.category.getCategories.queryOptions({ type: 'places' }),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<PlacesLayout />
		</HydrationBoundary>
	);
}

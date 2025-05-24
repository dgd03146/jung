import { TRENDING_PHOTO_DEFAULTS } from '@/fsd/entities';
import { FilteredPhotoList } from '@/fsd/features/photo';
import {
	LoadingSpinner,
	SUPPORTED_LANGS,
	getApiUrl,
	getGoogleVerificationCode,
} from '@/fsd/shared';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';
import { Flex } from '@jung/design-system/components';

import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';

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
		canonical: `${getApiUrl()}/gallery/trending`,
		languages: {
			en: `${getApiUrl()}/en/gallery/trending`,
			ko: `${getApiUrl()}/ko/gallery/trending`,
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

export default function TrendingPage() {
	const queryClient = getQueryClient();

	queryClient.prefetchInfiniteQuery(
		trpc.photos.getAllPhotos.infiniteQueryOptions({
			limit: TRENDING_PHOTO_DEFAULTS.LIMIT,
			sort: TRENDING_PHOTO_DEFAULTS.SORT,
			q: TRENDING_PHOTO_DEFAULTS.QUERY,
		}),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Suspense
				fallback={
					<Flex justify='center' align='center' height='1/4'>
						<LoadingSpinner size='medium' />
					</Flex>
				}
			>
				<FilteredPhotoList isTrending />
			</Suspense>
		</HydrationBoundary>
	);
}

import { Flex } from '@jung/design-system/components';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PHOTO_DEFAULTS } from '@/fsd/entities/gallery';
import { FilteredPhotoList } from '@/fsd/features/gallery';
import {
	getApiUrl,
	getGoogleVerificationCode,
	LoadingSpinner,
	SUPPORTED_LANGS,
} from '@/fsd/shared';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';

export const metadata: Metadata = {
	title: 'Gallery',
	description: '여행하면서 담아온 순간들과 일상의 기록들을 공유합니다.',
	openGraph: {
		title: 'JUNG (@jung) • Photo Gallery',
		description: '여행하면서 담아온 순간들과 일상의 기록들을 공유합니다.',
		type: 'website',
		siteName: 'JUNG Gallery',
		locale: 'ko_KR',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Gallery • JUNG',
		creator: '@jung',
		description: '여행하면서 담아온 순간들과 일상의 기록들을 공유합니다.',
	},
	keywords: [
		'JUNG',
		'갤러리',
		'사진',
		'여행',
		'일상',
		'포토',
		'travel photos',
		'daily life',
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
		canonical: `${getApiUrl()}/gallery`,
		languages: {
			en: `${getApiUrl()}/en/gallery`,
			ko: `${getApiUrl()}/ko/gallery`,
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

export default function Page() {
	const queryClient = getQueryClient();

	queryClient.prefetchInfiniteQuery(
		trpc.gallery.getAllPhotos.infiniteQueryOptions({
			limit: PHOTO_DEFAULTS.LIMIT,
			sort: PHOTO_DEFAULTS.SORT,
			q: PHOTO_DEFAULTS.QUERY,
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
				<FilteredPhotoList />
			</Suspense>
		</HydrationBoundary>
	);
}

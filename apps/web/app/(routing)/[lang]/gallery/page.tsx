import { PHOTO_PARAMS } from '@/fsd/entities/photo';
import { LoadingSpinner, siteUrl } from '@/fsd/shared';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';
import { GalleryContent } from '@/fsd/views/gallery';
import { Flex } from '@jung/design-system/components';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';

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
		canonical: `${siteUrl}/gallery`,
		languages: {
			en: `${siteUrl}/en/gallery`,
			ko: `${siteUrl}/ko/gallery`,
		},
	},
};

export const revalidate = 21600;

export default function Page() {
	const queryClient = getQueryClient();

	queryClient.prefetchInfiniteQuery(
		trpc.photos.getAllPhotos.infiniteQueryOptions({
			limit: PHOTO_PARAMS.LIMIT,
			sort: PHOTO_PARAMS.SORT,
			q: PHOTO_PARAMS.QUERY,
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
				<GalleryContent />
			</Suspense>
		</HydrationBoundary>
	);
}

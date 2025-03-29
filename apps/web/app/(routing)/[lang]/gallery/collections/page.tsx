import { COLLECTION_DEFAULTS } from '@/fsd/entities/photo';
import {
	LoadingSpinner,
	SUPPORTED_LANGS,
	getApiUrl,
	getGoogleVerificationCode,
} from '@/fsd/shared';
import { caller, getQueryClient, trpc } from '@/fsd/shared/index.server';
import { CollectionContent } from '@/fsd/views/gallery';
import { Flex } from '@jung/design-system/components';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
	try {
		const collections = await caller.photoCollections.getAllCollections({
			sort: COLLECTION_DEFAULTS.sort,
		});

		const collectionNames = collections
			.slice(0, 3)
			.map((collection) => collection.title)
			.join(', ');

		return {
			title: 'Photo Collections • Gallery',
			description: `${collectionNames} 등 다양한 테마의 사진 컬렉션을 둘러보세요.`,
			openGraph: {
				title: 'JUNG (@jung) • Photo Collections',
				description: `${collectionNames} 등 다양한 테마의 사진 컬렉션을 둘러보세요.`,
				type: 'website',
				siteName: 'JUNG Gallery',
				locale: 'ko_KR',
				images: [
					{
						url:
							collections[0]?.cover_image ||
							'/images/og/collections-default.jpg',
						width: 1200,
						height: 630,
						alt: 'JUNG Gallery Collections',
					},
				],
			},
			twitter: {
				card: 'summary_large_image',
				title: 'Photo Collections • JUNG Gallery',
				creator: '@jung',
				description: `${collectionNames} 등 다양한 테마의 사진 컬렉션을 둘러보세요.`,
				images: [
					collections[0]?.cover_image || '/images/og/collections-default.jpg',
				],
			},
			keywords: [
				'JUNG',
				'사진 컬렉션',
				'테마 갤러리',
				'여행',
				'일상',
				'photo collections',
				'themed gallery',
				...collections.slice(0, 5).map((c) => c.title),
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
				canonical: `${getApiUrl()}/gallery/collections`,
				languages: {
					en: `${getApiUrl()}/en/gallery/collections`,
					ko: `${getApiUrl()}/ko/gallery/collections`,
				},
			},
			verification: {
				google: getGoogleVerificationCode(),
			},
		};
	} catch (error) {
		console.error('Error generating metadata:', error);

		return {
			title: 'Photo Collections • JUNG Gallery',
			description: '다양한 테마의 사진 컬렉션을 둘러보세요.',
			robots: { index: true },
		};
	}
}

export const revalidate = 21600;

export async function generateStaticParams() {
	return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export default function CollectionsPage() {
	const queryClient = getQueryClient();

	queryClient.prefetchQuery(
		trpc.photoCollections.getAllCollections.queryOptions({
			sort: COLLECTION_DEFAULTS.sort,
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
				<CollectionContent />
			</Suspense>
		</HydrationBoundary>
	);
}

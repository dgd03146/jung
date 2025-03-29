import { COLLECTION_DEFAULTS } from '@/fsd/entities/photo';
import {
	LoadingSpinner,
	SUPPORTED_LANGS,
	getApiUrl,
	getGoogleVerificationCode,
} from '@/fsd/shared';
import { caller, getQueryClient, trpc } from '@/fsd/shared/index.server';
import { CollectionDetailPage } from '@/fsd/views/gallery';
import { Flex } from '@jung/design-system/components';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';

interface PageProps {
	params: {
		id: string;
	};
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	try {
		const collection = await caller.photoCollections.getCollectionById(
			params.id,
		);

		if (!collection) {
			return {
				title: 'Collection Not Found • JUNG Gallery',
				description: '요청하신 컬렉션을 찾을 수 없습니다.',
				robots: { index: false },
			};
		}

		const photoCount = collection.photos?.length || 0;
		const locationInfo = collection.collection.title
			? `${collection.collection.title}의 `
			: '';

		return {
			title: `${collection.collection.title} • Gallery`,
			description:
				collection.collection.description ||
				`${locationInfo}${photoCount}장의 사진으로 구성된 컬렉션입니다.`,
			openGraph: {
				title: `JUNG (@jung) • ${collection.collection.title} Collection`,
				description:
					collection.collection.description ||
					`${locationInfo}${photoCount}장의 사진으로 구성된 컬렉션입니다.`,
				type: 'article',

				authors: ['JUNG'],
				siteName: 'JUNG Gallery',
				locale: 'ko_KR',
			},
			twitter: {
				card: 'summary_large_image',
				title: `${collection.collection.title} • Gallery`,
				creator: '@jung',
				description:
					collection.collection.description ||
					`${locationInfo}${photoCount}장의 사진으로 구성된 컬렉션입니다.`,
			},
			keywords: [
				'JUNG',
				'갤러리',
				'사진 컬렉션',
				collection.collection.title,

				'여행',
				'일상',
			].filter(Boolean),
			alternates: {
				canonical: `${getApiUrl}/gallery/collections/${params.id}`,
				languages: {
					en: `${getApiUrl}/en/gallery/collections/${params.id}`,
					ko: `${getApiUrl}/ko/gallery/collections/${params.id}`,
				},
			},
			verification: {
				google: getGoogleVerificationCode(),
			},
		};
	} catch (error) {
		console.error('Error generating metadata:', error);

		return {
			title: 'Photo Collection • JUNG Gallery',
			description: 'JUNG의 갤러리 컬렉션을 감상해보세요.',
			robots: { index: false },
		};
	}
}

export const revalidate = 21600;

export async function generateStaticParams() {
	const collections = await caller.photoCollections.getAllCollections({
		sort: COLLECTION_DEFAULTS.sort,
	});

	const CollectionIds = collections.map((collection) => collection.id);

	const params = [];
	for (const lang of SUPPORTED_LANGS) {
		for (const id of CollectionIds) {
			params.push({ lang, id });
		}
	}
	return params;
}

export default async function Page({ params }: PageProps) {
	const { id: collectionId } = params;
	const queryClient = getQueryClient();

	queryClient.prefetchQuery(
		trpc.photoCollections.getCollectionById.queryOptions(collectionId),
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
				<CollectionDetailPage collectionId={collectionId} />
			</Suspense>
		</HydrationBoundary>
	);
}

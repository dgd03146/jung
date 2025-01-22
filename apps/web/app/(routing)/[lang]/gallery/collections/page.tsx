import { PhotoNavigation } from '@/fsd/features';
import { CollectionGrid } from '@/fsd/features/gallery/photos/ui/CollectionGrid';
import { LoadingSpinner } from '@/fsd/shared';
import { HydrateClient, trpc } from '@/fsd/shared/index.server';
import type { Metadata } from 'next';
import { Suspense } from 'react';

type Sort = 'latest' | 'popular';

type PageProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
	searchParams,
}: PageProps): Promise<Metadata> {
	try {
		const collections = await trpc.photoCollections.getAllCollections({
			sort: (searchParams.sort as Sort) || 'latest',
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
				canonical: 'https://your-domain.com/gallery/collections',
				languages: {
					en: 'https://your-domain.com/en/gallery/collections',
					ko: 'https://your-domain.com/ko/gallery/collections',
				},
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

export default function CollectionsPage({ searchParams }: PageProps) {
	const sort = (searchParams.sort as Sort) || 'latest';

	void trpc.photoCollections.getAllCollections.prefetch({
		sort,
	});

	return (
		<>
			<PhotoNavigation />
			<HydrateClient>
				<Suspense fallback={<LoadingSpinner />}>
					<CollectionGrid />
				</Suspense>
			</HydrateClient>
		</>
	);
}

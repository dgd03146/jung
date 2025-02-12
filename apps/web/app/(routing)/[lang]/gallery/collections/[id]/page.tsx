import { HydrateClient, trpc } from '@/fsd/shared/index.server';
import { CollectionDetailPage } from '@/fsd/views/gallery';
import type { Metadata } from 'next';

interface PageProps {
	params: {
		id: string;
		lang: string;
	};
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	try {
		const collection = await trpc.photoCollections.getCollectionById(params.id);

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
				images: [
					{
						url:
							collection.collection.cover_image ||
							collection.photos?.[0]?.imageUrl ||
							'/images/og/collection-default.jpg',
						width: 1200,
						height: 630,
						alt: `${collection.collection.title} Collection`,
					},
				],
			},
			twitter: {
				card: 'summary_large_image',
				title: `${collection.collection.title} • Gallery`,
				creator: '@jung',
				description:
					collection.collection.description ||
					`${locationInfo}${photoCount}장의 사진으로 구성된 컬렉션입니다.`,
				images: [
					collection.collection.cover_image ||
						collection.photos?.[0]?.imageUrl ||
						'/images/og/collection-default.jpg',
				],
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
				canonical: `https://your-domain.com/gallery/collections/${params.id}`,
				languages: {
					en: `https://your-domain.com/en/gallery/collections/${params.id}`,
					ko: `https://your-domain.com/ko/gallery/collections/${params.id}`,
				},
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

export default async function Page({ params }: PageProps) {
	const { id: collectionId } = params;

	void trpc.photoCollections.getCollectionById.prefetch(collectionId);

	return (
		<HydrateClient>
			<CollectionDetailPage collectionId={collectionId} />
		</HydrateClient>
	);
}

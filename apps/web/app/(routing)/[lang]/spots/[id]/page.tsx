import { HydrateClient, trpc } from '@/fsd/shared/index.server';
import { SpotDetailPage } from '@/fsd/views';
import type { Metadata } from 'next';

export async function generateMetadata({
	params,
}: {
	params: { id: string; lang: string };
}): Promise<Metadata> {
	try {
		const spot = await trpc.spot.getSpotById(params.id);

		if (!spot) {
			return {
				title: 'Spot Not Found',
				description: '요청하신 스팟을 찾을 수 없습니다.',
				robots: { index: false },
			};
		}

		return {
			title: `${spot.title}`,
			description:
				spot.description ||
				`${spot.title}의 상세 정보와 추천 포인트를 확인해보세요.`,
			openGraph: {
				title: `${spot.title}`,
				description:
					spot.description ||
					`	${spot.title}의 상세 정보와 추천 포인트를 확인해보세요.`,
				type: 'article',
				publishedTime: spot.created_at,
				modifiedTime: spot.updated_at,
				authors: ['JUNG'],
				siteName: 'JUNG Travel Spots',
				locale: 'ko_KR',
				images: [
					{
						url: spot.photos[0]?.url || '/images/og/spot-default.jpg',
						width: 1200,
						height: 630,
						alt: `${spot.title}`,
					},
				],
			},
			twitter: {
				card: 'summary_large_image',
				title: `${spot.title}`,
				creator: '@jung',
				description:
					spot.description ||
					`${spot.title}의 상세 정보와 추천 포인트를 확인해보세요.`,
				images: [spot.photos[0]?.url || '/images/og/spot-default.jpg'],
			},
			keywords: [
				spot.title,
				spot.category,
				'여행',
				'여행지 추천',
				'travel spot',
				...(spot.tags || []),
			].filter(Boolean),
			alternates: {
				canonical: `https://your-domain.com/spots/${params.id}`,
				languages: {
					en: `https://your-domain.com/en/spots/${params.id}`,
					ko: `https://your-domain.com/ko/spots/${params.id}`,
				},
			},
			authors: [{ name: 'JUNG', url: 'https://your-domain.com' }],
		};
	} catch (error) {
		console.error('Error generating metadata:', error);

		return {
			title: 'Spot',
			description: 'JUNG이 추천하는 스팟을 확인해보세요.',
			robots: { index: false },
		};
	}
}

export default async function Page({ params }: { params: { id: string } }) {
	const spotId = params.id;

	void trpc.spot.getSpotById.prefetch(spotId);

	return (
		<HydrateClient>
			<SpotDetailPage spotId={spotId} />
		</HydrateClient>
	);
}

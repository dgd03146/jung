import { PhotoDetailSkeleton } from '@/fsd/entities/photo';
import { siteUrl } from '@/fsd/shared';
import { caller, getQueryClient, trpc } from '@/fsd/shared/index.server';
import { PhotoDetailPage } from '@/fsd/views/gallery';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata({
	params,
}: {
	params: { id: string; lang: string };
}): Promise<Metadata> {
	try {
		const photo = await caller.photos.getPhotoById(params.id);

		if (!photo) {
			return {
				title: 'Photo Not Found • JUNG Gallery',
				description: '요청하신 사진을 찾을 수 없습니다.',
				robots: { index: false },
			};
		}

		const formattedDate = new Intl.DateTimeFormat('ko-KR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}).format(new Date(photo.created_at));

		return {
			title: `${photo.title || '무제'} • JUNG Gallery`,
			description:
				photo.description ||
				`${formattedDate}에 촬영된 ${photo.alt || ''}의 순간`,
			openGraph: {
				title: `JUNG (@jung) • ${photo.title || '무제'}`,
				description:
					photo.description ||
					`${formattedDate}에 촬영된 ${photo.alt || ''}의 순간`,
				type: 'article',
				publishedTime: photo.created_at,
				authors: ['JUNG'],
				siteName: 'JUNG Gallery',
				locale: 'ko_KR',
				images: [
					{
						url: photo.image_url,
						width: photo.width || 1200,
						height: photo.height || 800,
						alt: photo.title || '갤러리 사진',
					},
				],
			},
			twitter: {
				card: 'summary_large_image',
				title: `${photo.title || '무제'} • JUNG Gallery`,
				creator: '@jung',
				description:
					photo.description ||
					`${formattedDate}에 촬영된 ${photo.alt || ''}의 순간`,
				images: [photo.image_url],
			},
			keywords: [
				'JUNG',
				'갤러리',
				photo.title,
				photo.alt,
				...(photo.tags || []),
				'여행',
				'일상',
			].filter(Boolean),
			alternates: {
				canonical: `${siteUrl}/gallery/photo/${params.id}`,
				languages: {
					en: `${siteUrl}/en/gallery/photo/${params.id}`,
					ko: `${siteUrl}/ko/gallery/photo/${params.id}`,
				},
			},
		};
	} catch (error) {
		console.error('Error generating metadata:', error);

		return {
			title: 'Gallery Photo • JUNG',
			description: 'JUNG의 갤러리 사진을 감상해보세요.',
			robots: { index: false },
		};
	}
}

export const revalidate = 21600;

export async function generateStaticParams() {
	return [];
}

export default function PhotoPage({
	params,
}: {
	params: { id: string };
}) {
	const photoId = params.id;

	const queryClient = getQueryClient();
	queryClient.prefetchQuery(trpc.photos.getPhotoById.queryOptions(photoId));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Suspense fallback={<PhotoDetailSkeleton />}>
				<PhotoDetailPage photoId={params.id} isModal={false} />
			</Suspense>
		</HydrationBoundary>
	);
}

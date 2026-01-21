import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PHOTO_DEFAULTS } from '@/fsd/entities/gallery';
import {
	createBreadcrumbSchema,
	createImageObjectSchema,
	getApiUrl,
	getGoogleVerificationCode,
	SUPPORTED_LANGS,
} from '@/fsd/shared';
import { getCaller, getQueryClient, trpc } from '@/fsd/shared/index.server';
import { JsonLd } from '@/fsd/shared/ui';
import { PhotoDetailPage } from '@/fsd/views/gallery';
import { PhotoDetailSkeleton } from '@/fsd/views/gallery/ui';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	try {
		const photo = await getCaller().gallery.getPhotoById(id);

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
				canonical: `${getApiUrl()}/gallery/photo/${id}`,
				languages: {
					en: `${getApiUrl()}/en/gallery/photo/${id}`,
					ko: `${getApiUrl()}/ko/gallery/photo/${id}`,
				},
			},
			verification: {
				google: getGoogleVerificationCode(),
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
	const photos = await getCaller().gallery.getAllPhotos({
		limit: PHOTO_DEFAULTS.LIMIT,
		sort: PHOTO_DEFAULTS.SORT,
		q: PHOTO_DEFAULTS.QUERY,
	});

	const PhotoIds = photos.items.map((photo) => photo.id);

	const params = [];
	for (const locale of SUPPORTED_LANGS) {
		for (const id of PhotoIds) {
			params.push({ locale, id: String(id) });
		}
	}

	return params;
}

export default async function PhotoPage({
	params,
}: {
	params: Promise<{ id: string; locale: string }>;
}) {
	const { id: photoId, locale } = await params;

	const queryClient = getQueryClient();

	const photo = await getCaller().gallery.getPhotoById(photoId);
	queryClient.setQueryData(trpc.gallery.getPhotoById.queryKey(photoId), photo);

	// Create JSON-LD schemas
	const imageObjectSchema = photo
		? createImageObjectSchema({
				url: photo.image_url,
				width: photo.width || undefined,
				height: photo.height || undefined,
				caption: photo.title || undefined,
				description: photo.description || undefined,
				name: photo.title || undefined,
				datePublished: photo.created_at,
				id: photo.id,
				lang: locale,
			})
		: null;

	const breadcrumbSchema = createBreadcrumbSchema(
		[
			{ name: 'Home', path: '' },
			{ name: 'Gallery', path: '/gallery' },
			{ name: photo?.title || 'Photo', path: `/gallery/photo/${photoId}` },
		],
		locale as 'ko' | 'en',
	);

	return (
		<>
			{imageObjectSchema && <JsonLd data={imageObjectSchema} />}
			<JsonLd data={breadcrumbSchema} />
			<HydrationBoundary state={dehydrate(queryClient)}>
				<Suspense fallback={<PhotoDetailSkeleton />}>
					<PhotoDetailPage photoId={photoId} isModal={false} />
				</Suspense>
			</HydrationBoundary>
		</>
	);
}

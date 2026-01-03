import { PHOTO_DEFAULTS } from '@/fsd/entities/gallery';
import {
	SUPPORTED_LANGS,
	createBreadcrumbSchema,
	createImageObjectSchema,
	getApiUrl,
	getGoogleVerificationCode,
} from '@/fsd/shared';
import { caller, getQueryClient, trpc } from '@/fsd/shared/index.server';
import { JsonLd } from '@/fsd/shared/ui';
import { PhotoDetailPage } from '@/fsd/views/gallery';
import { PhotoDetailSkeleton } from '@/fsd/views/gallery/ui';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata({
	params,
}: {
	params: { id: string; lang: string };
}): Promise<Metadata> {
	try {
		const photo = await caller.gallery.getPhotoById(params.id);

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
				canonical: `${getApiUrl()}/gallery/photo/${params.id}`,
				languages: {
					en: `${getApiUrl()}/en/gallery/photo/${params.id}`,
					ko: `${getApiUrl()}/ko/gallery/photo/${params.id}`,
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
	const photos = await caller.gallery.getAllPhotos({
		limit: PHOTO_DEFAULTS.LIMIT,
		sort: PHOTO_DEFAULTS.SORT,
		q: PHOTO_DEFAULTS.QUERY,
	});

	const PhotoIds = photos.items.map((photo) => photo.id);

	const params = [];
	for (const lang of SUPPORTED_LANGS) {
		for (const id of PhotoIds) {
			params.push({ lang, id: String(id) });
		}
	}

	return params;
}

export default async function PhotoPage({
	params,
}: {
	params: { id: string; lang: string };
}) {
	const photoId = params.id;
	const lang = params.lang;

	const queryClient = getQueryClient();

	// Fetch photo data for JSON-LD schema
	const photo = await caller.gallery.getPhotoById(photoId);

	queryClient.prefetchQuery(trpc.gallery.getPhotoById.queryOptions(photoId));

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
				lang,
		  })
		: null;

	const breadcrumbSchema = createBreadcrumbSchema(
		[
			{ name: 'Home', path: '' },
			{ name: 'Gallery', path: '/gallery' },
			{ name: photo?.title || 'Photo', path: `/gallery/photo/${photoId}` },
		],
		lang,
	);

	return (
		<>
			{imageObjectSchema && <JsonLd data={imageObjectSchema} />}
			<JsonLd data={breadcrumbSchema} />
			<HydrationBoundary state={dehydrate(queryClient)}>
				<Suspense fallback={<PhotoDetailSkeleton />}>
					<PhotoDetailPage photoId={params.id} isModal={false} />
				</Suspense>
			</HydrationBoundary>
		</>
	);
}

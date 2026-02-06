import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { PLACE_DEFAULTS, PlaceDetailSkeleton } from '@/fsd/entities/place';
import { PlaceViewProvider } from '@/fsd/features/place';
import {
	createBreadcrumbSchema,
	createPlaceSchema,
	getApiUrl,
	getGoogleVerificationCode,
} from '@/fsd/shared';
import { getCaller, getQueryClient, trpc } from '@/fsd/shared/index.server';
import { JsonLd } from '@/fsd/shared/ui';
import { PlaceDetailContent } from '@/fsd/views';
import { type Locale, routing } from '@/i18n/routing';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	try {
		const place = await getCaller().place.getPlaceById(id);

		if (!place) {
			return {
				title: 'Place Not Found',
				description: '요청하신 스팟을 찾을 수 없습니다.',
				robots: { index: false },
			};
		}

		return {
			title: `${place.title}`,
			description:
				place.description ||
				`${place.title}의 상세 정보와 추천 포인트를 확인해보세요.`,
			openGraph: {
				title: `${place.title}`,
				description:
					place.description ||
					`	${place.title}의 상세 정보와 추천 포인트를 확인해보세요.`,
				type: 'article',
				publishedTime: place.created_at,
				modifiedTime: place.updated_at,
				authors: ['JUNG'],
				siteName: 'JUNG Travel Places',
				locale: 'ko_KR',
				images: [
					{
						url: place.photos[0]?.url || '/images/og/place-default.jpg',
						width: 1200,
						height: 630,
						alt: `${place.title}`,
					},
				],
			},
			twitter: {
				card: 'summary_large_image',
				title: `${place.title}`,
				creator: '@jung',
				description:
					place.description ||
					`${place.title}의 상세 정보와 추천 포인트를 확인해보세요.`,
				images: [place.photos[0]?.url || '/images/og/place-default.jpg'],
			},
			keywords: [
				place.title,
				place.category,
				'여행',
				'여행지 추천',
				'travel place',
				...(place.tags || []),
			].filter(Boolean),
			alternates: {
				canonical: `${getApiUrl()}/places/${id}`,
				languages: {
					en: `${getApiUrl()}/en/places/${id}`,
					ko: `${getApiUrl()}/ko/places/${id}`,
				},
			},
			verification: {
				google: getGoogleVerificationCode(),
			},
			authors: [{ name: 'JUNG', url: getApiUrl() }],
		};
	} catch (error) {
		console.error('Error generating metadata:', error);

		return {
			title: 'Place',
			description: 'JUNG이 추천하는 스팟을 확인해보세요.',
			robots: { index: false },
		};
	}
}

// Revalidate every hour for fresh content with ISR
export const revalidate = 3600;

export async function generateStaticParams() {
	const places = await getCaller().place.getAllPlaces({
		limit: PLACE_DEFAULTS.LIMIT,
		sort: PLACE_DEFAULTS.SORT,
		cat: PLACE_DEFAULTS.CAT,
		q: PLACE_DEFAULTS.QUERY,
	});

	const popularPlaceIds = places.items.map((place) => place.id);

	const params = [];
	for (const locale of routing.locales) {
		for (const id of popularPlaceIds) {
			params.push({ locale, id });
		}
	}

	return params;
}

export default async function Page({
	params,
}: {
	params: Promise<{ id: string; locale: Locale }>;
}) {
	const { id: placeId, locale } = await params;
	setRequestLocale(locale);

	const queryClient = getQueryClient();

	const place = await getCaller().place.getPlaceById(placeId);
	queryClient.setQueryData(trpc.place.getPlaceById.queryKey(placeId), place);

	// Create JSON-LD schemas
	const placeSchema = place
		? createPlaceSchema({
				name: place.title,
				description: place.description || undefined,
				image: place.photos[0]?.url || undefined,
				// address is a string, so we put it in street field
				address: place.address
					? {
							street: place.address,
						}
					: undefined,
				coordinates: place.coordinates
					? {
							latitude: place.coordinates.lat,
							longitude: place.coordinates.lng,
						}
					: undefined,
				id: place.id,
				lang: locale,
			})
		: null;

	const breadcrumbSchema = createBreadcrumbSchema(
		[
			{ name: 'Home', path: '' },
			{ name: 'Places', path: '/places' },
			{ name: place?.title || 'Place', path: `/places/${placeId}` },
		],
		locale as 'ko' | 'en',
	);

	return (
		<>
			{placeSchema && <JsonLd data={placeSchema} />}
			<JsonLd data={breadcrumbSchema} />
			<HydrationBoundary state={dehydrate(queryClient)}>
				<PlaceViewProvider>
					<Suspense fallback={<PlaceDetailSkeleton />}>
						<PlaceDetailContent placeId={placeId} />
					</Suspense>
				</PlaceViewProvider>
			</HydrationBoundary>
		</>
	);
}

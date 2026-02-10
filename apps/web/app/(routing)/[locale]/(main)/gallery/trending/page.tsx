import { Flex } from '@jung/design-system/components';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { TRENDING_PHOTO_DEFAULTS } from '@/fsd/entities';
import { FilteredPhotoList } from '@/fsd/features/gallery';
import {
	getGoogleVerificationCode,
	LoadingSpinner,
	SITE_URL,
} from '@/fsd/shared';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';
import { type Locale, routing } from '@/i18n/routing';

interface Props {
	params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return {
		title: 'Trending Photos • Gallery',
		description:
			'많은 사람들이 좋아하는 인기 여행 사진과 일상 기록들을 만나보세요.',
		openGraph: {
			title: 'JUNG (@jung) • Trending Gallery',
			description:
				'많은 사람들이 좋아하는 인기 여행 사진과 일상 기록들을 만나보세요.',
			type: 'website',
			siteName: 'JUNG Gallery',
			locale: 'ko_KR',
		},
		twitter: {
			card: 'summary_large_image',
			title: 'Trending Photos • JUNG Gallery',
			creator: '@jung',
			description:
				'많은 사람들이 좋아하는 인기 여행 사진과 일상 기록들을 만나보세요.',
		},
		keywords: [
			'JUNG',
			'인기 사진',
			'트렌딩',
			'갤러리',
			'여행',
			'일상',
			'trending photos',
			'popular gallery',
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
			canonical: `${SITE_URL}/${locale}/gallery/trending`,
			languages: {
				en: `${SITE_URL}/en/gallery/trending`,
				ko: `${SITE_URL}/ko/gallery/trending`,
			},
		},
		verification: {
			google: getGoogleVerificationCode(),
		},
	};
}

// Trending changes frequently - shorter revalidation
export const revalidate = 300;

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function TrendingPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const queryClient = getQueryClient();

	queryClient.prefetchInfiniteQuery(
		trpc.gallery.getAllPhotos.infiniteQueryOptions({
			limit: TRENDING_PHOTO_DEFAULTS.LIMIT,
			sort: TRENDING_PHOTO_DEFAULTS.SORT,
			q: TRENDING_PHOTO_DEFAULTS.QUERY,
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
				<FilteredPhotoList isTrending />
			</Suspense>
		</HydrationBoundary>
	);
}

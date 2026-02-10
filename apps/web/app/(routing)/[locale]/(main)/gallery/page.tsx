import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { GalleryListSkeleton, PHOTO_DEFAULTS } from '@/fsd/entities/gallery';
import { FilteredPhotoList } from '@/fsd/features/gallery';
import { getGoogleVerificationCode, SITE_URL } from '@/fsd/shared';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';
import { type Locale, routing } from '@/i18n/routing';

interface Props {
	params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return {
		title: 'Gallery',
		description: '여행하면서 담아온 순간들과 일상의 기록들을 공유합니다.',
		openGraph: {
			title: 'JUNG (@jung) • Photo Gallery',
			description: '여행하면서 담아온 순간들과 일상의 기록들을 공유합니다.',
			type: 'website',
			siteName: 'JUNG Gallery',
			locale: 'ko_KR',
		},
		twitter: {
			card: 'summary_large_image',
			title: 'Gallery • JUNG',
			creator: '@jung',
			description: '여행하면서 담아온 순간들과 일상의 기록들을 공유합니다.',
		},
		keywords: [
			'JUNG',
			'갤러리',
			'사진',
			'여행',
			'일상',
			'포토',
			'travel photos',
			'daily life',
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
			canonical: `${SITE_URL}/${locale}/gallery`,
			languages: {
				en: `${SITE_URL}/en/gallery`,
				ko: `${SITE_URL}/ko/gallery`,
			},
		},
		verification: {
			google: getGoogleVerificationCode(),
		},
	};
}

// Revalidate every hour for fresh content with ISR
export const revalidate = 3600;

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const queryClient = getQueryClient();

	queryClient.prefetchInfiniteQuery(
		trpc.gallery.getAllPhotos.infiniteQueryOptions({
			limit: PHOTO_DEFAULTS.LIMIT,
			sort: PHOTO_DEFAULTS.SORT,
			q: PHOTO_DEFAULTS.QUERY,
		}),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Suspense fallback={<GalleryListSkeleton count={12} />}>
				<FilteredPhotoList />
			</Suspense>
		</HydrationBoundary>
	);
}

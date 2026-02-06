import { REVALIDATE_ONE_HOUR } from '@jung/shared/config';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PLACE_DEFAULTS } from '@/fsd/entities/place';
import { getApiUrl, getGoogleVerificationCode } from '@/fsd/shared';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';
import { type Locale, routing } from '@/i18n/routing';
import { PlacesLayout } from './_components/PlacesLayout';

export const metadata: Metadata = {
	title: 'Places',
	description:
		'어디선가 우연히 마주친 공간, 특별한 순간을 채운 장소, 다시 찾고 싶은 나만의 스팟을 기록합니다',
	openGraph: {
		title: '나만의 스팟',
		description:
			'어디선가 우연히 마주친 공간, 특별한 순간을 채운 장소, 다시 찾고 싶은 나만의 스팟을 기록합니다.',
		type: 'website',
		siteName: 'JUNG',
		locale: 'ko_KR',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Places • 내가 좋았던 장소들',
		creator: '@jung',
		description:
			'어디선가 우연히 마주친 공간, 특별한 순간을 채운 장소, 다시 찾고 싶은 나만의 스팟을 기록합니다.',
	},
	keywords: [
		'JUNG',
		'나만의 스팟',
		'좋았던 곳',
		'숨은 장소',
		'특별한 공간',
		'추천 장소',
		'기억하고 싶은 곳',
		'my places',
		'favorite places',
	],
	alternates: {
		canonical: `${getApiUrl()}/places`,
		languages: {
			en: `${getApiUrl()}/en/places`,
			ko: `${getApiUrl()}/ko/places`,
		},
	},
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
	verification: {
		google: getGoogleVerificationCode(),
	},
};

// Revalidate every hour for fresh content with ISR
export const revalidate = REVALIDATE_ONE_HOUR;

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

interface Props {
	params: Promise<{ locale: Locale }>;
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const queryClient = getQueryClient();

	await queryClient.prefetchInfiniteQuery(
		trpc.place.getAllPlaces.infiniteQueryOptions({
			limit: PLACE_DEFAULTS.LIMIT,
			sort: PLACE_DEFAULTS.SORT,
			cat: PLACE_DEFAULTS.CAT,
			q: PLACE_DEFAULTS.QUERY,
		}),
	);

	queryClient.prefetchQuery(
		trpc.category.getCategories.queryOptions({ type: 'places' }),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<PlacesLayout />
		</HydrationBoundary>
	);
}

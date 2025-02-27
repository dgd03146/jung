import { PHOTO_PARAMS } from '@/fsd/entities/photo';
import { type Sort, siteUrl } from '@/fsd/shared';
import { HydrateClient, trpc } from '@/fsd/shared/index.server';
import { GalleryPage } from '@/fsd/views/gallery';
import type { Metadata } from 'next';

type PageProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
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
		canonical: `${siteUrl}/gallery`,
		languages: {
			en: `${siteUrl}/en/gallery`,
			ko: `${siteUrl}/ko/gallery`,
		},
	},
};

export default function Page({ searchParams }: PageProps) {
	const sort = (searchParams.sort as Sort) || PHOTO_PARAMS.SORT;
	const q = (searchParams.q as string) || PHOTO_PARAMS.QUERY;

	void trpc.photos.getAllPhotos.prefetchInfinite({
		limit: PHOTO_PARAMS.LIMIT,
		sort,
		q,
	});

	return (
		<HydrateClient>
			<GalleryPage sort={sort} />
		</HydrateClient>
	);
}

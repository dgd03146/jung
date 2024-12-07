import { PhotoList, PhotoNavigation } from '@/fsd/features/gallery/photos';
import { LoadingSpinner } from '@/fsd/shared';
import { HydrateClient, trpc } from '@/fsd/shared/index.server';
import { Suspense } from 'react';

type Sort = 'latest' | 'popular';

type PageProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export default function TrendingPage({ searchParams }: PageProps) {
	const sort: Sort = 'popular';
	const q = (searchParams.q as string) || '';

	void trpc.photos.getAllPhotos.prefetchInfinite({
		limit: 8,
		sort,
		q,
	});

	return (
		<HydrateClient>
			<PhotoNavigation />
			<Suspense fallback={<LoadingSpinner />}>
				<PhotoList sort={sort} q={q} />
			</Suspense>
		</HydrateClient>
	);
}

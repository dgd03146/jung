import { PhotoList, PhotoNavigation } from '@/fsd/features/gallery/photos';
import { LoadingSpinner } from '@/fsd/shared';
import { HydrateClient, trpc } from '@/fsd/shared/index.server';
import { Suspense } from 'react';

type Sort = 'latest' | 'popular';

type PageProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ searchParams }: PageProps) {
	const sort = (searchParams.sort as Sort) || 'latest';
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
				<PhotoList />
			</Suspense>
		</HydrateClient>
	);
}

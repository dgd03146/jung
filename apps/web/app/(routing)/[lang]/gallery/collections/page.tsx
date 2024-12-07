import { HydrateClient, trpc } from '@/fsd/shared/index.server';

import { PhotoNavigation } from '@/fsd/features';
import { CollectionGrid } from '@/fsd/features/gallery/photos/ui/CollectionGrid';
import { LoadingSpinner } from '@/fsd/shared';
import { Suspense } from 'react';

type Sort = 'latest' | 'popular';

type PageProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export default function CollectionsPage({ searchParams }: PageProps) {
	const sort = (searchParams.sort as Sort) || 'latest';

	void trpc.photoCollections.getAllCollections.prefetch({
		sort,
	});

	return (
		<>
			<PhotoNavigation />
			<HydrateClient>
				<Suspense fallback={<LoadingSpinner />}>
					<CollectionGrid />
				</Suspense>
			</HydrateClient>
		</>
	);
}

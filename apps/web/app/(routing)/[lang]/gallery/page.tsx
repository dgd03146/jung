import { HydrateClient, trpc } from '@/fsd/shared/index.server';
import { GalleryPage } from '@/fsd/views/gallery';

type Sort = 'latest' | 'popular';

type PageProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ searchParams }: PageProps) {
	const sort = (searchParams.sort as Sort) || 'latest';
	const q = (searchParams.q as string) || '';
	const tab = searchParams.tab || 'recent';

	void trpc.photos.getAllPhotos.prefetchInfinite({
		limit: 8,
		sort,
		q,
	});

	if (tab === 'collections') {
		void trpc.photoCollections.getAllCollections.prefetch({
			sort,
		});
	}

	return (
		<HydrateClient>
			<GalleryPage />
		</HydrateClient>
	);
}

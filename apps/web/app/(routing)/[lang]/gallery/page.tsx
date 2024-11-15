import { HydrateClient, trpc } from '@/fsd/shared/index.server';
import { GalleryPage } from '@/fsd/views/gallery';

type Sort = 'latest' | 'popular';

type PageProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ searchParams }: PageProps) {
	const sort = (searchParams.sort as Sort) || 'latest';
	const q = (searchParams.q as string) || '';

	void trpc.photos.getAllPhotos.prefetchInfinite({
		limit: 8,
		sort,
		q,
	});

	return (
		<HydrateClient>
			<GalleryPage />
		</HydrateClient>
	);
}

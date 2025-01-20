import { SpotList } from '@/fsd/features/spots';
import { HydrateClient, getCategories, trpc } from '@/fsd/shared/index.server';

type Sort = 'latest' | 'oldest' | 'popular';

type PageProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export default async function SpotsPage({ searchParams }: PageProps) {
	const sort = (searchParams.sort as Sort) || 'latest';
	const q = (searchParams.q as string) || '';
	const cat = (searchParams.category_id as string) || 'all';

	const categories = await getCategories('spots');

	void trpc.spot.getAllSpots.prefetchInfinite({
		limit: 12,
		sort,
		cat,
		q,
	});

	return (
		<HydrateClient>
			<SpotList categories={categories} />
		</HydrateClient>
	);
}

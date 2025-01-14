import { SpotList } from '@/fsd/features/spots';
import { HydrateClient, trpc } from '@/fsd/shared/index.server';

type Sort = 'latest' | 'oldest' | 'popular';

type PageProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export default function SpotsPage({ searchParams }: PageProps) {
	const sort = (searchParams.sort as Sort) || 'latest';
	const q = (searchParams.q as string) || '';
	const category_id = (searchParams.category_id as string) || 'all';

	void trpc.spot.getAllSpots.prefetchInfinite({
		limit: 12,
		sort,
		q,
		category_id,
	});

	return (
		<HydrateClient>
			<SpotList />
		</HydrateClient>
	);
}

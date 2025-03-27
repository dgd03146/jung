import { SPOT_DEFAULTS } from '@/fsd/entities/spot';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { SpotsLayout } from '../../_components/SpotsLayout';

export const revalidate = 21600; // 6시간

export async function generateStaticParams() {
	return [];
}

export default async function CategorySpotsPage({
	params,
}: {
	params: { categoryName: string };
}) {
	const queryClient = getQueryClient();
	const categoryName = params.categoryName;

	await queryClient.prefetchInfiniteQuery(
		trpc.spot.getAllSpots.infiniteQueryOptions({
			limit: SPOT_DEFAULTS.LIMIT,
			cat: categoryName,
			sort: SPOT_DEFAULTS.SORT,
			q: SPOT_DEFAULTS.QUERY,
		}),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<SpotsLayout currentCategory={categoryName} />
		</HydrationBoundary>
	);
}

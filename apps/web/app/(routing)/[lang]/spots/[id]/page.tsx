import { SpotDetail } from '@/fsd/features/spots/ui';
import { HydrateClient, trpc } from '@/fsd/shared/index.server';

export default async function SpotDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const spotId = params.id;

	void trpc.spot.getSpotById.prefetch(spotId);

	return (
		<HydrateClient>
			<SpotDetail spotId={spotId} />
		</HydrateClient>
	);
}

import { SpotDetail } from '@/fsd/features/spots/ui';
import { HydrateClient } from '@/fsd/shared/index.server';

export default async function SpotDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const spotId = params.id;

	// TODO: API 연동 시 활성화
	// void trpc.spot.getSpotById.prefetch(spotId);

	return (
		<HydrateClient>
			<SpotDetail spotId={spotId} />
		</HydrateClient>
	);
}

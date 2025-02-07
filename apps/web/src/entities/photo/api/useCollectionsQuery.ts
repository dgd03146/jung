import { trpc } from '@/fsd/shared';
import type { CollectionQueryParams } from '@jung/shared/types';
import { COLLECTION_PARAMS } from '../config/constants';

export function useCollectionsQuery(params: CollectionQueryParams = {}) {
	const { sort = COLLECTION_PARAMS.sort } = params;

	return trpc.photoCollections.getAllCollections.useSuspenseQuery(
		{ sort },
		{
			staleTime: 1000 * 60 * 60 * 5, // 5시간
			gcTime: 1000 * 60 * 60 * 24, // 24시간
		},
	);
}

import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/app';
import { PHOTO_CACHE } from '../config/gallery';

export function usePhotoQuery(id: string) {
	const trpc = useTRPC();

	return useSuspenseQuery(
		trpc.gallery.getPhotoById.queryOptions(id, {
			staleTime: PHOTO_CACHE.STALE_TIME,
			gcTime: PHOTO_CACHE.GC_TIME,
		}),
	);
}

import { useTRPC } from '@/fsd/app';

import type { Photo } from '@jung/shared/types';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

type UsePhotoQueryOptions = {
	initialData?: Photo;
	enabled?: boolean;
	staleTime?: number;
	gcTime?: number;
	suspense?: boolean;
	select?: <T>(data: Photo) => T;
};

export function usePhotoQuery(id: string, options?: UsePhotoQueryOptions) {
	const trpc = useTRPC();

	const queryOptions = trpc.photos.getPhotoById.queryOptions(id, {
		staleTime: 1000 * 60 * 60 * 24,
		gcTime: 1000 * 60 * 60 * 48,
		...options,
	});

	return options?.suspense === false
		? useQuery(queryOptions)
		: useSuspenseQuery(queryOptions);
}

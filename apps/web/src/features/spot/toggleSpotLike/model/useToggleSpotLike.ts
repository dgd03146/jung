'use client';

import { useTRPC } from '@/fsd/app';
import { SPOT_DEFAULTS } from '@/fsd/entities/spot';
import { useToast } from '@jung/design-system/components';
import type { Spot, SpotQueryResult } from '@jung/shared/types';
import type { InfiniteData } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { toggleLikeSpotAction } from '../api/toggleLikeSpotAction';

const spotQueryParams = {
	cat: SPOT_DEFAULTS.CAT,
	limit: SPOT_DEFAULTS.LIMIT,
	q: SPOT_DEFAULTS.QUERY,
	sort: SPOT_DEFAULTS.SORT,
} as const;

type InfiniteSpotPages = InfiniteData<SpotQueryResult>;

export const useToggleSpotLike = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const showToast = useToast();
	const pathname = usePathname();

	const isDetailPage = pathname.includes('/spots/');

	const mutation = useMutation<
		Spot,
		Error,
		{ spotId: string; userId: string },
		{
			previousSpotData: Spot | undefined;
			previousAllSpotsData: InfiniteSpotPages | undefined;
			spotQueryKey: unknown[];
			allSpotsQueryKey: unknown[];
		}
	>({
		mutationFn: ({ spotId, userId }: { spotId: string; userId: string }) =>
			toggleLikeSpotAction({ spotId, userId }),

		onMutate: async ({ spotId, userId }) => {
			const spotQueryKey = trpc.spot.getSpotById.queryOptions(spotId).queryKey;
			const allSpotsQueryKey =
				trpc.spot.getAllSpots.infiniteQueryOptions(spotQueryParams).queryKey;

			await queryClient.cancelQueries({ queryKey: spotQueryKey });
			await queryClient.cancelQueries({ queryKey: allSpotsQueryKey });

			const previousSpotData = queryClient.getQueryData<Spot>(spotQueryKey);
			const previousAllSpotsData =
				queryClient.getQueryData<InfiniteSpotPages>(allSpotsQueryKey);

			let isInitiallyLiked: boolean | undefined;

			if (isDetailPage && previousSpotData) {
				isInitiallyLiked = previousSpotData.liked_by?.includes(userId);
				queryClient.setQueryData<Spot>(spotQueryKey, (oldData) => {
					if (!oldData) return undefined;
					return {
						...oldData,
						likes: isInitiallyLiked ? oldData.likes - 1 : oldData.likes + 1,
						liked_by: isInitiallyLiked
							? oldData.liked_by.filter((id) => id !== userId)
							: [...(oldData.liked_by || []), userId],
					};
				});
			} else if (!isDetailPage && previousAllSpotsData) {
				const spotInList = previousAllSpotsData.pages
					.flatMap((p: SpotQueryResult) => p.items)
					.find((s: Spot) => s.id === spotId);

				if (spotInList) {
					isInitiallyLiked = spotInList.liked_by?.includes(userId);

					const newAllSpotsData: InfiniteSpotPages = {
						...previousAllSpotsData,
						pages: previousAllSpotsData.pages.map((page: SpotQueryResult) => ({
							...page,
							items: page.items.map((item: Spot) => {
								if (item.id === spotId) {
									return {
										...item,
										likes: isInitiallyLiked ? item.likes - 1 : item.likes + 1,
										liked_by: isInitiallyLiked
											? item.liked_by.filter((id) => id !== userId)
											: [...(item.liked_by || []), userId],
									};
								}
								return item;
							}),
						})),
					};
					queryClient.setQueryData<InfiniteSpotPages>(
						allSpotsQueryKey,
						newAllSpotsData,
					);
				}
			}

			if (typeof isInitiallyLiked === 'undefined') {
				console.warn(
					'Could not determine initial like state for optimistic update on spot:',
					spotId,
				);
				return {
					previousSpotData,
					previousAllSpotsData,
					spotQueryKey,
					allSpotsQueryKey,
				};
			}

			return {
				previousSpotData,
				previousAllSpotsData,
				spotQueryKey,
				allSpotsQueryKey,
			};
		},

		onError: (_error, _variables, context) => {
			showToast('Failed to update like. Reverting changes.', 'error');
			if (context?.previousSpotData) {
				queryClient.setQueryData<Spot>(
					context.spotQueryKey,
					context.previousSpotData,
				);
			}
			if (context?.previousAllSpotsData) {
				queryClient.setQueryData<InfiniteSpotPages>(
					context.allSpotsQueryKey,
					context.previousAllSpotsData,
				);
			}
		},

		onSettled: (data, _error, variables) => {
			const { spotId } = variables;
			const spotQueryKey = trpc.spot.getSpotById.queryOptions(spotId).queryKey;
			const allSpotsQueryKey =
				trpc.spot.getAllSpots.infiniteQueryOptions(spotQueryParams).queryKey;

			queryClient.invalidateQueries({ queryKey: spotQueryKey });
			queryClient.invalidateQueries({ queryKey: allSpotsQueryKey });
		},
	});

	const getIsLiked = (spotId: string, userId: string | undefined) => {
		if (!userId) return false;

		const spotQueryKey = trpc.spot.getSpotById.queryOptions(spotId).queryKey;
		const allSpotsQueryKey =
			trpc.spot.getAllSpots.infiniteQueryOptions(spotQueryParams).queryKey;

		if (isDetailPage) {
			const spotData = queryClient.getQueryData<Spot>(spotQueryKey);
			return !!spotData?.liked_by?.includes(userId);
		}

		const allSpotsData =
			queryClient.getQueryData<InfiniteSpotPages>(allSpotsQueryKey);
		const spotInList = allSpotsData?.pages
			.flatMap((page: SpotQueryResult) => page.items)
			.find((s: Spot) => s.id === spotId);
		return !!spotInList?.liked_by?.includes(userId);
	};

	return {
		toggleLike: mutation.mutate,
		isPending: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
		getIsLiked,
	};
};

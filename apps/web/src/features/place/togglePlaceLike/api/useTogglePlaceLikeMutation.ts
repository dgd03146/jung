'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/shared';
import { type LikeInfo, toggleLikeOptimistic } from '@/fsd/shared/lib';

type ToggleLikeVariables = {
	placeId: string;
	userId: string;
};

export const useTogglePlaceLikeMutation = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const mutation = useMutation(
		trpc.place.toggleLike.mutationOptions({
			onMutate: async ({ placeId, userId }: ToggleLikeVariables) => {
				const queryKey = trpc.place.getLikeInfo.queryOptions(placeId).queryKey;

				await queryClient.cancelQueries({ queryKey });

				const previousData = queryClient.getQueryData<LikeInfo>(queryKey);

				queryClient.setQueryData<LikeInfo>(queryKey, (old) =>
					toggleLikeOptimistic(old, userId),
				);

				return { previousData, placeId };
			},

			onError: (_err, _variables, context) => {
				if (context?.previousData) {
					queryClient.setQueryData(
						trpc.place.getLikeInfo.queryOptions(context.placeId).queryKey,
						context.previousData,
					);
				}
			},

			onSettled: (_data, _error, variables) => {
				if (
					queryClient.isMutating({
						mutationKey: trpc.place.toggleLike.mutationOptions().mutationKey,
					}) === 1
				) {
					queryClient.invalidateQueries({
						queryKey: trpc.place.getLikeInfo.queryOptions(variables.placeId)
							.queryKey,
					});
				}
			},
		}),
	);

	return {
		toggleLike: mutation.mutate,
		isPending: mutation.isPending,
	};
};

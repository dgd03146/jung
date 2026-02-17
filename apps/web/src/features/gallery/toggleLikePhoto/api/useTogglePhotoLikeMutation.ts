import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/shared';
import { type LikeInfo, toggleLikeOptimistic } from '@/fsd/shared/lib';

type ToggleLikeVariables = {
	photoId: string;
	userId?: string;
	anonymousId?: string;
};

export const useTogglePhotoLikeMutation = () => {
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	const mutation = useMutation(
		trpc.gallery.toggleLike.mutationOptions({
			onMutate: async ({
				photoId,
				userId,
				anonymousId,
			}: ToggleLikeVariables) => {
				const identifier = userId || anonymousId;
				if (!identifier) return;

				const queryKey =
					trpc.gallery.getLikeInfo.queryOptions(photoId).queryKey;

				await queryClient.cancelQueries({ queryKey });

				const previousData = queryClient.getQueryData<LikeInfo>(queryKey);

				queryClient.setQueryData<LikeInfo>(queryKey, (old) =>
					toggleLikeOptimistic(old, identifier),
				);

				return { previousData, photoId };
			},

			onError: (_err, _variables, context) => {
				if (context?.previousData) {
					queryClient.setQueryData(
						trpc.gallery.getLikeInfo.queryOptions(context.photoId).queryKey,
						context.previousData,
					);
				}
			},

			onSettled: (_data, _error, variables) => {
				if (
					queryClient.isMutating({
						mutationKey: trpc.gallery.toggleLike.mutationOptions().mutationKey,
					}) === 1
				) {
					queryClient.invalidateQueries({
						queryKey: trpc.gallery.getLikeInfo.queryOptions(variables.photoId)
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

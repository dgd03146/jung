import { useTRPC } from '@/fsd/app';
import { toggleLikeOptimistic } from '@/fsd/shared/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type LikeInfo = {
	likes: number;
	liked_by: string[];
};

type ToggleLikeVariables = {
	photoId: string;
	userId: string;
};

export const useTogglePhotoLikeMutation = () => {
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	const mutation = useMutation(
		trpc.gallery.toggleLike.mutationOptions({
			onMutate: async ({ photoId, userId }: ToggleLikeVariables) => {
				const queryKey =
					trpc.gallery.getLikeInfo.queryOptions(photoId).queryKey;

				await queryClient.cancelQueries({ queryKey });

				const previousData = queryClient.getQueryData<LikeInfo>(queryKey);

				queryClient.setQueryData<LikeInfo>(queryKey, (old) =>
					toggleLikeOptimistic(old, userId),
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

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/app';
import { type LikeInfo, toggleLikeOptimistic } from '@/fsd/shared/lib';

type ToggleLikeVariables = {
	postId: string;
	userId: string;
};

export const useTogglePostLikeMutation = () => {
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	const mutation = useMutation(
		trpc.blog.toggleLike.mutationOptions({
			onMutate: async ({ postId, userId }: ToggleLikeVariables) => {
				const queryKey = trpc.blog.getLikeInfo.queryOptions(postId).queryKey;

				await queryClient.cancelQueries({ queryKey });

				const previousData = queryClient.getQueryData<LikeInfo>(queryKey);

				queryClient.setQueryData<LikeInfo>(queryKey, (old) =>
					toggleLikeOptimistic(old, userId),
				);

				return { previousData, postId };
			},

			onError: (_err, _variables, context) => {
				if (context?.previousData) {
					queryClient.setQueryData(
						trpc.blog.getLikeInfo.queryOptions(context.postId).queryKey,
						context.previousData,
					);
				}
			},

			onSettled: (_data, _error, variables) => {
				if (
					queryClient.isMutating({
						mutationKey: trpc.blog.toggleLike.mutationOptions().mutationKey,
					}) === 1
				) {
					queryClient.invalidateQueries({
						queryKey: trpc.blog.getLikeInfo.queryOptions(variables.postId)
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

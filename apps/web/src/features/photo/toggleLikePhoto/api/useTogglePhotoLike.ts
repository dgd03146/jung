import { useTRPC } from '@/fsd/app';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type LikeInfo = {
	likes: number;
	liked_by: string[];
};

type MutationContext = {
	previousData: LikeInfo | undefined;
	photoId: string;
	isLiked: boolean;
};

export const useTogglePhotoLike = () => {
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	const mutation = useMutation(
		trpc.photos.toggleLike.mutationOptions({
			onMutate: async ({ photoId, userId }) => {
				const likeInfoQueryKey =
					trpc.photos.getLikeInfo.queryOptions(photoId).queryKey;

				await queryClient.cancelQueries({ queryKey: likeInfoQueryKey });

				const previousData =
					queryClient.getQueryData<LikeInfo>(likeInfoQueryKey);

				const likedBySet = new Set(previousData?.liked_by ?? []);
				const isLiked = likedBySet.has(userId);
				const likeDelta = isLiked ? -1 : 1;

				// optimistic update
				queryClient.setQueryData<LikeInfo>(likeInfoQueryKey, (old) => {
					if (!old) return old;

					if (isLiked) {
						likedBySet.delete(userId);
					} else {
						likedBySet.add(userId);
					}

					return {
						likes: old.likes + likeDelta,
						liked_by: Array.from(likedBySet),
					};
				});

				return { previousData, photoId, isLiked };
			},

			onError: (
				_err: unknown,
				_variables,
				context: MutationContext | undefined,
			) => {
				if (context) {
					// 에러 시 이전 상태로 롤백
					queryClient.setQueryData(
						trpc.photos.getLikeInfo.queryOptions(context.photoId).queryKey,
						context.previousData,
					);
				}
			},

			onSettled: (_data, _error, variables) => {
				if (variables?.photoId) {
					if (
						queryClient.isMutating({
							mutationKey: trpc.photos.toggleLike.mutationOptions().mutationKey,
						}) === 1
					) {
						queryClient.invalidateQueries({
							queryKey: trpc.photos.getLikeInfo.queryOptions(variables.photoId)
								.queryKey,
						});
					}
				}
			},
		}),
	);

	return {
		toggleLike: mutation.mutate,
		isPending: mutation.isPending,
	};
};

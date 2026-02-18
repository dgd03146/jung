import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/shared';

type LikeInfo = {
	likes: number;
	liked_by: string[];
};

type MutationContext = {
	previousData: LikeInfo | undefined;
	photoId: string;
	isLiked: boolean;
};

export const useTogglePhotoLikeMutation = () => {
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	const mutation = useMutation(
		trpc.gallery.toggleLike.mutationOptions({
			onMutate: async ({ photoId, userId, anonymousId }) => {
				const identifier = userId || anonymousId;

				if (!identifier) {
					throw new Error('Missing identifier for toggle like');
				}

				const likeInfoQueryKey =
					trpc.gallery.getLikeInfo.queryOptions(photoId).queryKey;

				await queryClient.cancelQueries({ queryKey: likeInfoQueryKey });

				const previousData =
					queryClient.getQueryData<LikeInfo>(likeInfoQueryKey);

				const likedBySet = new Set(previousData?.liked_by ?? []);
				const isLiked = likedBySet.has(identifier);
				const likeDelta = isLiked ? -1 : 1;

				// optimistic update
				queryClient.setQueryData<LikeInfo>(likeInfoQueryKey, (old) => {
					if (!old) return old;

					if (isLiked) {
						likedBySet.delete(identifier);
					} else {
						likedBySet.add(identifier);
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
						trpc.gallery.getLikeInfo.queryOptions(context.photoId).queryKey,
						context.previousData,
					);
				}
			},

			onSettled: (_data, _error, variables) => {
				if (variables?.photoId) {
					if (
						queryClient.isMutating({
							mutationKey:
								trpc.gallery.toggleLike.mutationOptions().mutationKey,
						}) === 1
					) {
						queryClient.invalidateQueries({
							queryKey: trpc.gallery.getLikeInfo.queryOptions(variables.photoId)
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

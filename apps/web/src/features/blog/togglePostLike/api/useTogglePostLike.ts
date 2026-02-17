import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/shared';

type LikeInfo = {
	likes: number;
	liked_by: string[];
};

type MutationContext = {
	previousData: LikeInfo | undefined;
	postId: string;
	isLiked: boolean;
};

type ToggleLikeVariables = {
	postId: string;
	userId?: string;
	anonymousId?: string;
};

export const useTogglePostLikeMutation = () => {
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	const mutation = useMutation(
		trpc.blog.toggleLike.mutationOptions({
			onMutate: async (variables: ToggleLikeVariables) => {
				const { postId, userId, anonymousId } = variables;
				const identifier = userId || anonymousId;

				if (!identifier) {
					return { previousData: undefined, postId, isLiked: false };
				}

				// 좋아요 정보 쿼리키
				const likeInfoQueryKey =
					trpc.blog.getLikeInfo.queryOptions(postId).queryKey;

				// 진행 중인 쿼리 취소
				await queryClient.cancelQueries({
					queryKey: likeInfoQueryKey,
				});

				// 현재 캐시된 좋아요 정보 가져오기
				const previousData =
					queryClient.getQueryData<LikeInfo>(likeInfoQueryKey);

				// 좋아요 상태 확인
				const likedBySet = new Set(previousData?.liked_by ?? []);
				const isLiked = likedBySet.has(identifier);
				const likeDelta = isLiked ? -1 : 1;

				// Optimistic update
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

				return { previousData, postId, isLiked } as MutationContext;
			},

			onError: (
				_err: unknown,
				_variables: ToggleLikeVariables,
				context: MutationContext | undefined,
			) => {
				if (context) {
					// 에러 시 이전 상태로 롤백
					queryClient.setQueryData(
						trpc.blog.getLikeInfo.queryOptions(context.postId).queryKey,
						context.previousData,
					);
				}
			},

			onSettled: (
				_data: unknown,
				_error: unknown,
				variables: ToggleLikeVariables,
			) => {
				if (variables?.postId) {
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
				}
			},
		}),
	);

	return {
		toggleLike: mutation.mutate,
		isPending: mutation.isPending,
	};
};

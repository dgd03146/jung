import { useTRPC } from '@/fsd/app';
import { useSupabaseAuth } from '@/fsd/shared';
import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type LikeInfo = {
	likes: number;
	liked_by: string[];
};

type MutationContext = {
	previousData: LikeInfo | undefined;
	postId: string;
	isLiked: boolean;
};

export const useTogglePostLike = () => {
	const queryClient = useQueryClient();
	const trpc = useTRPC();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const mutation = useMutation(
		trpc.post.toggleLike.mutationOptions({
			onMutate: async (variables: { postId: string; userId: string }) => {
				const { postId, userId } = variables;

				// 좋아요 정보 쿼리키
				const likeInfoQueryKey =
					trpc.post.getLikeInfo.queryOptions(postId).queryKey;

				// 진행 중인 쿼리 취소
				await queryClient.cancelQueries({
					queryKey: likeInfoQueryKey,
				});

				// 현재 캐시된 좋아요 정보 가져오기
				const previousData =
					queryClient.getQueryData<LikeInfo>(likeInfoQueryKey);

				// 좋아요 상태 확인
				const isLiked = !!previousData?.liked_by?.includes(userId);
				const likeDelta = isLiked ? -1 : 1;

				// Optimistic update
				queryClient.setQueryData<LikeInfo>(likeInfoQueryKey, (old) => {
					if (!old) return old;

					return {
						likes: old.likes + likeDelta,
						liked_by: isLiked
							? old.liked_by.filter((id) => id !== userId)
							: [...old.liked_by, userId],
					};
				});

				return { previousData, postId, isLiked } as MutationContext;
			},

			onError: (
				_err: unknown,
				variables: { postId: string; userId: string },
				context: MutationContext | undefined,
			) => {
				if (context) {
					// 에러 시 이전 상태로 롤백
					queryClient.setQueryData(
						trpc.post.getLikeInfo.queryOptions(context.postId).queryKey,
						context.previousData,
					);
				}
				showToast('Failed to update like status. Please try again.', 'error');
				console.error('Error toggling post like:', _err);
			},

			onSettled: (
				_data: unknown,
				_error: unknown,
				variables: { postId: string; userId: string },
			) => {
				if (variables?.postId) {
					// 동시 뮤테이션 수 확인
					const activeMutationsCount = queryClient.isMutating({
						predicate: (mutation) =>
							mutation.options.mutationKey?.[0] === 'post.toggleLike',
					});

					if (activeMutationsCount === 1) {
						// 마지막 뮤테이션에서만 쿼리 무효화
						queryClient.invalidateQueries({
							queryKey: trpc.post.getLikeInfo.queryOptions(variables.postId)
								.queryKey,
						});
					}
				}
			},
		}),
	);

	const toggleLike = (postId: string) => {
		if (!user) {
			showToast('Please log in to like posts', 'error');
			return;
		}

		mutation.mutate({
			postId,
			userId: user.id,
		});
	};

	return {
		toggleLike,
		isPending: mutation.isPending,
	};
};

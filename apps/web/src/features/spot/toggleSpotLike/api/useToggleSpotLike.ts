'use client';

import { useTRPC } from '@/fsd/app';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type LikeInfo = {
	likes: number;
	liked_by: string[];
};

type MutationContext = {
	previousData: LikeInfo | undefined;
	spotId: string;
	isLiked: boolean;
};

type ToggleLikeVariables = {
	spotId: string;
	userId: string;
};

export const useToggleSpotLike = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const mutation = useMutation(
		trpc.spot.toggleLike.mutationOptions({
			onMutate: async (variables: ToggleLikeVariables) => {
				const { spotId, userId } = variables;

				// 좋아요 정보 쿼리키
				const likeInfoQueryKey =
					trpc.spot.getLikeInfo.queryOptions(spotId).queryKey;

				// 진행 중인 쿼리 취소
				await queryClient.cancelQueries({
					queryKey: likeInfoQueryKey,
				});

				// 현재 캐시된 좋아요 정보 가져오기
				const previousData =
					queryClient.getQueryData<LikeInfo>(likeInfoQueryKey);

				// 좋아요 상태 확인
				const likedBySet = new Set(previousData?.liked_by ?? []);
				const isLiked = likedBySet.has(userId);
				const likeDelta = isLiked ? -1 : 1;

				// Optimistic update
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

				return { previousData, spotId, isLiked } as MutationContext;
			},

			onError: (
				_err: unknown,
				_variables,
				context: MutationContext | undefined,
			) => {
				if (context) {
					// 에러 시 이전 상태로 롤백
					queryClient.setQueryData(
						trpc.spot.getLikeInfo.queryOptions(context.spotId).queryKey,
						context.previousData,
					);
				}
			},

			onSettled: (_data, _error, variables) => {
				if (variables?.spotId) {
					if (
						queryClient.isMutating({
							mutationKey: trpc.spot.toggleLike.mutationOptions().mutationKey,
						}) === 1
					) {
						queryClient.invalidateQueries({
							queryKey: trpc.spot.getLikeInfo.queryOptions(variables.spotId)
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

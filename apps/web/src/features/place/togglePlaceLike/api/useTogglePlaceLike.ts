'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/app';

type LikeInfo = {
	likes: number;
	liked_by: string[];
};

type MutationContext = {
	previousData: LikeInfo | undefined;
	placeId: string;
	isLiked: boolean;
};

type ToggleLikeVariables = {
	placeId: string;
	userId: string;
};

export const useTogglePlaceLikeMutation = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const mutation = useMutation(
		trpc.place.toggleLike.mutationOptions({
			onMutate: async (variables: ToggleLikeVariables) => {
				const { placeId, userId } = variables;

				// 좋아요 정보 쿼리키
				const likeInfoQueryKey =
					trpc.place.getLikeInfo.queryOptions(placeId).queryKey;

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

				return { previousData, placeId, isLiked } as MutationContext;
			},

			onError: (
				_err: unknown,
				_variables,
				context: MutationContext | undefined,
			) => {
				if (context) {
					// 에러 시 이전 상태로 롤백
					queryClient.setQueryData(
						trpc.place.getLikeInfo.queryOptions(context.placeId).queryKey,
						context.previousData,
					);
				}
			},

			onSettled: (_data, _error, variables) => {
				if (variables?.placeId) {
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
				}
			},
		}),
	);

	return {
		toggleLike: mutation.mutate,
		isPending: mutation.isPending,
	};
};

'use client';

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
	spotId: string;
	isLiked: boolean;
};

export const useToggleSpotLike = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const mutation = useMutation(
		trpc.spot.toggleLike.mutationOptions({
			onMutate: async (variables: { spotId: string; userId: string }) => {
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

				return { previousData, spotId, isLiked } as MutationContext;
			},

			onError: (
				_err: unknown,
				variables: { spotId: string; userId: string },
				context: MutationContext | undefined,
			) => {
				showToast('Failed to update like status. Please try again.', 'error');

				if (context) {
					// 에러 시 이전 상태로 롤백
					queryClient.setQueryData(
						trpc.spot.getLikeInfo.queryOptions(context.spotId).queryKey,
						context.previousData,
					);
				}
			},

			onSettled: (
				_data: unknown,
				_error: unknown,
				variables: { spotId: string; userId: string },
			) => {
				if (variables?.spotId) {
					// 동시 뮤테이션 수 확인
					const activeMutationsCount = queryClient.isMutating({
						predicate: (mutation) =>
							mutation.options.mutationKey?.[0] === 'spot.toggleLike',
					});

					if (activeMutationsCount === 1) {
						// 마지막 뮤테이션에서만 쿼리 무효화
						queryClient.invalidateQueries({
							queryKey: trpc.spot.getLikeInfo.queryOptions(variables.spotId)
								.queryKey,
						});
					}
				}
			},
		}),
	);

	const toggleLike = (spotId: string) => {
		if (!user) {
			return false;
		}

		mutation.mutate({
			spotId,
			userId: user.id,
		});

		return true;
	};

	return {
		toggleLike,
		isPending: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
	};
};

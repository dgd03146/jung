import { useTRPC } from '@/fsd/app';
import type { Photo } from '@jung/shared/types';
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

				const isLiked = !!previousData?.liked_by?.includes(userId);
				const likeDelta = isLiked ? -1 : 1;

				// optimistic update
				queryClient.setQueryData<LikeInfo>(likeInfoQueryKey, (old) => {
					if (!old) return old;

					return {
						likes: old.likes + likeDelta,
						liked_by: isLiked
							? old.liked_by.filter((id) => id !== userId)
							: [...old.liked_by, userId],
					};
				});

				return { previousData, photoId, isLiked };
			},

			onError: (
				_err: unknown,
				variables: { photoId: string; userId: string },
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

			onSettled: (
				_data: Photo | undefined,
				_error: unknown,
				variables: { photoId: string; userId: string },
			) => {
				if (variables?.photoId) {
					const activeMutationsCount = queryClient.isMutating({
						predicate: (mutation) =>
							mutation.options.mutationKey?.[0] === 'photos.toggleLike',
					});

					if (activeMutationsCount === 1) {
						// 마지막 뮤테이션에서만 쿼리 무효화

						// 좋아요 정보 쿼리 무효화
						queryClient.invalidateQueries({
							queryKey: trpc.photos.getLikeInfo.queryOptions(variables.photoId)
								.queryKey,
						});

						// // 목록 쿼리 무효화
						// queryClient.invalidateQueries({
						// 	queryKey: trpc.photos.getAllPhotos.infiniteQueryOptions({
						// 		limit: PHOTO_DEFAULTS.LIMIT,
						// 		sort,
						// 		q: PHOTO_DEFAULTS.QUERY
						// 	}).queryKey,
						// });
					}
				}
			},
		}),
	);

	return {
		toggleLike: mutation.mutate,
		isPending: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
	};
};

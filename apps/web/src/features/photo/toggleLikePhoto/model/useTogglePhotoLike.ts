import { useTRPC } from '@/fsd/app';
import type { Photo } from '@jung/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLikePhotoAction } from '../api/toggleLikePhotoAction';
import { updatePhotoLikes } from '../lib/updatePhotoLikes';

export const useTogglePhotoLike = () => {
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	const mutation = useMutation({
		mutationKey: ['togglePhotoLike'],
		mutationFn: async ({
			photoId,
			userId,
			isCurrentlyLiked,
		}: {
			photoId: string;
			userId: string;
			isCurrentlyLiked?: boolean;
		}) => {
			const response = await toggleLikePhotoAction(photoId, userId);

			if (!response.success) {
				throw new Error(response.error || 'Failed to toggle like');
			}

			return response.data;
		},

		onMutate: async ({ photoId, userId, isCurrentlyLiked }) => {
			const queryKey = trpc.photos.getPhotoById.queryOptions(photoId).queryKey;

			await queryClient.cancelQueries({
				queryKey,
			});

			const previousData = queryClient.getQueryData<Photo>(queryKey);

			const isLiked =
				isCurrentlyLiked !== undefined
					? isCurrentlyLiked
					: !!previousData?.liked_by?.includes(userId);

			const likeDelta = isLiked ? -1 : 1;

			queryClient.setQueryData(queryKey, (old) => {
				if (!old) {
					return old;
				}
				const updated = updatePhotoLikes(old, likeDelta, userId);

				return updated;
			});

			return { previousData, photoId, isLiked };
		},

		onError: (_err, variables, context) => {
			if (context) {
				queryClient.setQueryData(
					trpc.photos.getPhotoById.queryOptions(context.photoId).queryKey,
					context.previousData,
				);
			}
		},

		onSuccess: (updatedPhoto, variables) => {
			const queryKey = trpc.photos.getPhotoById.queryOptions(
				variables.photoId,
			).queryKey;

			queryClient.setQueryData(queryKey, updatedPhoto);
		},

		onSettled: (_data, _error, variables) => {
			if (variables?.photoId) {
				const activeMutationsCount = queryClient.isMutating({
					mutationKey: ['togglePhotoLike'],
				});

				if (activeMutationsCount === 1) {
					queryClient.invalidateQueries({
						queryKey: trpc.photos.getPhotoById.queryOptions(variables.photoId)
							.queryKey,
					});
				} else {
					// 쿼리 무효화 건너뜀
				}
			}
		},
	});

	return {
		toggleLike: mutation.mutate,
		isPending: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
	};
};

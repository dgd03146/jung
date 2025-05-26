import { useTRPC } from '@/fsd/app';
import type { Photo } from '@jung/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLikePhotoAction } from '../api/toggleLikePhotoAction';
import { updatePhotoLikes } from '../lib/updatePhotoLikes';

export const useTogglePhotoLike = () => {
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	const mutation = useMutation({
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
			await queryClient.cancelQueries({
				queryKey: trpc.photos.getPhotoById.queryOptions(photoId).queryKey,
			});

			const previousData = queryClient.getQueryData<Photo>(
				trpc.photos.getPhotoById.queryOptions(photoId).queryKey,
			);

			const isLiked =
				isCurrentlyLiked !== undefined
					? isCurrentlyLiked
					: !!previousData?.liked_by?.includes(userId);

			const likeDelta = isLiked ? -1 : 1;

			queryClient.setQueryData(
				trpc.photos.getPhotoById.queryOptions(photoId).queryKey,
				(old) => {
					const updated = updatePhotoLikes(old, likeDelta, userId);

					return updated;
				},
			);

			return { previousData, photoId };
		},

		onError: (_err, variables, context) => {
			if (context) {
				queryClient.setQueryData(
					trpc.photos.getPhotoById.queryOptions(context.photoId).queryKey,
					context.previousData,
				);
			}
		},

		onSettled: (_data, _error, variables) => {
			if (variables?.photoId) {
				queryClient.invalidateQueries({
					queryKey: trpc.photos.getPhotoById.queryOptions(variables.photoId)
						.queryKey,
				});

				queryClient.invalidateQueries({
					queryKey: [trpc.photos._def.pathRoot],
					exact: false,
				});

				queryClient.invalidateQueries({
					queryKey: trpc.photos.getAdjacentPhotos.queryOptions({
						id: variables.photoId,
					}).queryKey,
					exact: false,
				});
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

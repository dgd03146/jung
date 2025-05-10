import { useTRPC } from '@/fsd/app';
import type { Photo } from '@jung/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLikePhotoAction } from '../api/toggleLikePhotoAction';
import { updatePhotoLikes } from '../lib/updatePhotoLikes';

export const useTogglePhotoLike = () => {
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	const mutation = useMutation({
		mutationFn: ({ photoId, userId }: { photoId: string; userId: string }) =>
			toggleLikePhotoAction(photoId, userId),

		onMutate: async ({ photoId, userId }) => {
			await queryClient.cancelQueries({
				queryKey: trpc.photos.getPhotoById.queryOptions(photoId).queryKey,
			});

			const previousData = queryClient.getQueryData<Photo>(
				trpc.photos.getPhotoById.queryOptions(photoId).queryKey,
			);

			const isLiked = !!previousData?.liked_by?.includes(userId);

			queryClient.setQueryData(
				trpc.photos.getPhotoById.queryOptions(photoId).queryKey,
				(old) => updatePhotoLikes(old, isLiked ? -1 : 1, userId),
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

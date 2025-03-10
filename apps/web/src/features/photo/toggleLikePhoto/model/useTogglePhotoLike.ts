import { useTRPC } from '@/fsd/app';
import { useSupabaseAuth } from '@/fsd/shared';
import { useToast } from '@jung/design-system';
import type { Photo } from '@jung/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { toggleLikePhotoAction } from '../api/toggleLikePhotoAction';
import { updatePhotoLikes } from '../lib/updatePhotoLikes';

export const useTogglePhotoLike = () => {
	const queryClient = useQueryClient();
	const trpc = useTRPC();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const toggleLike = async (photoId: string) => {
		if (!user) {
			showToast('Login is required', 'warning');
			return false;
		}

		const previousData = queryClient.getQueryData(
			trpc.photos.getPhotoById.queryOptions(photoId).queryKey,
		);

		const isLiked = !!previousData?.liked_by?.includes(user.id);

		// 낙관적 업데이트
		queryClient.setQueryData(
			trpc.photos.getPhotoById.queryOptions(photoId).queryKey,
			(old: Photo | undefined) =>
				updatePhotoLikes(old, isLiked ? -1 : 1, user.id),
		);

		try {
			const updatedPhoto = await toggleLikePhotoAction(photoId, user.id);

			if (updatedPhoto) {
				queryClient.setQueryData(
					trpc.photos.getPhotoById.queryOptions(photoId).queryKey,
					updatedPhoto,
				);
			}

			return true;
		} catch (error) {
			// 에러 발생 시 이전 데이터로 롤백
			queryClient.setQueryData(
				trpc.photos.getPhotoById.queryOptions(photoId).queryKey,
				previousData,
			);

			if (error instanceof Error) {
				showToast(`Failed to update like: ${error.message}`, 'error');
			} else {
				showToast('Failed to update like', 'error');
			}
			return false;
		}
	};

	const getIsLiked = (photoId: string) => {
		const photo = queryClient.getQueryData<Photo>(
			trpc.photos.getPhotoById.queryOptions(photoId).queryKey,
		);
		return !!photo?.liked_by?.includes(user?.id ?? '');
	};

	return {
		toggleLike,
		getIsLiked,
	};
};

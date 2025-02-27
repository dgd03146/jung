import { trpc, useSupabaseAuth } from '@/fsd/shared';
import { useToast } from '@jung/design-system';
import type { Photo } from '@jung/shared/types';
import { toggleLikePhotoAction } from '../api/toggleLikePhotoAction';
import { updatePhotoLikes } from '../lib/updatePhotoLikes';

export const useTogglePhotoLike = () => {
	const utils = trpc.useUtils();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const toggleLike = async (photoId: string) => {
		if (!user) {
			showToast('Login is required', 'warning');
			return false;
		}

		const previousData = utils.photos.getPhotoById.getData(photoId);
		const isLiked = !!previousData?.liked_by?.includes(user.id);

		utils.photos.getPhotoById.setData(photoId, (old: Photo | undefined) =>
			updatePhotoLikes(old, isLiked ? -1 : 1, user.id),
		);

		try {
			const updatedPhoto = await toggleLikePhotoAction(photoId, user.id);

			if (updatedPhoto) {
				utils.photos.getPhotoById.setData(photoId, updatedPhoto);
			}

			return true;
		} catch (error) {
			utils.photos.getPhotoById.setData(photoId, previousData);
			showToast('Failed to update like', 'error');
			return false;
		}
	};

	const getIsLiked = (photoId: string) => {
		const photo = utils.photos.getPhotoById.getData(photoId);
		return !!photo?.liked_by?.includes(user?.id ?? '');
	};

	return {
		toggleLike,
		getIsLiked,
	};
};

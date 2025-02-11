import { trpc, useSupabaseAuth } from '@/fsd/shared';
import { useToast } from '@jung/design-system';
import type { Photo } from '@jung/shared/types';
import { usePathname, useRouter } from 'next/navigation';
import { toggleLikePhotoAction } from '../api/toggleLikePhotoAction';
import { updatePhotoLikes } from '../lib/updatePhotoLikes';

export const useTogglePhotoLike = () => {
	const utils = trpc.useUtils();
	const { user } = useSupabaseAuth();
	const showToast = useToast();
	const router = useRouter();
	const pathname = usePathname();

	const toggleLike = async (photoId: string) => {
		if (!user) {
			const confirmed = window.confirm(
				'Please log in to like photos, Would you like to go to login page?',
			);

			if (confirmed) {
				const currentPath = `/gallery/photo/${photoId}`;
				const locale = pathname.split('/')[1];
				router.push(`/${locale}/login?next=${encodeURIComponent(currentPath)}`);
			}
			return false;
		}

		const previousData = utils.photos.getPhotoById.getData(photoId);
		const isLiked = !!previousData?.liked_by?.includes(user.id);

		// Optimistic update
		utils.photos.getPhotoById.setData(photoId, (old: Photo | undefined) =>
			updatePhotoLikes(old, isLiked ? -1 : 1, user.id),
		);

		try {
			await toggleLikePhotoAction(photoId, user.id);

			await utils.photos.getPhotoById.invalidate(photoId);
			return true;
		} catch (error) {
			// Rollback on error
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

import { SPOT_PARAMS } from '@/fsd/entities/spot';
import { trpc, useSupabaseAuth } from '@/fsd/shared';
import { useToast } from '@jung/design-system';
import { usePathname, useRouter } from 'next/navigation';
import { toggleLikeSpotAction } from '../api/toggleLikeSpotAction';

const spotQueryParams = {
	cat: SPOT_PARAMS.CAT,
	limit: SPOT_PARAMS.LIMIT,
	q: SPOT_PARAMS.QUERY,
	sort: SPOT_PARAMS.SORT,
} as const;

export const useToggleSpotLike = () => {
	const utils = trpc.useUtils();
	const { user } = useSupabaseAuth();
	const showToast = useToast();
	const userId = user?.id || '';
	const pathname = usePathname();
	const router = useRouter();

	const isDetailPage = pathname.includes('/spots/');

	const toggleLike = async (spotId: string) => {
		if (!user) {
			const confirmed = window.confirm(
				'Please log in to like photos, Would you like to go to login page?',
			);

			if (confirmed) {
				const currentPath = pathname;
				const locale = pathname.split('/')[1];
				router.push(`/${locale}/login?next=${encodeURIComponent(currentPath)}`);
			}
			return false;
		}

		const spotData = isDetailPage
			? utils.spot.getSpotById.getData(spotId)
			: null;

		const allSpots = !isDetailPage
			? utils.spot.getAllSpots.getInfiniteData(spotQueryParams)
			: null;

		const previousData =
			spotData ||
			allSpots?.pages
				.flatMap((page) => page.items)
				.find((s) => s.id === spotId);

		if (!previousData) {
			throw new Error(`Can't find previous data`);
		}

		const isLiked = previousData?.liked_by?.includes(user.id) || false;

		// 상세 페이지에서 좋아요 누를 때
		if (spotData && isDetailPage) {
			utils.spot.getSpotById.setData(spotId, (old) => {
				if (!old) return old;

				return {
					...old,
					likes: isLiked ? old.likes - 1 : old.likes + 1,
					liked_by: isLiked
						? old.liked_by.filter((id) => id !== user.id)
						: [...(old.liked_by || []), user.id],
				};
			});
		}

		//  리스트 페이지에서 좋아요 누를 때
		if (allSpots && !isDetailPage) {
			utils.spot.getAllSpots.setInfiniteData(spotQueryParams, (old) => {
				if (!old) return old;

				return {
					...old,
					pages: old.pages.map((page) => ({
						...page,
						items: page.items.map((s) => {
							if (s.id === spotId) {
								return {
									...s,
									likes: isLiked ? s.likes - 1 : s.likes + 1,
									liked_by: isLiked
										? s.liked_by.filter((id) => id !== user.id)
										: [...(s.liked_by || []), user.id],
								};
							}
							return s;
						}),
					})),
				};
			});
		}

		try {
			await toggleLikeSpotAction({ spotId, userId });
			return true;
		} catch (error) {
			// Rollback on error
			utils.spot.getSpotById.setData(spotId, previousData);
			showToast('Failed to update like', 'error');
			return false;
		}
	};

	const getIsLiked = (spotId: string) => {
		const spotData = utils.spot.getSpotById.getData(spotId);
		if (spotData && isDetailPage) {
			return !!spotData.liked_by?.includes(user?.id ?? '');
		}

		const allSpots = utils.spot.getAllSpots.getInfiniteData(spotQueryParams);
		const spot = allSpots?.pages
			.flatMap((page) => page.items)
			.find((s) => s.id === spotId);

		return !!spot?.liked_by?.includes(user?.id ?? '');
	};

	return {
		toggleLike,
		getIsLiked,
	};
};

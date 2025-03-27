'use client';

import { useTRPC } from '@/fsd/app';
import { SPOT_DEFAULTS } from '@/fsd/entities/spot';
import { useSupabaseAuth } from '@/fsd/shared';
import { useToast } from '@jung/design-system/components';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { toggleLikeSpotAction } from '../api/toggleLikeSpotAction';

const spotQueryParams = {
	cat: SPOT_DEFAULTS.CAT,
	limit: SPOT_DEFAULTS.LIMIT,
	q: SPOT_DEFAULTS.QUERY,
	sort: SPOT_DEFAULTS.SORT,
} as const;

export const useToggleSpotLike = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
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
			? queryClient.getQueryData(
					trpc.spot.getSpotById.queryOptions(spotId).queryKey,
			  )
			: null;

		const allSpots = !isDetailPage
			? queryClient.getQueryData(
					trpc.spot.getAllSpots.infiniteQueryOptions(spotQueryParams).queryKey,
			  )
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
			queryClient.setQueryData(
				trpc.spot.getSpotById.queryOptions(spotId).queryKey,
				(old) => {
					if (!old) return old;

					return {
						...old,
						likes: isLiked ? old.likes - 1 : old.likes + 1,
						liked_by: isLiked
							? old.liked_by.filter((id) => id !== user.id)
							: [...(old.liked_by || []), user.id],
					};
				},
			);
		}

		//  리스트 페이지에서 좋아요 누를 때
		if (allSpots && !isDetailPage) {
			queryClient.setQueryData(
				trpc.spot.getAllSpots.infiniteQueryOptions(spotQueryParams).queryKey,
				(old) => {
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
				},
			);
		}

		try {
			await toggleLikeSpotAction({ spotId, userId });
			return true;
		} catch (error) {
			// Rollback on error
			queryClient.setQueryData(
				trpc.spot.getSpotById.queryOptions(spotId).queryKey,
				previousData,
			);
			showToast('Failed to update like', 'error');
			return false;
		}
	};

	const getIsLiked = (spotId: string) => {
		const spotData = queryClient.getQueryData(
			trpc.spot.getSpotById.queryOptions(spotId).queryKey,
		);
		if (spotData && isDetailPage) {
			return !!spotData.liked_by?.includes(user?.id ?? '');
		}

		const allSpots = queryClient.getQueryData(
			trpc.spot.getAllSpots.infiniteQueryOptions(spotQueryParams).queryKey,
		);
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

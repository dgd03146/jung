import type {
	Place,
	PlaceQueryParams,
	PlaceQueryResult,
	PlaceWithCategory,
} from '@jung/shared/types';
import { TRPCError } from '@trpc/server';
import { supabase } from '../lib/supabase';

export const placesService = {
	async findMany({
		limit,
		cursor,
		cat,
		q: search,
		sort = 'latest',
	}: PlaceQueryParams): Promise<PlaceQueryResult> {
		try {
			let query = supabase
				.from('spots')
				.select(`
				*,
				categories!inner(name).name as category
			`)
				.eq('categories.type', 'spots');

			if (cat && cat !== 'all') {
				const { data: categoryIds, error: categoryError } = await supabase
					.from('categories')
					.select('id')
					.ilike('name', cat)
					.eq('type', 'spots');

				if (categoryError) {
					throw new TRPCError({
						code: 'INTERNAL_SERVER_ERROR',
						message: 'Failed to fetch categories. Please try again later.',
						cause: categoryError,
					});
				}

				if (categoryIds && categoryIds.length > 0) {
					query = query.in(
						'category_id',
						categoryIds.map((category) => category.id),
					);
				} else {
					return {
						items: [],
						nextCursor: null,
					};
				}
			}

			if (search) {
				query = query.or(
					`title.ilike.%${search}%,description.ilike.%${search}%`,
				);
			}

			if (sort === 'popular') {
				query = query.order('likes', { ascending: false });
			} else {
				query = query.order('id', { ascending: false });
			}

			if (cursor) {
				query = query.lt('id', cursor);
			}

			query = query.limit(limit);

			const { data, error } = await query.returns<PlaceWithCategory[]>();

			if (error) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to fetch places. Please try again later.',
					cause: error,
				});
			}

			if (!data || data.length === 0) {
				return {
					items: [],
					nextCursor: undefined,
				};
			}

			const nextCursor =
				data.length === limit ? data[data.length - 1]?.id : undefined;

			return {
				items: data.map((place) => {
					const { categories, category_id, ...rest } = place;
					return {
						...rest,
						category: categories.name,
					};
				}),
				nextCursor,
			};
		} catch (error) {
			if (error instanceof TRPCError) throw error;
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'An unexpected error occurred',
				cause: error,
			});
		}
	},

	async findById(id: string): Promise<Place> {
		const { data, error } = await supabase
			.from('spots')
			.select(`
				*,
				categories!inner(name)->name as category
			`)
			.eq('id', id)
			.single<PlaceWithCategory>();

		if (error) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Place not found. Please try searching again.',
				cause: error,
			});
		}

		if (!data) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Place not found. Please try searching again.',
			});
		}

		try {
			const { categories, category_id, ...rest } = data;
			return {
				...rest,
				category: categories.name,
			};
		} catch (e) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Invalid place data format',
				cause: e,
			});
		}
	},

	async toggleLike({
		placeId,
		userId,
	}: {
		placeId: string;
		userId: string;
	}): Promise<Place> {
		const { data: place, error: selectError } = await supabase
			.from('spots')
			.select('*')
			.eq('id', placeId)
			.single<Place>();

		if (selectError) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Failed to fetch place: ${selectError.message}`,
				cause: selectError,
			});
		}

		if (!place) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Place not found',
			});
		}

		const hasLiked = place.liked_by.includes(userId);
		const newLikes = hasLiked ? place.likes - 1 : place.likes + 1;
		const newLikedBy = hasLiked
			? place.liked_by.filter((id) => id !== userId)
			: [...place.liked_by, userId];

		const { data, error } = await supabase
			.from('spots')
			.update({
				likes: newLikes,
				liked_by: newLikedBy,
			})
			.eq('id', placeId)
			.select()
			.single<Place>();

		if (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Failed to toggle like: ${error.message}`,
				cause: error,
			});
		}

		if (!data) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Place not found or like could not be toggled',
			});
		}

		return data;
	},

	// 좋아요 정보만 가져오기
	async getLikeInfo(
		placeId: string,
	): Promise<{ likes: number; liked_by: string[] }> {
		try {
			const { data, error } = await supabase
				.from('spots')
				.select('likes, liked_by')
				.eq('id', placeId)
				.single<{ likes: number; liked_by: string[] }>();

			if (error) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Failed to fetch like info: ${error.message}`,
					cause: error,
				});
			}

			if (!data) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Place not found',
				});
			}

			return {
				likes: data.likes,
				liked_by: data.liked_by || [],
			};
		} catch (error) {
			if (error instanceof TRPCError) {
				throw error;
			}

			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'An unexpected error occurred while fetching like info',
				cause: error,
			});
		}
	},
};

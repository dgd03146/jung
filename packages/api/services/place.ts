import type {
	Place,
	PlaceQueryParams,
	PlaceQueryResult,
	PlaceWithCategory,
} from '@jung/shared/types';
import { TRPCError } from '@trpc/server';
import { escapePostgrestPattern, RRF_K } from '../lib/constants';
import { generateEmbedding } from '../lib/embedding';
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
				.from('places')
				.select(`
				*,
				categories!inner(name).name as category
			`)
				.eq('categories.type', 'places');

			if (cat && cat !== 'all') {
				const { data: categoryIds, error: categoryError } = await supabase
					.from('categories')
					.select('id')
					.ilike('name', cat)
					.eq('type', 'places');

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
				const escaped = escapePostgrestPattern(search);
				query = query.or(
					`title.ilike.%${escaped}%,description.ilike.%${escaped}%`,
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
			.from('places')
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
			.from('places')
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
			.from('places')
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
				.from('places')
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

	// ===== 시맨틱 검색 =====

	async semanticSearch({
		query,
		limit = 5,
		mode = 'hybrid',
	}: {
		query: string;
		limit?: number;
		mode?: 'vector' | 'keyword' | 'hybrid';
	}): Promise<{
		items: Array<{
			id: string;
			title: string;
			description: string;
			address?: string;
			similarity?: number;
			source: 'vector' | 'keyword' | 'both';
		}>;
	}> {
		let vectorResults: Array<{
			id: string;
			title: string;
			description: string;
			address: string;
			similarity: number;
		}> = [];
		let keywordResults: Array<{
			id: string;
			title: string;
			description: string;
			address: string;
		}> = [];

		// Vector 검색
		if (mode === 'vector' || mode === 'hybrid') {
			try {
				const embedding = await generateEmbedding(query);
				const { data, error } = await supabase.rpc('match_places', {
					query_embedding: embedding,
					match_threshold: 0.3,
					match_count: limit * 2,
				});

				if (!error && data) {
					vectorResults = data;
				}
			} catch (err) {
				console.error('Place vector search error:', err);
			}
		}

		// Keyword 검색
		if (mode === 'keyword' || mode === 'hybrid') {
			const escaped = escapePostgrestPattern(query);
			const { data } = await supabase
				.from('places')
				.select('id, title, description, address')
				.or(`title.ilike.%${escaped}%,description.ilike.%${escaped}%`)
				.limit(limit * 2);

			if (data) {
				keywordResults = data;
			}
		}

		// RRF 병합
		const scores = new Map<
			string,
			{
				score: number;
				source: 'vector' | 'keyword' | 'both';
				data: {
					title: string;
					description: string;
					address?: string;
					similarity?: number;
				};
			}
		>();

		vectorResults.forEach((item, rank) => {
			const existing = scores.get(item.id);
			scores.set(item.id, {
				score: (existing?.score || 0) + 1 / (RRF_K + rank + 1),
				source: existing ? 'both' : 'vector',
				data: {
					title: item.title,
					description: item.description,
					address: item.address,
					similarity: item.similarity,
				},
			});
		});

		keywordResults.forEach((item, rank) => {
			const existing = scores.get(item.id);
			scores.set(item.id, {
				score: (existing?.score || 0) + 1 / (RRF_K + rank + 1),
				source: existing ? 'both' : 'keyword',
				data: {
					...existing?.data,
					title: item.title,
					description: item.description,
					address: item.address,
				},
			});
		});

		const sortedResults = [...scores.entries()]
			.sort((a, b) => b[1].score - a[1].score)
			.slice(0, limit);

		return {
			items: sortedResults.map(([id, { source, data }]) => ({
				id,
				title: data.title || '',
				description: data.description || '',
				address: data.address,
				similarity: data.similarity,
				source,
			})),
		};
	},

	/**
	 * 장소 임베딩 생성 및 저장
	 * 장소 생성/수정 시 호출
	 */
	async generateEmbeddingForPlace(
		placeId: string,
	): Promise<{ success: boolean }> {
		try {
			// 장소 조회
			const { data: place, error: fetchError } = await supabase
				.from('places')
				.select(
					'title, title_en, description, description_en, address, address_en, tags, tags_en',
				)
				.eq('id', placeId)
				.single();

			if (fetchError || !place) {
				console.error(`Place not found: ${placeId}`);
				return { success: false };
			}

			// 임베딩용 텍스트 준비
			const parts: string[] = [];
			if (place.title) parts.push(place.title);
			if (place.title_en && place.title_en !== place.title) {
				parts.push(place.title_en);
			}
			if (place.description) parts.push(place.description);
			if (place.description_en && place.description_en !== place.description) {
				parts.push(place.description_en);
			}
			if (place.address) parts.push(place.address);
			if (place.tags?.length) parts.push(place.tags.join(' '));

			const text = parts.join('\n');

			if (!text.trim()) {
				console.warn(`No text to embed for place ${placeId}`);
				return { success: false };
			}

			// 임베딩 생성
			const embedding = await generateEmbedding(text);

			// DB에 저장
			const { error: updateError } = await supabase
				.from('places')
				.update({ embedding })
				.eq('id', placeId);

			if (updateError) {
				console.error(
					`Failed to save embedding for place ${placeId}:`,
					updateError,
				);
				return { success: false };
			}

			return { success: true };
		} catch (err) {
			console.error(`Embedding generation failed for place ${placeId}:`, err);
			return { success: false };
		}
	},
};

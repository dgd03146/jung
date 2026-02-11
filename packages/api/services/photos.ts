import type { Photo } from '@jung/shared/types';
import { TRPCError } from '@trpc/server';
import {
	escapePostgrestPattern,
	KEYWORD_WEIGHT,
	MATCH_THRESHOLD,
	RRF_K,
	SIMILARITY_GAP_THRESHOLD,
	VECTOR_WEIGHT,
} from '../lib/constants';
import { generateEmbedding, TaskType } from '../lib/embedding';
import { generateHypotheticalDocument } from '../lib/queryExpansion';
import { supabase } from '../lib/supabase';

type QueryParams = {
	limit: number;
	cursor?: number;
	sort?: 'latest' | 'popular';
	q?: string;
};

type QueryResult = {
	items: Photo[];
	nextCursor: number | null;
};

export const photosService = {
	async findMany({
		limit,
		cursor,
		sort = 'latest',
		q,
	}: QueryParams): Promise<QueryResult> {
		try {
			// popular 정렬이면서 커서가 있을 때는 다른 방식으로 처리
			if (sort === 'popular' && cursor) {
				// 먼저 커서 위치의 photo 정보를 가져옴
				const { data: cursorPhoto, error: cursorError } = await supabase
					.from('photos')
					.select('created_at, likes, id')
					.eq('id', cursor)
					.single();

				if (cursorError) {
					throw new TRPCError({
						code: 'BAD_REQUEST',
						message: 'Invalid cursor provided',
						cause: cursorError,
					});
				}

				if (!cursorPhoto) {
					throw new TRPCError({
						code: 'BAD_REQUEST',
						message: 'Cursor photo not found',
					});
				}

				// 두 개의 별도 쿼리 실행

				// 1. 좋아요 수가 더 적은 항목 쿼리
				let lessLikesQuery = supabase
					.from('photos')
					.select('*')
					.lt('likes', cursorPhoto.likes)
					.order('likes', { ascending: false })
					.order('created_at', { ascending: false });

				// 2. 좋아요 수가 같고 날짜가 더 이전인 항목 쿼리
				let sameLikesQuery = supabase
					.from('photos')
					.select('*')
					.eq('likes', cursorPhoto.likes)
					.lt('created_at', cursorPhoto.created_at)
					.order('created_at', { ascending: false });

				// 검색어 필터가 있다면 적용
				if (q) {
					lessLikesQuery = lessLikesQuery.or(
						`description.ilike.%${q}%,tags.cs.{${q}}`,
					);
					sameLikesQuery = sameLikesQuery.or(
						`description.ilike.%${q}%,tags.cs.{${q}}`,
					);
				}

				// 각 쿼리에 제한 적용 (더 많은 결과를 가져와 병합 후 제한)
				lessLikesQuery = lessLikesQuery.limit(limit);
				sameLikesQuery = sameLikesQuery.limit(limit);

				// 병렬로 쿼리 실행
				const [lessLikesResult, sameLikesResult] = await Promise.all([
					lessLikesQuery,
					sameLikesQuery,
				]);

				// 에러 처리
				if (lessLikesResult.error) {
					console.error(
						'Error fetching photos with less likes:',
						lessLikesResult.error,
					);
					throw new TRPCError({
						code: 'INTERNAL_SERVER_ERROR',
						message: 'Failed to fetch photos. Please try again later.',
						cause: lessLikesResult.error,
					});
				}

				if (sameLikesResult.error) {
					console.error(
						'Error fetching photos with same likes:',
						sameLikesResult.error,
					);
					throw new TRPCError({
						code: 'INTERNAL_SERVER_ERROR',
						message: 'Failed to fetch photos. Please try again later.',
						cause: sameLikesResult.error,
					});
				}

				// 두 결과 병합 및 정렬
				const items = [
					...(lessLikesResult.data || []),
					...(sameLikesResult.data || []),
				]
					.sort((a, b) => {
						// 좋아요 수로 내림차순 정렬
						if (b.likes !== a.likes) {
							return b.likes - a.likes;
						}
						// 좋아요 수가 같으면 날짜로 내림차순 정렬
						return (
							new Date(b.created_at).getTime() -
							new Date(a.created_at).getTime()
						);
					})
					.slice(0, limit); // 최대 limit 개수만큼만 반환

				// 다음 커서 계산
				const nextCursor =
					items.length === limit ? Number(items[items.length - 1]?.id) : null;

				return {
					items,
					nextCursor,
				};
			}

			// 기본 쿼리 (latest 정렬 또는 cursor 없는 popular 정렬)
			let query = supabase.from('photos').select('*', { count: 'exact' });

			if (q) {
				query = query.or(`description.ilike.%${q}%,tags.cs.{${q}}`);
			}

			if (cursor) {
				const { data: cursorPhoto, error: cursorError } = await supabase
					.from('photos')
					.select('created_at, likes, id')
					.eq('id', cursor)
					.single();

				if (cursorError) {
					throw new TRPCError({
						code: 'BAD_REQUEST',
						message: 'Invalid cursor provided',
						cause: cursorError,
					});
				}

				if (cursorPhoto) {
					// 최신순일 경우만 여기서 처리 (popular은 위에서 이미 처리됨)
					query = query.lt('created_at', cursorPhoto.created_at);
				}
			}

			if (sort === 'popular') {
				query = query
					.order('likes', { ascending: false })
					.order('created_at', { ascending: false });
			} else {
				query = query.order('created_at', { ascending: false });
			}

			query = query.limit(limit);

			const { data, error } = await query;

			if (error) {
				console.error('Error fetching photos:', error);
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to fetch photos. Please try again later.',
					cause: error,
				});
			}

			if (!data || data.length === 0) {
				return {
					items: [],
					nextCursor: null,
				};
			}

			const nextCursor =
				data.length === limit ? Number(data[data.length - 1]?.id) : null;

			return {
				items: data,
				nextCursor,
			};
		} catch (error) {
			console.error('Unexpected error in findMany:', error);
			if (error instanceof TRPCError) {
				throw error;
			}

			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'An unexpected error occurred',
				cause: error,
			});
		}
	},

	async findById(id: string): Promise<Photo> {
		try {
			const { data, error } = await supabase
				.from('photos')
				.select('*')
				.eq('id', id)
				.single();

			if (error) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to fetch photo. Please try again later.',
					cause: error,
				});
			}

			if (!data) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Photo not found',
				});
			}

			return {
				...data,
				likes: 0,
				liked_by: [],
			};
		} catch (error) {
			if (error instanceof TRPCError) {
				throw error;
			}

			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'An unexpected error occurred',
				cause: error,
			});
		}
	},

	async findAdjacentPhotos(
		id: string,
		options?: {
			sort?: 'latest' | 'popular';
			collectionId?: string;
		},
	): Promise<{
		previous: Photo | null;
		next: Photo | null;
	}> {
		try {
			const { sort, collectionId } = options || {};

			const currentPhoto = await this.findById(id);
			if (collectionId) {
				const { data: previousPhoto } = await supabase
					.from('photos')
					.select(`
						*,
						collection_photos!inner(collection_id)
					`)
					.eq('collection_photos.collection_id', collectionId)
					.gt('created_at', currentPhoto.created_at)
					.order('created_at', { ascending: true })
					.limit(1)
					.single();

				const { data: nextPhoto } = await supabase
					.from('photos')
					.select(`
						*,
						collection_photos!inner(collection_id)
					`)
					.eq('collection_photos.collection_id', collectionId)
					.lt('created_at', currentPhoto.created_at)
					.order('created_at', { ascending: false })
					.limit(1)
					.single();

				return {
					previous: previousPhoto || null,
					next: nextPhoto || null,
				};
			}

			if (sort === 'popular') {
				const { data: prevMoreLikes } = await supabase
					.from('photos')
					.select('*')
					.gt('likes', currentPhoto.likes)
					.order('likes', { ascending: true })
					.limit(1)
					.maybeSingle();

				const { data: prevSameLikes } = await supabase
					.from('photos')
					.select('*')
					.eq('likes', currentPhoto.likes)
					.gt('created_at', currentPhoto.created_at)
					.order('created_at', { ascending: true })
					.limit(1)
					.maybeSingle();

				const { data: nextLessLikes } = await supabase
					.from('photos')
					.select('*')
					.lt('likes', currentPhoto.likes)
					.order('likes', { ascending: false })
					.limit(1)
					.maybeSingle();

				const { data: nextSameLikes } = await supabase
					.from('photos')
					.select('*')
					.eq('likes', currentPhoto.likes)
					.lt('created_at', currentPhoto.created_at)
					.order('created_at', { ascending: false })
					.limit(1)
					.maybeSingle();

				const previousPhoto = prevMoreLikes || prevSameLikes;
				const nextPhoto = nextLessLikes || nextSameLikes;

				return {
					previous: previousPhoto || null,
					next: nextPhoto || null,
				};
			}
			const { data: previousPhoto } = await supabase
				.from('photos')
				.select('*')
				.gt('created_at', currentPhoto.created_at)
				.order('created_at', { ascending: true })
				.limit(1)
				.single();

			const { data: nextPhoto } = await supabase
				.from('photos')
				.select('*')
				.lt('created_at', currentPhoto.created_at)
				.order('created_at', { ascending: false })
				.limit(1)
				.single();

			return {
				previous: previousPhoto || null,
				next: nextPhoto || null,
			};
		} catch (error) {
			if (error instanceof TRPCError) {
				throw error;
			}

			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch adjacent photos',
				cause: error,
			});
		}
	},

	async toggleLike({
		photoId,
		userId,
	}: {
		photoId: string;
		userId: string;
	}): Promise<Photo> {
		try {
			const { data: photo, error: selectError } = await supabase
				.from('photos')
				.select('*')
				.eq('id', photoId)
				.single<Photo>();

			if (selectError) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Failed to fetch photo: ${selectError.message}`,
					cause: selectError,
				});
			}

			if (!photo) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Photo not found',
				});
			}

			const hasLiked = photo.liked_by?.includes(userId) ?? false;
			const newLikes = hasLiked ? photo.likes - 1 : photo.likes + 1;
			const newLikedBy = hasLiked
				? photo.liked_by?.filter((id) => id !== userId)
				: [...(photo.liked_by || []), userId];

			const { data: updatedPhoto, error: updateError } = await supabase
				.from('photos')
				.update({
					likes: newLikes,
					liked_by: newLikedBy,
				})
				.eq('id', photoId)
				.select()
				.single<Photo>();

			if (updateError) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Failed to toggle like: ${updateError.message}`,
					cause: updateError,
				});
			}

			return updatedPhoto;
		} catch (error) {
			if (error instanceof TRPCError) {
				throw error;
			}

			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'An unexpected error occurred while toggling like',
				cause: error,
			});
		}
	},

	async getLikeInfo(
		photoId: string,
	): Promise<{ likes: number; liked_by: string[] }> {
		try {
			const { data, error } = await supabase
				.from('photos')
				.select('likes, liked_by')
				.eq('id', photoId)
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
					message: 'Photo not found',
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
			description: string;
			tags?: string[];
			similarity?: number;
			source: 'vector' | 'keyword' | 'both';
		}>;
	}> {
		let vectorResults: Array<{
			id: string;
			description: string;
			tags: string[];
			similarity: number;
		}> = [];
		let keywordResults: Array<{
			id: string;
			description: string;
			tags: string[];
		}> = [];

		// Vector 검색
		if (mode === 'vector' || mode === 'hybrid') {
			try {
				const hydeText = await generateHypotheticalDocument(query);
				const isHyDE = hydeText !== query;
				const embedding = await generateEmbedding(
					hydeText,
					isHyDE ? TaskType.RETRIEVAL_DOCUMENT : TaskType.RETRIEVAL_QUERY,
				);
				const { data, error } = await supabase.rpc('match_photos', {
					query_embedding: embedding,
					match_threshold: MATCH_THRESHOLD,
					match_count: limit * 2,
				});

				if (!error && data) {
					vectorResults = data;
				}
			} catch (err) {
				console.error('Photo vector search error:', err);
			}
		}

		// Similarity gap 필터링
		if (vectorResults.length > 1) {
			const topSimilarity = vectorResults[0]?.similarity ?? 0;
			const minSimilarity = topSimilarity - SIMILARITY_GAP_THRESHOLD;
			vectorResults = vectorResults.filter(
				(item) => item.similarity >= minSimilarity,
			);
		}

		// Keyword 검색
		if (mode === 'keyword' || mode === 'hybrid') {
			const escaped = escapePostgrestPattern(query);
			// Use separate queries to avoid injection via .or() string interpolation
			const [descResult, tagsResult] = await Promise.all([
				supabase
					.from('photos')
					.select('id, description, tags')
					.ilike('description', `%${escaped}%`)
					.limit(limit * 2),
				supabase
					.from('photos')
					.select('id, description, tags')
					.contains('tags', [query])
					.limit(limit * 2),
			]);

			// Merge and deduplicate results
			const seen = new Set<string>();
			const merged: typeof keywordResults = [];
			for (const item of [
				...(descResult.data || []),
				...(tagsResult.data || []),
			]) {
				if (!seen.has(item.id)) {
					seen.add(item.id);
					merged.push(item);
				}
			}
			keywordResults = merged;
		}

		// RRF 병합
		const scores = new Map<
			string,
			{
				score: number;
				source: 'vector' | 'keyword' | 'both';
				data: {
					description: string;
					tags?: string[];
					similarity?: number;
				};
			}
		>();

		vectorResults.forEach((item, rank) => {
			const existing = scores.get(item.id);
			scores.set(item.id, {
				score: (existing?.score || 0) + VECTOR_WEIGHT / (RRF_K + rank + 1),
				source: existing ? 'both' : 'vector',
				data: {
					description: item.description,
					tags: item.tags,
					similarity: item.similarity,
				},
			});
		});

		keywordResults.forEach((item, rank) => {
			const existing = scores.get(item.id);
			scores.set(item.id, {
				score: (existing?.score || 0) + KEYWORD_WEIGHT / (RRF_K + rank + 1),
				source: existing ? 'both' : 'keyword',
				data: {
					...existing?.data,
					description: item.description,
					tags: item.tags,
				},
			});
		});

		const sortedResults = [...scores.entries()]
			.sort((a, b) => b[1].score - a[1].score)
			.slice(0, limit);

		return {
			items: sortedResults.map(([id, { source, data }]) => ({
				id,
				description: data.description || '',
				tags: data.tags,
				similarity: data.similarity,
				source,
			})),
		};
	},

	/**
	 * 사진 임베딩 생성 및 저장
	 * 사진 생성/수정 시 호출
	 */
	async generateEmbeddingForPhoto(
		photoId: string,
	): Promise<{ success: boolean }> {
		try {
			// 사진 조회
			const { data: photo, error: fetchError } = await supabase
				.from('photos')
				.select('description, description_en, tags, tags_en')
				.eq('id', photoId)
				.single();

			if (fetchError || !photo) {
				console.error(`Photo not found: ${photoId}`);
				return { success: false };
			}

			// 임베딩용 텍스트 준비
			const parts: string[] = [];
			if (photo.description) parts.push(photo.description);
			if (photo.description_en && photo.description_en !== photo.description) {
				parts.push(photo.description_en);
			}
			if (photo.tags?.length) parts.push(photo.tags.join(' '));
			if (photo.tags_en?.length) parts.push(photo.tags_en.join(' '));

			const text = parts.join('\n');

			if (!text.trim()) {
				console.warn(`No text to embed for photo ${photoId}`);
				return { success: false };
			}

			// 임베딩 생성 (문서 인덱싱이므로 RETRIEVAL_DOCUMENT)
			const embedding = await generateEmbedding(
				text,
				TaskType.RETRIEVAL_DOCUMENT,
			);

			if (embedding.length === 0) {
				console.warn(`Embedding generation skipped for photo ${photoId}`);
				return { success: false };
			}

			// DB에 저장
			const { error: updateError } = await supabase
				.from('photos')
				.update({ embedding })
				.eq('id', photoId);

			if (updateError) {
				console.error(
					`Failed to save embedding for photo ${photoId}:`,
					updateError,
				);
				return { success: false };
			}

			return { success: true };
		} catch (err) {
			console.error(`Embedding generation failed for photo ${photoId}:`, err);
			return { success: false };
		}
	},
};

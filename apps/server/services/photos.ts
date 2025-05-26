import type { Photo } from '@jung/shared/types';
import { TRPCError } from '@trpc/server';
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

			return data;
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
};

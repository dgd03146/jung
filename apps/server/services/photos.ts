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
					if (sort === 'popular') {
						query = query.or(
							`likes.lt.${cursorPhoto.likes},likes.eq.${cursorPhoto.likes}.and.created_at.lt.${cursorPhoto.created_at}`,
						);
					} else {
						query = query.lt('created_at', cursorPhoto.created_at);
					}
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

			const { data, error } = await query.returns<Photo[]>();

			if (error) {
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

			// 다음 페이지가 있는지 확인 (마지막 페이지 계산)
			const nextCursor =
				data.length === limit ? Number(data[data.length - 1]?.id) : null;

			return {
				items: data,
				nextCursor,
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
			// 컬렉션 ID가 제공된 경우 (무조건 최신순)
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

			// trending page일때 인기순
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
			// 최신순 정렬 (기본)
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

	// 좋아요 토글
	async toggleLike({
		photoId,
		userId,
	}: {
		photoId: string;
		userId: string;
	}): Promise<Photo> {
		try {
			// 1. 사진 데이터 가져오기
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

			// 2. 좋아요 상태 확인 및 업데이트
			const hasLiked = photo.liked_by?.includes(userId) ?? false;
			const newLikes = hasLiked ? photo.likes - 1 : photo.likes + 1;
			const newLikedBy = hasLiked
				? photo.liked_by?.filter((id) => id !== userId)
				: [...(photo.liked_by || []), userId];

			// 3. DB 업데이트
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

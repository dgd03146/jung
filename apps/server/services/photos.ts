import type { Photo } from '@jung/shared/types';
import { TRPCError } from '@trpc/server';
import { supabase } from '../lib/supabse';

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
		sort = 'latest', // 기본값 설정
		q,
	}: QueryParams): Promise<QueryResult> {
		try {
			let query = supabase.from('photos').select('*', { count: 'exact' });

			// 검색 조건 적용
			if (q) {
				query = query.or(`description.ilike.%${q}%,tags.cs.{${q}}`);
			}

			query = query.order('created_at', { ascending: false });

			// cursor 기반 페이지네이션
			if (cursor) {
				const { data: cursorPhoto, error: cursorError } = await supabase
					.from('photos')
					.select('created_at')
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
					query = query.lt('created_at', cursorPhoto.created_at);
				}
			}

			// 정렬 조건 적용 (popular인 경우 추가 정렬)
			if (sort === 'popular') {
				query = query.order('views', { ascending: false });
			} else {
				query = query.order('created_at', { ascending: false });
			}

			// 페이지 크기 제한
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

			// 다음 페이지 cursor 계산
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

	async findAdjacentPhotos(id: string): Promise<{
		previous: Photo | null;
		next: Photo | null;
	}> {
		try {
			// findById 재사용
			const currentPhoto = await this.findById(id);

			// 이전 사진 찾기
			const { data: previousPhoto } = await supabase
				.from('photos')
				.select('*')
				.lt('created_at', currentPhoto.created_at)
				.order('created_at', { ascending: false })
				.limit(1)
				.single();

			// 다음 사진 찾기
			const { data: nextPhoto } = await supabase
				.from('photos')
				.select('*')
				.gt('created_at', currentPhoto.created_at)
				.order('created_at', { ascending: true })
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

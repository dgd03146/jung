'use server';

import { caller } from '@/fsd/shared/api/trpc/server';

/**
 * 사진 좋아요 상태를 토글하는 서버 액션
 *
 * @param photoId 사진 ID
 * @param userId 사용자 ID
 * @returns 업데이트된 사진 정보
 */
export async function toggleLikePhotoAction(photoId: string, userId: string) {
	try {
		// trpc 서버 측 호출로 좋아요 토글
		const updatedPhoto = await caller.photos.toggleLike({
			photoId,
			userId,
		});

		// 성공 시 업데이트된 사진 정보 반환
		return {
			success: true,
			data: updatedPhoto,
		};
	} catch (error) {
		// 에러 로깅
		console.error('Failed to toggle like:', error);

		// 실패 시 에러 정보 반환
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error occurred',
		};
	}
}

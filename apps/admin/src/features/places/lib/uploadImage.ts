import { uploadToR2 } from '@/fsd/shared/lib';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

/**
 * Place 이미지를 R2에 업로드
 *
 * 반환값:
 * - key: R2에 저장된 파일 경로 (예: "places/abc123.jpg")
 * - width, height: 이미지 크기
 */
export const uploadPlaceImage = async (
	file: File,
): Promise<{
	key: string;
	width: number;
	height: number;
}> => {
	if (!file.type.startsWith('image/')) {
		throw new ApiError('Invalid file type', 'VALIDATION_ERROR');
	}

	return uploadToR2(file, 'places');
};

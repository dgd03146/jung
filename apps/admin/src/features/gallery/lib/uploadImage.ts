import { uploadToR2 } from '@/fsd/shared/lib';

/**
 * Gallery 이미지를 R2에 업로드
 *
 * 반환값:
 * - key: R2에 저장된 파일 경로 (예: "gallery/abc123.jpg")
 * - width, height: 이미지 크기
 */
export const uploadGalleryImage = async (
	file: File,
): Promise<{
	key: string;
	width: number;
	height: number;
}> => {
	return uploadToR2(file, 'gallery');
};

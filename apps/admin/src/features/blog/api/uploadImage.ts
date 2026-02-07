import { uploadToR2 } from '@/fsd/shared/lib';

/**
 * Blog 이미지를 R2에 업로드
 *
 * 반환값: R2에 저장된 파일 key (예: "blog/abc123.jpg")
 */
export const uploadImage = async (file: File): Promise<string> => {
	const { key } = await uploadToR2(file, 'blog');
	return key;
};

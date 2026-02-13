import { ApiError } from '@/fsd/shared/lib/errors/apiError';

const API_URL = import.meta.env.VITE_API_URL || '';

interface ImageMetadata {
	width: number;
	height: number;
}

/**
 * 이미지 크기 추출
 */
const getImageDimensions = (file: File): Promise<ImageMetadata> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			URL.revokeObjectURL(img.src);
			resolve({
				width: img.width,
				height: img.height,
			});
		};
		img.onerror = () => {
			URL.revokeObjectURL(img.src);
			reject(new ApiError('Failed to load image', 'VALIDATION_ERROR'));
		};
		img.src = URL.createObjectURL(file);
	});
};

export type UploadFolder = 'gallery' | 'places' | 'blog' | 'articles';

interface UploadResult {
	key: string;
	width: number;
	height: number;
}

/**
 * R2에 이미지 업로드
 *
 * 1. 서버에서 Presigned URL 발급
 * 2. Presigned URL로 직접 R2에 업로드
 * 3. DB에 저장할 key 반환
 */
export const uploadToR2 = async (
	file: File,
	folder: UploadFolder,
): Promise<UploadResult> => {
	try {
		// 1. 이미지 크기 추출
		const { width, height } = await getImageDimensions(file);

		// 2. Presigned URL 요청
		const response = await fetch(`${API_URL}/api/upload`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				filename: file.name,
				contentType: file.type,
				folder,
			}),
		});

		if (!response.ok) {
			throw new ApiError('Failed to get upload URL', 'UPLOAD_ERROR');
		}

		const { signedUrl, key } = await response.json();

		// 3. R2에 직접 업로드
		const uploadResponse = await fetch(signedUrl, {
			method: 'PUT',
			body: file,
			headers: {
				'Content-Type': file.type,
			},
		});

		if (!uploadResponse.ok) {
			throw new ApiError('Failed to upload file to R2', 'UPLOAD_ERROR');
		}

		return {
			key,
			width,
			height,
		};
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(
			'An unexpected error occurred while uploading the image',
			'UNKNOWN_ERROR',
		);
	}
};

import { ApiError } from '@/fsd/shared/lib/errors/apiError';

const API_URL = import.meta.env.VITE_API_URL || '';

/**
 * R2에서 이미지 삭제
 */
export const deleteFromR2 = async (key: string): Promise<void> => {
	// R2 key가 아닌 경우 (기존 Supabase URL) 스킵
	if (key.startsWith('http://') || key.startsWith('https://')) {
		console.warn('Skipping delete for non-R2 URL:', key);
		return;
	}

	try {
		const response = await fetch(`${API_URL}/api/upload`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ key }),
		});

		if (!response.ok) {
			throw new ApiError('Failed to delete file from R2', 'DELETE_ERROR');
		}
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(
			'An unexpected error occurred while deleting the image',
			'UNKNOWN_ERROR',
		);
	}
};

import { generateShortId } from '@/fsd/features/blog/lib';
import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

// FIXME: 공통 함수로 빼기

const GALLERY_BUCKET = 'gallery_images';

export const getPublicUrl = (filePath: string): string => {
	const { data: publicUrlData } = supabase.storage
		.from(GALLERY_BUCKET)
		.getPublicUrl(filePath);

	if (!publicUrlData || !publicUrlData.publicUrl) {
		throw new ApiError(
			'Failed to get public URL for the uploaded file',
			'UPLOAD_ERROR',
		);
	}

	return publicUrlData.publicUrl;
};

interface ImageMetadata {
	width: number;
	height: number;
}

const getImageDimensions = (file: File): Promise<ImageMetadata> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			resolve({
				width: img.width,
				height: img.height,
			});
		};
		img.onerror = () =>
			reject(new ApiError('Failed to load image', 'VALIDATION_ERROR'));
		img.src = URL.createObjectURL(file);
	});
};

export const uploadGalleryImage = async (
	file: File,
): Promise<{
	url: string;
	width: number;
	height: number;
}> => {
	try {
		const { width, height } = await getImageDimensions(file);

		const fileExt = file.name.split('.').pop();
		const shortId = generateShortId();
		const fileName = `${shortId}.${fileExt}`;
		const filePath = `uploads/${fileName}`;

		const { error: uploadError } = await supabase.storage
			.from(GALLERY_BUCKET)
			.upload(filePath, file, { upsert: false });

		if (uploadError) {
			throw new ApiError(
				`Failed to upload file: ${uploadError.message}`,
				'UPLOAD_ERROR',
			);
		}

		const publicUrl = getPublicUrl(filePath);

		return {
			url: publicUrl,
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

import { IMAGE_BUCKET } from '@/fsd/features/blog/config';
import { generateShortId } from '@/fsd/features/blog/lib';
import { supabase } from '@/fsd/shared';

export const getPublicUrl = (filePath: string): string => {
	const { data: publicUrlData } = supabase.storage
		.from(IMAGE_BUCKET)
		.getPublicUrl(filePath);

	if (!publicUrlData || !publicUrlData.publicUrl) {
		throw new Error('Failed to get public URL for the uploaded file');
	}

	return publicUrlData.publicUrl;
};

export const uploadImage = async (file: File): Promise<string> => {
	const fileExt = file.name.split('.').pop();
	const shortId = generateShortId();
	const fileName = `${shortId}.${fileExt}`;
	const filePath = `uploads/${fileName}`;

	const { error: uploadError } = await supabase.storage
		.from(IMAGE_BUCKET)
		.upload(filePath, file, { upsert: false });

	if (uploadError)
		throw new Error(`Failed to upload file: ${uploadError.message}`);

	const { data: publicUrlData } = supabase.storage
		.from(IMAGE_BUCKET)
		.getPublicUrl(filePath);

	if (!publicUrlData || !publicUrlData.publicUrl) {
		throw new Error('Failed to get public URL for the uploaded file');
	}

	const publicUrl = publicUrlData.publicUrl;

	return publicUrl;
};

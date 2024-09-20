import { supabase, useErrorHandler } from '@/fsd/shared';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = 'images';

export type UploadResult = {
	publicUrl: string;
	shortId: string;
};

export const useFileUpload = () => {
	const handleError = useErrorHandler();

	const uploadToSupabase = async (
		file: File,
	): Promise<{ filePath: string; shortId: string }> => {
		const fileExt = file.name.split('.').pop();
		const shortId = uuidv4().split('-')[0];
		const fileName = `${shortId}.${fileExt}`;
		const filePath = `uploads/${fileName}`;

		const { error: uploadError } = await supabase.storage
			.from(BUCKET_NAME)
			.upload(filePath, file, { upsert: false });

		if (uploadError)
			throw new Error(`Failed to upload file: ${uploadError.message}`);

		return { filePath, shortId };
	};

	const uploadFile = async (file: File): Promise<UploadResult> => {
		try {
			const { filePath, shortId } = await uploadToSupabase(file);
			const publicUrl = getPublicUrl(filePath);
			return { publicUrl, shortId };
		} catch (error) {
			handleError(error, 'Failed to upload file');
			throw error;
		}
	};

	const getPublicUrl = (filePath: string): string => {
		const { data: publicUrlData } = supabase.storage
			.from(BUCKET_NAME)
			.getPublicUrl(filePath);

		if (!publicUrlData || !publicUrlData.publicUrl) {
			throw new Error('Failed to get public URL for the uploaded file');
		}

		return publicUrlData.publicUrl;
	};

	// TODO: 나중에 web workspace에서 사용
	const getUrlFromShortId = async (shortId: string): Promise<string> => {
		const { data, error } = await supabase.storage
			.from(BUCKET_NAME)
			.list('uploads', { search: shortId });

		if (error || !data || data.length === 0) {
			throw new Error('Failed to find file');
		}

		return getPublicUrl(`uploads/${data[0].name}`);
	};

	return { uploadFile, getUrlFromShortId };
};

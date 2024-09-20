import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { Box, Button, Input, useToast } from '@jung/design-system/components';
import { useCallback, useRef, useState } from 'react';
import { FaImage, FaTimes } from 'react-icons/fa';
import type { PostData } from '../../types/postData';
import ErrorMessage from './ErrorMessage';
import type { TitleSectionProps } from './TitleSection';
import * as styles from './TitleSection.css';

interface ImageUploadProps {
	onFieldChange: <K extends keyof PostData>(
		field: K,
		value: PostData[K],
	) => void;

	imagesrc: string;
	errors: TitleSectionProps['errors'];
	isUploading: boolean;
	onSetImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

// FIXME: 컴포넌트 이름 적절하게 변경
export const ImageUpload = ({
	isUploading,
	imagesrc,
	onSetImageFile,
	onFieldChange,
	errors,
}: ImageUploadProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const showToast = useToast();

	const [imagePreview, setImagePreview] = useState<string | null>(imagesrc);

	const handlePrviewImage = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			console.log('preview!!');
			const file = e.target.files?.[0];

			if (file) {
				try {
					onSetImageFile(file);
					const reader = new FileReader();

					reader.onloadend = () => {
						onFieldChange('imagesrc', reader.result as string);
						setImagePreview(reader.result as string);
					};

					reader.readAsDataURL(file);
				} catch (error) {
					if (error instanceof ApiError)
						showToast(`Error uploading image:${error.message}`);
				}
			}
		},
		[showToast, onSetImageFile, onFieldChange],
	);

	const handleRemoveImage = useCallback(() => {
		onFieldChange('imagesrc', '');
		setImagePreview(null);

		// TODO: SUPABASE에서도 지워야 할 듯?
	}, [onFieldChange]);

	return (
		<>
			{imagePreview ? (
				<Box className={styles.imagePreviewContainer}>
					<Box
						as='img'
						src={imagePreview}
						alt='Cover'
						className={styles.imagePreview}
					/>
					<Button
						className={styles.removeImageButton}
						onClick={handleRemoveImage}
						aria-label='Remove image'
					>
						<FaTimes />
					</Button>
				</Box>
			) : (
				<Box className={styles.imageUploadContainer}>
					<Button
						loading={isUploading}
						className={styles.imageUploadButton}
						onClick={() => fileInputRef.current?.click()}
					>
						<FaImage /> Add Cover Image
					</Button>
				</Box>
			)}
			{errors.imagesrc && <ErrorMessage message={errors.imagesrc} />}
			<Input
				ref={fileInputRef}
				type='file'
				accept='image/*'
				onChange={handlePrviewImage}
				display='none'
			/>
		</>
	);
};

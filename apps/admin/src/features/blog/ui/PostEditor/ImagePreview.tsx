import type { PostWithBlockContent } from '@/fsd/entities/post/model/post';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { Box, Button, Input, useToast } from '@jung/design-system/components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaImage, FaTimes } from 'react-icons/fa';
import ErrorMessage from './ErrorMessage';
import type { TitleSectionProps } from './TitleSection';
import * as styles from './TitleSection.css';

interface ImagePreviewProps {
	onFieldChange: <K extends keyof PostWithBlockContent>(
		field: K,
		value: PostWithBlockContent[K],
	) => void;

	imagesrc: string;
	validateErrors: TitleSectionProps['errors'];
	onSetImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export const ImagePreview = ({
	imagesrc,
	onSetImageFile,
	onFieldChange,
	validateErrors,
}: ImagePreviewProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const showToast = useToast();

	const [imagePreview, setImagePreview] = useState<string | null>(imagesrc);

	useEffect(() => {
		setImagePreview(imagesrc);
	}, [imagesrc]);

	const handlePrviewImage = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
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
						className={styles.imageUploadButton}
						onClick={() => fileInputRef.current?.click()}
					>
						<FaImage /> Add Cover Image
					</Button>
				</Box>
			)}
			{validateErrors.imagesrc && (
				<ErrorMessage message={validateErrors.imagesrc} />
			)}
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

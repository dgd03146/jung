import type { PostWithBlockContent } from '@/fsd/entities';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { Input, useToast } from '@jung/design-system/components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HiExclamationCircle } from 'react-icons/hi';
import { HiPhoto, HiTrash } from 'react-icons/hi2';
import * as styles from './ImagePreview.css';

interface ImagePreviewProps {
	onFieldChange: <K extends keyof PostWithBlockContent>(
		field: K,
		value: PostWithBlockContent[K],
	) => void;

	imagesrc: string;
	validateErrors: Record<string, string>;
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

	const handlePreviewImage = useCallback(
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
						showToast(`Error uploading image: ${error.message}`);
				}
			}
		},
		[showToast, onSetImageFile, onFieldChange],
	);

	const handleRemoveImage = useCallback(() => {
		onFieldChange('imagesrc', '');
		setImagePreview(null);
	}, [onFieldChange]);

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			e.stopPropagation();

			const file = e.dataTransfer.files?.[0];
			if (file?.type?.startsWith('image/')) {
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
						showToast(`Error uploading image: ${error.message}`);
				}
			}
		},
		[onSetImageFile, onFieldChange, showToast],
	);

	return (
		<>
			{imagePreview ? (
				<div className={styles.imagePreviewContainer}>
					<img src={imagePreview} alt='Cover' className={styles.imagePreview} />
					<button
						className={styles.removeImageButton}
						onClick={handleRemoveImage}
						aria-label='Remove image'
					>
						<HiTrash size={16} />
					</button>
				</div>
			) : (
				<div
					className={styles.imageUploadContainer}
					data-error={!!validateErrors.imagesrc}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
				>
					<button
						className={styles.imageUploadButton}
						onClick={() => fileInputRef.current?.click()}
					>
						<HiPhoto size={16} />
						Upload an image
					</button>
					<div className={styles.dropText}>or drop an image here</div>
					{validateErrors.imagesrc && (
						<div className={styles.errorContainer}>
							<HiExclamationCircle size={16} />
							{validateErrors.imagesrc}
						</div>
					)}
				</div>
			)}
			<Input
				ref={fileInputRef}
				type='file'
				accept='image/*'
				onChange={handlePreviewImage}
				display='none'
			/>
		</>
	);
};

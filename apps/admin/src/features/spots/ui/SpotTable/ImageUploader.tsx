import { useToast } from '@jung/design-system/components';
import { useState } from 'react';
import { MdDelete, MdPhoto } from 'react-icons/md';
import * as styles from './ImageUploader.css';

interface ImageUploaderProps {
	images: { id: string; url: string }[];
	onChange: (images: { id: string; url: string }[]) => void;
	maxImages?: number;
}

export const ImageUploader = ({
	images,
	onChange,
	maxImages = 4,
}: ImageUploaderProps) => {
	const showToast = useToast();
	const [isUploading, setIsUploading] = useState(false);

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;

		if (images.length + files.length > maxImages) {
			showToast(
				`최대 ${maxImages}개의 이미지만 업로드할 수 있습니다.`,
				'error',
			);
			return;
		}

		setIsUploading(true);
		try {
			// TODO: Implement actual image upload logic
			const newImages = Array.from(files).map((file) => ({
				id: Math.random().toString(),
				url: URL.createObjectURL(file),
			}));

			onChange([...images, ...newImages]);
		} catch (error) {
			showToast('이미지 업로드에 실패했습니다.', 'error');
		}
		setIsUploading(false);
	};

	const handleRemoveImage = (id: string) => {
		onChange(images.filter((img) => img.id !== id));
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.imageGrid} data-count={images.length}>
				{images.map((image, index) => (
					<div
						key={image.id}
						className={styles.imageWrapper}
						data-area={`img${index + 1}`}
					>
						<img src={image.url} alt='' className={styles.image} />
						<button
							type='button'
							onClick={() => handleRemoveImage(image.id)}
							className={styles.deleteButton}
							aria-label='Delete image'
						>
							<MdDelete size={20} />
						</button>
					</div>
				))}
				{images.length < maxImages && (
					<label
						className={styles.uploadButton}
						data-area={`img${images.length + 1}`}
					>
						<input
							type='file'
							accept='image/*'
							multiple
							onChange={handleImageUpload}
							disabled={isUploading}
							className={styles.fileInput}
						/>
						<MdPhoto className={styles.uploadIcon} />
						<span className={styles.uploadText}>
							{images.length === 0 ? 'Add Image' : 'Add More'}
						</span>
						<span className={styles.uploadSubtext}>
							{isUploading ? 'Uploading...' : `${images.length}/${maxImages}`}
						</span>
					</label>
				)}
			</div>
		</div>
	);
};

import {
	Box,
	Input,
	Typography,
	useToast,
} from '@jung/design-system/components';
import type { SpotImageUpload } from '@jung/shared/types';
import { MdDelete, MdPhoto } from 'react-icons/md';
import * as styles from './ImageUploader.css';

interface ImageUploaderProps {
	images: SpotImageUpload[];
	onChange: (images: SpotImageUpload[]) => void;
	maxImages?: number;
}

export const ImageUploader = ({
	images,
	onChange,
	maxImages = 4,
}: ImageUploaderProps) => {
	const showToast = useToast();

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newFiles = e.target.files;
		if (!newFiles) return;

		const activeImages = images.filter((img) => img.status !== 'deleted');
		if (activeImages.length + newFiles.length > maxImages) {
			showToast(
				`최대 ${maxImages}개의 이미지만 업로드할 수 있습니다.`,
				'error',
			);
			return;
		}

		const newImages: SpotImageUpload[] = Array.from(newFiles).map((file) => ({
			url: URL.createObjectURL(file),
			file,
			status: 'new',
			preview: URL.createObjectURL(file),
		}));

		onChange([...images, ...newImages]);
	};

	const handleRemoveImage = (index: number) => {
		const updatedImages = [...images];
		const image = updatedImages[index];

		if (image.status === 'existing') {
			updatedImages[index] = { ...image, status: 'deleted' };
		} else {
			if (image.preview) {
				URL.revokeObjectURL(image.preview);
			}
			updatedImages.splice(index, 1);
		}

		onChange(updatedImages);
	};

	return (
		<Box
			borderRadius='md'
			background='white'
			borderStyle='solid'
			borderWidth='hairline'
			borderColor='primary50'
		>
			<Box className={styles.imageGrid}>
				{images
					.filter((img) => img.status !== 'deleted')
					.map((image, index) => (
						<Box
							key={image.id || index}
							className={styles.imageWrapper}
							data-area={`img${index + 1}`}
						>
							<Box
								as='img'
								src={image.preview || image.url}
								alt={`${index + 1}`}
								width='full'
								height='full'
								className={styles.image}
							/>
							<button
								type='button'
								onClick={() => handleRemoveImage(index)}
								className={styles.deleteButton}
							>
								<MdDelete size={20} />
							</button>
						</Box>
					))}

				{images.filter((img) => img.status !== 'deleted').length <
					maxImages && (
					<Box as='label' className={styles.uploadButton}>
						<Input
							type='file'
							accept='image/*'
							multiple
							onChange={handleImageUpload}
							display='none'
						/>
						<MdPhoto className={styles.uploadIcon} />
						<Typography.SubText color='gray300'>
							{images.length === 0 ? 'Add Images' : 'Add More'}
						</Typography.SubText>
						<Typography.SubText color='gray300'>
							{`${
								images.filter((img) => img.status !== 'deleted').length
							}/${maxImages}`}
						</Typography.SubText>
					</Box>
				)}
			</Box>
		</Box>
	);
};

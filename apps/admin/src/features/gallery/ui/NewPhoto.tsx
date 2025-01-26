import {
	Box,
	Button,
	Container,
	Flex,
	Input,
	Textarea,
	Typography,
	useToast,
} from '@jung/design-system/components';
import { useParams } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { HiPhoto } from 'react-icons/hi2';
import { MdCollections } from 'react-icons/md';
import { useCreatePhoto } from '../api/useCreatePhoto';
import { useGetCollections } from '../api/useGetCollections';
import { useGetPhotoById } from '../api/useGetPhotoById';
import { useUpdatePhoto } from '../api/useUpdatePhoto';
import * as styles from './NewPhoto.css';
import { NewPhotoSkeleton } from './NewPhotoSkeleton';

interface PhotoFormData {
	title: string;
	description: string;
	image: File | null;
	alt: string;
	tags: string[];
	collection_id: string;
}

const INITIAL_FORM_DATA: PhotoFormData = {
	title: '',
	description: '',
	image: null,
	alt: '',
	tags: [],
	collection_id: '',
};

export const NewPhoto = () => {
	const showToast = useToast();
	const createPhotoMutation = useCreatePhoto();
	const updatePhotoMutation = useUpdatePhoto();

	const params = useParams({ strict: false });
	const isEditMode = !!params?.photoId;

	const { data: photo, isLoading } = useGetPhotoById(params.photoId!);

	const [formData, setFormData] = useState<PhotoFormData>(INITIAL_FORM_DATA);
	const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const [errors, setErrors] = useState<
		Partial<Record<keyof PhotoFormData, string>>
	>({});
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [showErrors, setShowErrors] = useState(false);
	const { data: collections, isLoading: isLoadingCollections } =
		useGetCollections();

	useEffect(() => {
		if (isEditMode && photo) {
			setFormData({
				title: photo.title,
				description: photo.description ?? '',
				alt: photo.alt ?? '',
				tags: photo.tags ?? [],
				image: null,
				collection_id: photo.collection_id ?? '',
			});
			setExistingImageUrl(photo.image_url);
		}
	}, [isEditMode, photo]);

	useEffect(() => {
		if (formData.image) {
			const url = URL.createObjectURL(formData.image);
			setPreviewUrl(url);
			return () => URL.revokeObjectURL(url);
		}
	}, [formData.image]);

	const validateForm = (): boolean => {
		const newErrors: Partial<Record<keyof PhotoFormData, string>> = {};

		if (!formData.title.trim()) {
			newErrors.title = 'Title is required';
		}
		if (!formData.description.trim()) {
			newErrors.description = 'Description is required';
		}
		if (!formData.image && !isEditMode) {
			newErrors.image = 'Image is required';
		}
		if (!formData.alt.trim()) {
			newErrors.alt = 'Alt text is required';
		}
		if (!formData.collection_id) {
			newErrors.collection_id = 'Collection is required';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				showToast('File size should be less than 5MB', 'error');
				return;
			}

			if (!file.type.startsWith('image/')) {
				showToast('Please upload an image file', 'error');
				return;
			}

			setFormData((prev) => ({
				...prev,
				image: file,
				alt: prev.alt || file.name,
			}));
			setErrors((prev) => ({ ...prev, image: '' }));
		}
	};

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleCollectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		setFormData((prev) => ({
			...prev,
			collection_id: value,
		}));
	};

	const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const tags = e.target.value
			.split(',')
			.map((tag) => tag.trim())
			.filter(Boolean);

		setFormData((prev) => ({
			...prev,
			tags,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setShowErrors(true);

		if (!validateForm()) {
			showToast('Please fill in all required fields', 'error');
			return;
		}

		const photoData = {
			title: formData.title.trim(),
			description: formData.description.trim(),
			alt: formData.alt.trim(),
			tags: formData.tags,
			collection_id: formData.collection_id,
		};

		if (isEditMode) {
			updatePhotoMutation.mutate({
				id: params.photoId!,
				...photoData,
				file: formData.image || undefined,
			});
		} else {
			createPhotoMutation.mutate({
				...photoData,
				file: formData.image!,
			});
		}
	};

	const imagePreview = previewUrl || existingImageUrl;

	if (isEditMode && isLoading) {
		return <NewPhotoSkeleton />;
	}

	return (
		<Container background='white'>
			<Box
				as='form'
				background='white'
				borderRadius='lg'
				padding='6'
				boxShadow='primary'
				onSubmit={handleSubmit}
			>
				<Flex gap='8' flexDirection={{ base: 'column', laptop: 'row' }}>
					<Flex flexBasis='2/5' flexDirection='column'>
						<Flex align='center' gap='2' color='primary' marginBottom='4'>
							<HiPhoto size={20} />
							<Typography.Text level={1} fontWeight='semibold'>
								Image Upload
							</Typography.Text>
						</Flex>

						<Flex
							position='relative'
							align='center'
							justify='center'
							aspectRatio='16/9'
							borderRadius='lg'
							onClick={handleUploadClick}
							transition='fast'
							cursor='pointer'
							borderStyle='dashed'
							borderWidth='hairline'
							borderColor={{ base: 'gray', hover: 'primary' }}
							width='full'
							height='full'
						>
							{imagePreview ? (
								<Box
									as='img'
									src={imagePreview}
									alt='Preview'
									width='full'
									height='full'
									objectFit='cover'
								/>
							) : (
								<Flex
									flexDirection='column'
									align='center'
									justify='center'
									padding='6'
									gap='2'
									color='primary'
								>
									<HiPhoto size={40} />
									<Typography.Text level={2} fontWeight='semibold'>
										Click to upload image
									</Typography.Text>
									<Typography.Text
										level={3}
										fontWeight='medium'
										color='primary400'
									>
										or drag and drop
									</Typography.Text>
								</Flex>
							)}
							<Input
								type='file'
								ref={fileInputRef}
								onChange={handleFileChange}
								accept='image/*'
								display='none'
								required={!isEditMode}
								disabled={isLoading}
							/>
						</Flex>
					</Flex>

					<Box flex='1'>
						<Flex align='center' gap='2' color='primary' marginBottom='4'>
							<MdCollections size={20} />
							<Typography.Text level={1} fontWeight='semibold'>
								Photo Details
							</Typography.Text>
						</Flex>

						<Flex flexDirection='column' gap='4'>
							<Flex flexDirection='column' gap='2'>
								<Typography.Text level={2} fontWeight='medium'>
									Title <span className={styles.required}>*</span>
								</Typography.Text>
								<Input
									type='text'
									name='title'
									borderRadius='md'
									value={formData.title}
									onChange={handleInputChange}
									placeholder='Enter photo title'
									borderColor={showErrors && errors.title ? 'error' : 'inherit'}
								/>
								{showErrors && errors.title && (
									<Typography.SubText level={3} color='error'>
										{errors.title}
									</Typography.SubText>
								)}
							</Flex>

							<Flex flexDirection='column' gap='2'>
								<Typography.Text level={2} fontWeight='medium'>
									Description <span className={styles.required}>*</span>
								</Typography.Text>
								<Textarea
									name='description'
									borderRadius='md'
									value={formData.description}
									onChange={handleInputChange}
									placeholder='Enter photo description'
									borderColor={
										showErrors && errors.description ? 'error' : 'primary200'
									}
								/>
								{showErrors && errors.description && (
									<Typography.SubText level={3} color='error'>
										{errors.description}
									</Typography.SubText>
								)}
							</Flex>

							<Flex flexDirection='column' gap='2'>
								<Typography.Text level={2} fontWeight='medium'>
									Collections
									<span className={styles.required}>*</span>
								</Typography.Text>
								<select
									name='collection_id'
									value={formData.collection_id}
									onChange={handleCollectionChange}
									className={`${styles.select} ${
										showErrors && errors.collection_id ? styles.inputError : ''
									}`}
									disabled={isLoadingCollections}
								>
									<option value=''>Select a collection</option>
									{collections?.map((collection) => (
										<option key={collection.id} value={collection.id}>
											{collection.title}
										</option>
									))}
								</select>
								{showErrors && errors.collection_id && (
									<Typography.SubText level={3} color='error'>
										{errors.collection_id}
									</Typography.SubText>
								)}
							</Flex>

							<Flex flexDirection='column' gap='2'>
								<Typography.Text level={2} fontWeight='medium'>
									Tags
								</Typography.Text>
								<Input
									type='text'
									name='tags'
									borderRadius='md'
									value={formData.tags.join(', ')}
									onChange={handleTagsChange}
									placeholder='Enter tags (comma separated)'
								/>
							</Flex>

							<Flex flexDirection='column' gap='2'>
								<Typography.Text
									level={2}
									fontWeight='medium'
									borderRadius='md'
								>
									File Name
								</Typography.Text>
								<Input
									type='text'
									name='alt'
									borderRadius='md'
									value={formData.alt}
									onChange={handleInputChange}
									placeholder='Enter image alt text'
								/>
							</Flex>
						</Flex>
					</Box>
				</Flex>

				<Flex justify='flex-end' marginTop='8' gap='3' paddingY='4'>
					<Button
						type='submit'
						onClick={handleSubmit}
						loading={
							createPhotoMutation.isPending || updatePhotoMutation.isPending
						}
						disabled={
							createPhotoMutation.isPending || updatePhotoMutation.isPending
						}
					>
						{isEditMode ? 'Update Photo' : 'Create Photo'}
					</Button>
				</Flex>
			</Box>
		</Container>
	);
};

import {
	Box,
	Button,
	Card,
	Flex,
	Input,
	Stack,
	Textarea,
	Typography,
} from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { HiPencil, HiPhoto, HiPlus, HiTrash } from 'react-icons/hi2';
import { useGetCollections } from '@/fsd/features/gallery/api';
import { useConfirmDialog } from '@/fsd/shared';
import { useCreateCollection } from '../api/useCreateCollection';
import { useDeleteCollection } from '../api/useDeleteCollection';
import { useUpdateCollection } from '../api/useUpdateCollection';
import * as styles from './PhotoCollection.css';
import { PhotoCollectionSkeleton } from './PhotoCollectionSkeleton';

interface FormData {
	title: string;
	description: string;
	cover_image: string;
}

interface FormErrors {
	title?: string;
	description?: string;
	cover_image?: string;
}

export const PhotoCollection = () => {
	const { data: collections = [], isLoading } = useGetCollections();

	const createCollectionMutation = useCreateCollection();
	const updateCollectionMutation = useUpdateCollection();
	const deleteCollectionMutation = useDeleteCollection();
	const { confirm } = useConfirmDialog();
	const [editingId, setEditingId] = useState<string | null>(null);
	const [formData, setFormData] = useState<FormData>({
		title: '',
		description: '',
		cover_image: '',
	});
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [errors, setErrors] = useState<FormErrors>({});

	const editingCollection = useMemo(() => {
		if (!editingId || editingId === 'new') return null;
		return collections.find((collection) => collection.id === editingId);
	}, [editingId, collections]);

	useEffect(() => {
		if (editingCollection) {
			setFormData({
				title: editingCollection.title,
				description: editingCollection.description,
				cover_image: editingCollection.cover_image,
			});
			setPreviewImage(editingCollection.cover_image);
		}
	}, [editingCollection]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		setErrors((prev) => ({
			...prev,
			[name]: '',
		}));
	};

	const handleCloseModal = () => {
		setEditingId(null);
		setFormData({
			title: '',
			description: '',
			cover_image: '',
		});
		setPreviewImage(null);
		if (previewImage && !previewImage.startsWith('http')) {
			URL.revokeObjectURL(previewImage);
		}
	};

	// FIXME: React Hook Form & Zod 적용
	const validateForm = (): FormErrors => {
		const newErrors: FormErrors = {};

		if (!formData.title.trim()) {
			newErrors.title = 'Enter a title';
		} else if (formData.title.length > 20) {
			newErrors.title = 'Title must be 20 characters or less';
		}

		if (!formData.description.trim()) {
			newErrors.description = 'Enter a description';
		} else if (formData.description.length > 50) {
			newErrors.description = 'Description must be 50 characters or less';
		}

		if (!fileInputRef.current?.files?.[0] && !previewImage) {
			newErrors.cover_image = 'Select a cover image';
		}

		return newErrors;
	};

	const handleSave = () => {
		const validationErrors = validateForm();

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		if (editingId === 'new') {
			if (!formData.title || !fileInputRef.current?.files?.[0]) return;

			createCollectionMutation.mutate(
				{
					title: formData.title,
					description: formData.description,
					coverImageFile: fileInputRef.current.files[0],
				},
				{
					onSuccess: () => {
						handleCloseModal();
					},
				},
			);
		} else {
			if (!formData.title) return;

			updateCollectionMutation.mutate(
				{
					id: editingId || '',
					title: formData.title,
					description: formData.description,
					coverImageFile: fileInputRef.current?.files?.[0],
				},
				{
					onSuccess: () => {
						handleCloseModal();
					},
				},
			);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (previewImage) {
			URL.revokeObjectURL(previewImage);
		}

		const imageUrl = URL.createObjectURL(file);
		setPreviewImage(imageUrl);
	};

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleOpenModal = () => {
		setEditingId('new');
		setFormData({
			title: '',
			description: '',
			cover_image: '',
		});
		setPreviewImage(null);
		setErrors({});
	};

	const handleEdit = (e: React.MouseEvent, id: string) => {
		e.preventDefault();
		e.stopPropagation();
		setEditingId(id);
	};

	const handleDelete = async (e: React.MouseEvent, id: string) => {
		e.preventDefault();
		e.stopPropagation();
		const ok = await confirm({
			title: 'Delete Collection',
			description:
				'Are you sure you want to delete this collection? This action cannot be undone.',
			confirmText: 'Delete',
			variant: 'destructive',
		});
		if (ok) {
			deleteCollectionMutation.mutate(id);
		}
	};

	if (isLoading) return <PhotoCollectionSkeleton />;

	return (
		<Stack gap='4'>
			<Box background='white'>
				<Flex
					className={styles.titleContainer}
					padding='6'
					justify='space-between'
					align='center'
					borderRadius='xl'
					borderColor='primary50'
					borderStyle='solid'
				>
					<Typography.Heading level={5} color='primary'>
						Collection Management
					</Typography.Heading>
					<Button borderRadius='lg' size='md' onClick={handleOpenModal}>
						<HiPlus />
						New Collection
					</Button>
				</Flex>

				<Box className={styles.collectionGrid} gap='6' padding='6'>
					{collections.map((collection) => (
						<Link
							key={collection.id}
							to='/gallery/collections/$collectionId'
							params={{ collectionId: collection.id }}
						>
							<Card
								variant='outline'
								rounded='lg'
								className={styles.collectionCard}
							>
								<Card.Media>
									<Box
										as='img'
										src={collection.cover_image}
										alt={collection.title}
										width='full'
										height='48'
										className={styles.collectionCardImage}
									/>
									<Flex position='absolute' gap='2' className={styles.actions}>
										<Button
											variant='secondary'
											background='white'
											onClick={(e) => handleEdit(e, collection.id)}
										>
											<HiPencil size={16} />
										</Button>
										<Button
											variant='secondary'
											background='white'
											onClick={(e) => handleDelete(e, collection.id)}
											disabled={deleteCollectionMutation.isPending}
										>
											<HiTrash size={16} />
										</Button>
									</Flex>
								</Card.Media>

								<Card.Content>
									<Card.Title>
										<Typography.Text
											level={1}
											color='primary'
											fontWeight='semibold'
										>
											{collection.title}
										</Typography.Text>
									</Card.Title>
									<Card.Description>
										<Typography.Text level={4} color='primary300'>
											{collection.description}
										</Typography.Text>
									</Card.Description>
								</Card.Content>

								<Card.Actions>
									<Box
										className={styles.actionsContainer}
										width='full'
										paddingX='4'
										paddingY='3'
										borderColor='primary50'
										borderStyle='solid'
									>
										<Flex justify='space-between' align='center'>
											<Typography.Text level={4} color='primary'>
												{collection.photo_count} photos
											</Typography.Text>
											<Typography.Text level={4} color='primary300'>
												{new Date(collection.created_at).toLocaleDateString(
													'ko-KR',
												)}
											</Typography.Text>
										</Flex>
									</Box>
								</Card.Actions>
							</Card>
						</Link>
					))}
				</Box>
			</Box>

			<AnimatePresence>
				{editingId && (
					<motion.div
						className={styles.modalOverlay}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={handleCloseModal}
					>
						<motion.div
							className={styles.modalContent}
							initial={{ scale: 0.9, y: 20 }}
							animate={{ scale: 1, y: 0 }}
							exit={{ scale: 0.9, y: 20 }}
							onClick={(e) => e.stopPropagation()}
						>
							<Typography.Heading level={5} color='primary' marginBottom='6'>
								{editingId === 'new'
									? 'Create New Collection'
									: 'Edit Collection'}
							</Typography.Heading>
							<Stack gap='4'>
								<Stack gap='2'>
									<Typography.Text
										level={3}
										color='black100'
										fontWeight='semibold'
									>
										Title
									</Typography.Text>
									<Input
										type='text'
										name='title'
										width='full'
										value={formData.title}
										onChange={handleInputChange}
										placeholder='Enter collection title'
										borderRadius='md'
										borderColor={errors.title ? 'error' : 'inherit'}
									/>
									<Typography.SubText level={2} color='error'>
										{errors.title || ' '}
									</Typography.SubText>
								</Stack>

								<Stack gap='2'>
									<Typography.Text
										level={3}
										color='black100'
										fontWeight='semibold'
									>
										Description
									</Typography.Text>
									<Textarea
										name='description'
										width='full'
										value={formData.description}
										onChange={handleInputChange}
										placeholder='Enter collection description'
										rows={4}
										borderRadius='md'
										borderColor={errors.description ? 'error' : 'primary'}
									/>
									<Typography.SubText level={2} color='error'>
										{errors.description || ' '}
									</Typography.SubText>
								</Stack>

								<Stack gap='2'>
									<Typography.Text
										level={3}
										color='black100'
										fontWeight='semibold'
									>
										Cover Image
									</Typography.Text>
									<Flex align='center' gap='2'>
										<Input
											type='file'
											ref={fileInputRef}
											onChange={handleFileChange}
											accept='image/*'
											display='none'
										/>
										<Button
											type='button'
											size='md'
											fontSize='sm'
											borderRadius='md'
											onClick={handleUploadClick}
											borderColor={errors.cover_image ? 'error' : 'inherit'}
										>
											<HiPhoto size={20} />
											Upload
										</Button>
										<Typography.SubText level={2} color='error'>
											{errors.cover_image || ' '}
										</Typography.SubText>
									</Flex>

									<Box
										className={styles.previewImageContainer}
										boxShadow='primary'
										borderRadius='md'
										overflow='hidden'
										marginTop='2'
									>
										{previewImage && (
											<Box
												className={styles.previewImage}
												as='img'
												width='full'
												height='full'
												src={previewImage}
												alt='Cover preview'
											/>
										)}
									</Box>
								</Stack>
							</Stack>
							<Flex justify='flex-end' gap='2' marginTop='6'>
								<Button
									variant='outline'
									size='md'
									borderRadius='md'
									onClick={handleCloseModal}
									disabled={
										createCollectionMutation.isPending ||
										updateCollectionMutation.isPending
									}
								>
									Cancel
								</Button>
								<Button
									size='md'
									borderRadius='md'
									onClick={handleSave}
									disabled={
										createCollectionMutation.isPending ||
										updateCollectionMutation.isPending
									}
								>
									{editingId === 'new'
										? createCollectionMutation.isPending
											? 'Creating...'
											: 'Create'
										: updateCollectionMutation.isPending
											? 'Updating...'
											: 'Update'}
								</Button>
							</Flex>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</Stack>
	);
};

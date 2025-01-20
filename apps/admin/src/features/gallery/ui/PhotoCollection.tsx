import { useGetCollections } from '@/fsd/features/gallery/api';
import { Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { HiPencil, HiPhoto, HiPlus, HiTrash } from 'react-icons/hi2';
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

	const handleDelete = (e: React.MouseEvent, id: string) => {
		e.preventDefault();
		e.stopPropagation();
		if (window.confirm('컬렉션을 삭제하시겠습니까?')) {
			deleteCollectionMutation.mutate(id);
		}
	};

	if (isLoading) return <PhotoCollectionSkeleton />;

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.mainSection}>
				<div className={styles.header}>
					<h2 className={styles.title}>Collection Management</h2>
					<button className={styles.addButton} onClick={handleOpenModal}>
						<HiPlus />
						New Collection
					</button>
				</div>

				<div className={styles.gridView}>
					{collections.map((collection) => (
						<Link
							key={collection.id}
							to='/gallery/collections/$collectionId'
							params={{ collectionId: collection.id }}
							className={styles.collectionLink}
						>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className={styles.collectionCard}
							>
								<div className={styles.imageContainer}>
									<img
										src={collection.cover_image}
										alt={collection.title}
										className={styles.image}
									/>
									<div className={styles.actions}>
										<button
											className={styles.actionButton}
											onClick={(e) => handleEdit(e, collection.id)}
										>
											<HiPencil size={16} />
										</button>
										<button
											className={styles.actionButton}
											onClick={(e) => handleDelete(e, collection.id)}
											disabled={deleteCollectionMutation.isPending}
										>
											<HiTrash size={16} />
										</button>
									</div>
								</div>
								<div className={styles.content}>
									<h3 className={styles.title}>{collection.title}</h3>
									<p className={styles.description}>{collection.description}</p>
								</div>
								<div className={styles.footer}>
									<span className={styles.photoCount}>
										{collection.photo_count} photos
									</span>
									<span className={styles.date}>
										{new Date(collection.created_at).toLocaleDateString(
											'ko-KR',
										)}
									</span>
								</div>
							</motion.div>
						</Link>
					))}
				</div>
			</div>

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
							<h3 className={styles.modalTitle}>
								{editingId === 'new'
									? 'Create New Collection'
									: 'Edit Collection'}
							</h3>
							<div className={styles.formGroup}>
								<div className={styles.inputGroup}>
									<label className={styles.inputLabel}>Title</label>
									<input
										type='text'
										name='title'
										value={formData.title}
										onChange={handleInputChange}
										placeholder='Enter collection title'
										className={`${styles.input} ${
											errors.title ? styles.inputError : ''
										}`}
									/>
									<span className={styles.errorMessage}>
										{errors.title || ' '}
									</span>
								</div>

								<div className={styles.inputGroup}>
									<label className={styles.inputLabel}>Description</label>
									<textarea
										name='description'
										value={formData.description}
										onChange={handleInputChange}
										placeholder='Enter collection description'
										className={`${styles.textarea} ${
											errors.description ? styles.inputError : ''
										}`}
										rows={4}
									/>
									<span className={styles.errorMessage}>
										{errors.description || ' '}
									</span>
								</div>

								<div className={styles.inputGroup}>
									<label className={styles.inputLabel}>Cover Image</label>
									<div className={styles.imageUploadContainer}>
										<input
											type='file'
											ref={fileInputRef}
											onChange={handleFileChange}
											accept='image/*'
											className={styles.hiddenFileInput}
										/>
										<button
											type='button'
											onClick={handleUploadClick}
											className={`${styles.uploadButton} ${
												errors.cover_image ? styles.buttonError : ''
											}`}
										>
											<HiPhoto size={20} />
											Upload
										</button>
										<span className={styles.errorMessage}>
											{errors.cover_image || ' '}
										</span>
									</div>

									<div className={styles.imagePreview}>
										{previewImage && (
											<img
												src={previewImage}
												alt='Cover preview'
												className={styles.previewImage}
											/>
										)}
									</div>
								</div>
							</div>
							<div className={styles.modalActions}>
								<button
									className={styles.cancelButton}
									onClick={handleCloseModal}
									disabled={
										createCollectionMutation.isPending ||
										updateCollectionMutation.isPending
									}
								>
									Cancel
								</button>
								<button
									className={styles.saveButton}
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
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

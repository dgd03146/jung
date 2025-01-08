import { useToast } from '@jung/design-system/components';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { HiTag } from 'react-icons/hi';
import { HiPhoto } from 'react-icons/hi2';
import { MdCollections } from 'react-icons/md';
import { useCreatePhoto } from '../api/useCreatePhoto';
import { useGetCollections } from '../api/useGetCollections';
import { useGetPhotoById } from '../api/useGetPhotoById';
import * as styles from './NewPhoto.css';

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
	const navigate = useNavigate();
	const showToast = useToast();
	const createPhotoMutation = useCreatePhoto();

	const { photoId } = useParams({
		from: '/gallery/photos/$photoId/edit',
	});

	const isEditMode = !!photoId;

	const { data: photo, isLoading } = useGetPhotoById(photoId!);

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
		if (!formData.image) {
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

		const formDataToSubmit = new FormData();

		formDataToSubmit.append('title', formData.title.trim());
		formDataToSubmit.append('description', formData.description.trim());
		formDataToSubmit.append('alt', formData.alt.trim());
		formDataToSubmit.append('collection_id', formData.collection_id);

		if (formData.tags.length > 0) {
			formDataToSubmit.append('tags', JSON.stringify(formData.tags));
		}

		if (formData.image) {
			formDataToSubmit.append('image', formData.image);
		}

		try {
			await createPhotoMutation.mutateAsync({
				file: formData.image,
				title: formData.title.trim(),
				description: formData.description.trim(),
				alt: formData.alt.trim(),
				tags: formData.tags,
				collection_id: formData.collection_id,
			});

			showToast('Photo uploaded successfully!', 'success');
			setFormData(INITIAL_FORM_DATA);
			setShowErrors(false);
			navigate({ to: '/gallery/photos' });
		} catch (error) {
			showToast('Failed to upload photo', 'error');
		}
	};

	const imagePreview = previewUrl || existingImageUrl;

	if (isEditMode && isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.pageWrapper}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formLayout}>
					<div className={styles.imageSection}>
						<div className={styles.sectionTitle}>
							<HiPhoto size={20} />
							Image Upload
						</div>
						<div className={styles.uploadArea} onClick={handleUploadClick}>
							{imagePreview ? (
								<img
									src={imagePreview}
									alt='Preview'
									className={styles.previewImage}
								/>
							) : (
								<div className={styles.uploadPrompt}>
									<HiPhoto size={40} />
									<p className={styles.uploadPromptText}>
										Click to upload image
									</p>
									<span className={styles.uploadPromptSubtext}>
										or drag and drop
									</span>
								</div>
							)}
							<input
								type='file'
								ref={fileInputRef}
								onChange={handleFileChange}
								accept='image/*'
								className={styles.hiddenFileInput}
								required
							/>
						</div>
					</div>

					<div className={styles.detailsSection}>
						<div className={styles.sectionTitle}>
							<MdCollections size={20} />
							Photo Details
						</div>

						<div className={styles.formCard}>
							<div className={styles.inputGroup}>
								<label className={styles.label}>
									Title <span className={styles.required}>*</span>
								</label>
								<input
									type='text'
									name='title'
									value={formData.title}
									onChange={handleInputChange}
									placeholder='Enter photo title'
									className={`${styles.input} ${
										showErrors && errors.title ? styles.inputError : ''
									}`}
								/>
								{showErrors && errors.title && (
									<span className={styles.errorMessage}>{errors.title}</span>
								)}
							</div>

							<div className={styles.inputGroup}>
								<label className={styles.label}>
									Description <span className={styles.required}>*</span>
								</label>
								<textarea
									name='description'
									value={formData.description}
									onChange={handleInputChange}
									placeholder='Enter photo description'
									className={`${styles.textarea} ${
										showErrors && errors.description ? styles.inputError : ''
									}`}
								/>
								{showErrors && errors.description && (
									<span className={styles.errorMessage}>
										{errors.description}
									</span>
								)}
							</div>

							<div className={styles.inputGroup}>
								<label className={styles.label}>
									Collection <span className={styles.required}>*</span>
								</label>
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
									<span className={styles.errorMessage}>
										{errors.collection_id}
									</span>
								)}
							</div>

							<div className={styles.inputGroup}>
								<label className={styles.label}>
									<HiTag className={styles.labelIcon} />
									Tags
								</label>
								<input
									type='text'
									name='tags'
									value={formData.tags.join(', ')}
									onChange={handleTagsChange}
									placeholder='Enter tags (comma separated)'
									className={styles.input}
								/>
							</div>

							<div className={styles.inputGroup}>
								<label className={styles.label}>Alt Text</label>
								<input
									type='text'
									name='alt'
									value={formData.alt}
									onChange={handleInputChange}
									placeholder='Enter image alt text'
									className={styles.input}
									required
								/>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.formActions}>
					<button
						type='submit'
						className={styles.submitButton}
						disabled={createPhotoMutation.isPending}
					>
						{isEditMode ? 'Update Photo' : 'Create Photo'}
					</button>
				</div>
			</form>
		</div>
	);
};

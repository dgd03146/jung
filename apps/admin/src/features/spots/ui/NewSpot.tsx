import { useToast } from '@jung/design-system/components';
import type { SpotImageUpload } from '@jung/shared/types';
import { useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { HiLocationMarker, HiTag } from 'react-icons/hi';
import { MdAdd, MdDelete } from 'react-icons/md';
import { useCreateSpot } from '../api/useCreateSpot';
import { useGetSpotById } from '../api/useGetSpotById';
import { useGetSpotCategories } from '../api/useGetSpotCategories';
import { useUpdateSpot } from '../api/useUpdateSpot';
import * as styles from './NewSpot.css';
import { ImageUploader } from './SpotTable/ImageUploader';

interface SpotFormData {
	title: string;
	description: string;
	address: string;
	files: File[];
	category_id: string;
	coordinates: { lat: number; lng: number };
	tags: string[];
	tips: string[];
}

const INITIAL_FORM_DATA: SpotFormData = {
	title: '',
	description: '',
	address: '',
	files: [],
	category_id: '',
	coordinates: { lat: 0, lng: 0 },
	tags: [''],
	tips: [''],
};

export const NewSpot = () => {
	const showToast = useToast();
	const createSpotMutation = useCreateSpot();
	const updateSpotMutation = useUpdateSpot();
	const params = useParams({ strict: false });
	const isEditMode = !!params?.spotId;

	const { data: spot, isLoading } = useGetSpotById(params.spotId!);
	const { data: categories } = useGetSpotCategories();

	const [formData, setFormData] = useState<SpotFormData>(INITIAL_FORM_DATA);
	const [images, setImages] = useState<SpotImageUpload[]>([]);

	useEffect(() => {
		if (isEditMode && spot) {
			setFormData({
				title: spot.title,
				description: spot.description,
				address: spot.address,
				files: [],
				category_id: spot.category_id,
				coordinates: spot.coordinates,
				tags: spot.tags || [''],
				tips: spot.tips || [''],
			});
			const existingImages: SpotImageUpload[] = spot.photos.map((photo) => ({
				id: photo.id,
				url: photo.url,
				status: 'existing',
			}));
			setImages(existingImages);
		}
	}, [isEditMode, spot]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!formData.title ||
			!formData.description ||
			!formData.address ||
			!formData.category_id
		) {
			showToast('필수 항목을 모두 입력해주세요.', 'error');
			return;
		}

		const spotData = {
			title: formData.title.trim(),
			description: formData.description.trim(),
			address: formData.address.trim(),
			category_id: formData.category_id,
			coordinates: formData.coordinates,
			tags: formData.tags.filter((tag) => tag.trim() !== ''),
			tips: formData.tips.filter((tip) => tip.trim() !== ''),
		};

		if (isEditMode) {
			updateSpotMutation.mutate({
				id: params.spotId!,
				...spotData,
				images: images.map((image) => ({
					id: image.id,
					url: image.url,
					status: image.status,
					file: image.file,
				})),
			});
		} else {
			createSpotMutation.mutate({
				...spotData,
				files: images.filter((img) => img.file).map((img) => img.file!),
			});
		}
	};

	if (isEditMode && isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.pageWrapper}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formLayout}>
					<div className={styles.basicSection}>
						<div className={styles.sectionTitle}>
							<HiLocationMarker size={20} />
							Basic Information
						</div>

						<div className={styles.formCard}>
							<div className={styles.inputGroup}>
								<label className={styles.label}>Title</label>
								<input
									type='text'
									value={formData.title}
									onChange={(e) =>
										setFormData((prev) => ({ ...prev, title: e.target.value }))
									}
									className={styles.input}
									required
								/>
							</div>

							<div className={styles.inputGroup}>
								<label className={styles.label}>Description</label>
								<textarea
									value={formData.description}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											description: e.target.value,
										}))
									}
									className={styles.textarea}
									required
								/>
							</div>

							<div className={styles.inputGroup}>
								<label className={styles.label}>Category</label>
								<select
									value={formData.category_id}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											category_id: e.target.value,
										}))
									}
									className={styles.select}
									required
								>
									<option value=''>Select category</option>
									{categories?.allCategories.map((category) => (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									))}
								</select>
							</div>

							<div className={styles.inputGroup}>
								<label className={styles.label}>Location</label>
								<div className={styles.formRow}>
									<input
										type='text'
										value={formData.address || ''}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												address: e.target.value,
											}))
										}
										placeholder='Address'
										className={styles.input}
									/>
									<input
										type='number'
										value={formData.coordinates?.lat ?? 0}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												coordinates: {
													lat: Number(e.target.value) || 0,
													lng: prev.coordinates?.lng ?? 0,
												},
											}))
										}
										placeholder='Latitude'
										step='0.000001'
										className={styles.input}
									/>
									<input
										type='number'
										value={formData.coordinates?.lng ?? 0}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												coordinates: {
													lat: prev.coordinates?.lat ?? 0,
													lng: Number(e.target.value) || 0,
												},
											}))
										}
										placeholder='Longitude'
										step='0.000001'
										className={styles.input}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.additionalSection}>
						<div className={styles.sectionTitle}>
							<HiTag size={20} />
							Additional Information
						</div>

						<div className={styles.formCard}>
							<div className={styles.inputGroup}>
								<label className={styles.label}>Images</label>
								<ImageUploader
									images={images}
									onChange={setImages}
									maxImages={4}
								/>
							</div>

							<div className={styles.inputGroup}>
								<label className={styles.label}>Tips</label>
								{formData.tips?.map((tip, index) => (
									<div key={index} className={styles.arrayField}>
										<input
											type='text'
											value={tip}
											onChange={(e) => {
												const newTips = [...(formData.tips || [])];
												newTips[index] = e.target.value;
												setFormData((prev) => ({ ...prev, tips: newTips }));
											}}
											placeholder='Enter tip'
											className={styles.input}
										/>
										<button
											type='button'
											className={styles.iconButton}
											onClick={() => {
												const newTips = formData.tips?.filter(
													(_, i) => i !== index,
												);
												setFormData((prev) => ({ ...prev, tips: newTips }));
											}}
										>
											<MdDelete size={20} />
										</button>
									</div>
								))}
								<button
									type='button'
									className={styles.addButton}
									onClick={() => {
										const newTips = [...(formData.tips || []), ''];
										setFormData((prev) => ({ ...prev, tips: newTips }));
									}}
								>
									<MdAdd size={20} />
									Add Tip
								</button>
							</div>

							<div className={styles.inputGroup}>
								<label className={styles.label}>Tags</label>
								{formData.tags?.map((tag, index) => (
									<div key={index} className={styles.arrayField}>
										<input
											type='text'
											value={tag}
											onChange={(e) => {
												const newTags = [...(formData.tags || [])];
												newTags[index] = e.target.value;
												setFormData((prev) => ({ ...prev, tags: newTags }));
											}}
											placeholder='Enter tag'
											className={styles.input}
										/>
										<button
											type='button'
											className={styles.iconButton}
											onClick={() => {
												const newTags = formData.tags?.filter(
													(_, i) => i !== index,
												);
												setFormData((prev) => ({ ...prev, tags: newTags }));
											}}
										>
											<MdDelete size={20} />
										</button>
									</div>
								))}
								<button
									type='button'
									className={styles.addButton}
									onClick={() => {
										const newTags = [...(formData.tags || []), ''];
										setFormData((prev) => ({ ...prev, tags: newTags }));
									}}
								>
									<MdAdd size={20} />
									Add Tag
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.formActions}>
					<button
						type='submit'
						className={styles.submitButton}
						disabled={
							createSpotMutation.isPending || updateSpotMutation.isPending
						}
					>
						{isEditMode ? '스팟 수정' : '스팟 생성'}
					</button>
				</div>
			</form>
		</div>
	);
};

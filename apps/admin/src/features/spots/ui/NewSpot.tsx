import type { Spot } from '@jung/shared/types';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { HiLocationMarker, HiTag } from 'react-icons/hi';
import { MdAdd, MdDelete } from 'react-icons/md';
import { CATEGORY_LABELS } from '../model/useSpotTable';
import * as styles from './NewSpot.css';

export const NewSpot = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const isEditMode = location.pathname.includes('/spots/edit');

	const [formData, setFormData] = useState<Partial<Spot>>({
		tips: [''],
		tags: [''],
		photos: [],
		rating: 0,
		coordinates: { lat: 0, lng: 0 },
	});

	// TODO: Fetch spot data if in edit mode
	// useEffect(() => {
	//   if (isEditMode) {
	//     // Fetch spot data
	//   }
	// }, [isEditMode]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			// TODO: Implement API call based on mode
			console.log(`${isEditMode ? 'Updating' : 'Creating'} spot:`, formData);
			navigate({ to: '/spots' });
		} catch (error) {
			console.error(
				`Failed to ${isEditMode ? 'update' : 'create'} spot:`,
				error,
			);
		}
	};

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.header}>
				<h1 className={styles.title}>
					{isEditMode ? 'Edit Spot' : 'Add New Spot'}
				</h1>
			</div>

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formLayout}>
					<div className={styles.basicSection}>
						<div className={styles.sectionTitle}>
							<HiLocationMarker size={20} />
							Basic Information
						</div>

						<div className={styles.formCard}>
							<div className={styles.inputGroup}>
								<label className={styles.label}>Name</label>
								<input
									type='text'
									value={formData.title || ''}
									onChange={(e) =>
										setFormData((prev) => ({ ...prev, title: e.target.value }))
									}
									placeholder='Enter spot name'
									className={styles.input}
								/>
							</div>

							<div className={styles.inputGroup}>
								<label className={styles.label}>Category</label>
								<div className={styles.selectWrapper}>
									<select
										value={formData.category || ''}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												category: e.target.value as Spot['category'],
											}))
										}
										className={styles.select}
									>
										<option value=''>Select category</option>
										{Object.entries(CATEGORY_LABELS).map(([value, label]) => (
											<option key={value} value={value}>
												{label}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className={styles.inputGroup}>
								<label className={styles.label}>Description</label>
								<textarea
									value={formData.description || ''}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											description: e.target.value,
										}))
									}
									placeholder='Enter spot description'
									className={styles.textarea}
								/>
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
					<button type='submit' className={styles.submitButton}>
						Save Spot
					</button>
				</div>
			</form>
		</div>
	);
};

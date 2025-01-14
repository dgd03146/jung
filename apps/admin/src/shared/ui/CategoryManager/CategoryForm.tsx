import { useCreateCategory } from '@/fsd/shared/api/useCreateCategory';
import { useUpdateCategory } from '@/fsd/shared/api/useUpdateCategory';
import type {
	Category,
	CategoryType,
	CategoryWithCount,
} from '@jung/shared/types';
import { motion } from 'framer-motion';
import { memo, useCallback, useState } from 'react';
import * as styles from './CategoryForm.css';

interface CategoryFormProps {
	editingId: string | null;
	onClose: () => void;
	mainCategories: Category[];
	editingCategory?: Category;
	type: CategoryType;
}

type FormData = Omit<Category, 'id'>;
type FormErrors = Partial<Record<keyof FormData, string>>;

export const CategoryForm = memo(
	({
		editingId,
		onClose,
		mainCategories,
		editingCategory,
		type,
	}: CategoryFormProps) => {
		const createCategory = useCreateCategory(type);
		const updateCategory = useUpdateCategory(type);

		const [formData, setFormData] = useState<FormData>(() => ({
			name: editingCategory?.name ?? '',
			description: editingCategory?.description ?? '',
			color: editingCategory?.color ?? '#0142C0',
			parent_id: editingCategory?.parent_id ?? null,
			type,
			created_at: editingCategory?.created_at ?? new Date().toISOString(),
		}));

		const [errors, setErrors] = useState<FormErrors>({});

		const validateForm = useCallback((): boolean => {
			const newErrors: FormErrors = {};

			if (!formData.name.trim()) {
				newErrors.name = 'Category name is required';
			} else if (formData.name.length < 2) {
				newErrors.name = 'Category name must be at least 2 characters';
			}

			if (!formData.description.trim()) {
				newErrors.description = 'Description is required';
			} else if (formData.description.length > 50) {
				newErrors.description = 'Description must be less than 50 characters';
			} else if (formData.description.length < 5) {
				newErrors.description = 'Description must be at least 5 characters';
			}

			setErrors(newErrors);
			return Object.keys(newErrors).length === 0;
		}, [formData]);

		const updateFormData = useCallback(
			(field: keyof FormData, value: FormData[keyof FormData]) => {
				setFormData((prev) => ({ ...prev, [field]: value }));
				setErrors((prev) => ({ ...prev, [field]: undefined }));
			},
			[],
		);

		const handleSave = useCallback(() => {
			if (validateForm()) {
				if (editingId === 'new') {
					createCategory.mutate(formData as Omit<CategoryWithCount, 'id'>, {
						onSuccess: onClose,
					});
				} else if (editingId) {
					updateCategory.mutate(
						{
							categoryId: editingId,
							updates: formData,
						},
						{
							onSuccess: onClose,
						},
					);
				}
			}
		}, [
			createCategory,
			updateCategory,
			editingId,
			formData,
			onClose,
			validateForm,
		]);

		const isLoading = createCategory.isPending || updateCategory.isPending;
		const buttonText = isLoading
			? editingId === 'new'
				? 'Creating...'
				: 'Updating...'
			: editingId === 'new'
			  ? 'Create Category'
			  : 'Update Category';

		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className={styles.modalOverlay}
				onClick={onClose}
			>
				<motion.div
					initial={{ scale: 0.9, y: 20 }}
					animate={{ scale: 1, y: 0 }}
					exit={{ scale: 0.9, y: 20 }}
					className={styles.modalContent}
					onClick={(e) => e.stopPropagation()}
				>
					<h3 className={styles.modalTitle}>
						{editingId === 'new' ? 'NEW CATEGORY' : 'EDIT CATEGORY'}
					</h3>

					<div className={styles.formGroup}>
						<label className={styles.formLabel}>NAME</label>
						<input
							type='text'
							className={`${styles.input} ${
								errors.name ? styles.inputError : ''
							}`}
							value={formData.name}
							onChange={(e) => updateFormData('name', e.target.value)}
						/>
						{errors.name && (
							<span className={styles.errorMessage}>{errors.name}</span>
						)}
					</div>

					<div className={styles.formGroup}>
						<label className={styles.formLabel}>PARENT CATEGORY</label>
						<select
							className={styles.input}
							value={formData.parent_id || ''}
							onChange={(e) =>
								updateFormData('parent_id', e.target.value || null)
							}
						>
							<option value=''>None (Top Level)</option>
							{mainCategories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</div>

					<div className={styles.formGroup}>
						<label className={styles.formLabel}>DESCRIPTION</label>
						<textarea
							className={`${styles.textarea} ${
								errors.description ? styles.inputError : ''
							}`}
							value={formData.description}
							onChange={(e) => updateFormData('description', e.target.value)}
						/>
						{errors.description && (
							<span className={styles.errorMessage}>{errors.description}</span>
						)}
					</div>

					<div className={styles.formGroup}>
						<label className={styles.formLabel}>COLOR</label>
						<input
							type='color'
							className={styles.colorInput}
							value={formData.color}
							onChange={(e) => updateFormData('color', e.target.value)}
						/>
					</div>

					<div className={styles.modalActions}>
						<button
							className={styles.cancelButton}
							onClick={onClose}
							disabled={isLoading}
						>
							Cancel
						</button>
						<button
							className={styles.saveButton}
							onClick={handleSave}
							disabled={isLoading}
						>
							{buttonText}
						</button>
					</div>
				</motion.div>
			</motion.div>
		);
	},
);

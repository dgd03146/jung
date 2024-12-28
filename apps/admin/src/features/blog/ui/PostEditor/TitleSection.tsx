import type { PostWithBlockContent } from '@/fsd/entities/post/model/post';

import { useRef } from 'react';
import {
	HiCalendar,
	HiExclamationCircle,
	HiFolderOpen,
	HiTag,
} from 'react-icons/hi';
import { useGetCategories } from '../../api';
import { CustomDatePicker } from './CustomDatePicker';
import * as styles from './TitleSection.css';

export interface TitleSectionProps {
	post: PostWithBlockContent;
	onFieldChange: <K extends keyof PostWithBlockContent>(
		field: K,
		value: PostWithBlockContent[K],
	) => void;

	maxTags?: number;
	errors: Partial<PostWithBlockContent>;
}

const TitleSection = ({ post, errors, onFieldChange }: TitleSectionProps) => {
	const { title, tags, description } = post;
	const tagInputRef = useRef<HTMLInputElement>(null);
	const { data: categories } = useGetCategories();

	const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const input = e.currentTarget;
		const value = input.value.trim();

		if (e.key === 'Enter' && value) {
			e.preventDefault();
			if (!tags.includes(value)) {
				onFieldChange('tags', [...tags, value]);
			}
			input.value = '';
		} else if (e.key === 'Backspace' && !value) {
			e.preventDefault();
			if (tags.length > 0) {
				onFieldChange('tags', tags.slice(0, -1));
			}
		}
	};

	return (
		<div className={styles.titleSection}>
			<input
				className={styles.titleInput}
				value={title}
				onChange={(e) => onFieldChange('title', e.target.value)}
				placeholder='Untitled'
			/>
			{errors?.title && (
				<div className={styles.errorMessage}>
					<HiExclamationCircle size={16} /> {errors.title}
				</div>
			)}
			<input
				className={styles.descriptionInput}
				value={description}
				onChange={(e) => onFieldChange('description', e.target.value)}
				placeholder='Add a description...'
			/>
			{errors?.description && (
				<div className={styles.errorMessage}>
					<HiExclamationCircle size={16} /> {errors.description}
				</div>
			)}
			<div className={styles.metaSection}>
				<div>
					<div className={styles.metaRow}>
						<label className={styles.label}>
							<span className={styles.iconWrapper}>
								<HiCalendar size={16} />
							</span>
							Date
						</label>
						<CustomDatePicker
							selected={post.date ? new Date(post.date) : null}
							onChange={(date) =>
								onFieldChange('date', date?.toISOString() ?? '')
							}
							placeholderText='Select date'
						/>
					</div>
					{errors?.date && (
						<div className={styles.errorMessage}>
							<HiExclamationCircle size={16} /> {errors.date}
						</div>
					)}
				</div>

				<div>
					<div className={styles.metaRow}>
						<label className={styles.label}>
							<span className={styles.iconWrapper}>
								<HiFolderOpen size={16} />
							</span>
							Category
						</label>
						<div className={styles.selectWrapper}>
							<select
								className={styles.select}
								value={post.category}
								onChange={(e) => onFieldChange('category', e.target.value)}
								data-error={!!errors?.category}
							>
								<option value='' disabled>
									Select category
								</option>
								{categories?.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>
						</div>
					</div>
					{errors?.category && (
						<div className={styles.errorMessage}>
							<HiExclamationCircle size={16} /> {errors.category}
						</div>
					)}
				</div>

				<div>
					<div className={styles.metaRow}>
						<label className={styles.label}>
							<span className={styles.iconWrapper}>
								<HiTag size={16} />
							</span>
							Tags
						</label>
						<div className={styles.tagInputContainer}>
							{tags.map((tag, index) => (
								<span key={index} className={styles.tag}>
									{tag}
									<button
										className={styles.removeTag}
										onClick={() => {
											const newTags = tags.filter((_, i) => i !== index);
											onFieldChange('tags', newTags);
										}}
									>
										×
									</button>
								</span>
							))}
							<input
								ref={tagInputRef}
								className={styles.inlineTagInput}
								placeholder={tags.length === 0 ? 'Press Enter to add tags' : ''}
								onKeyDown={handleTagKeyDown}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TitleSection;

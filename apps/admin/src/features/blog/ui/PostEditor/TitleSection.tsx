import type { PostWithBlockContent } from '@/fsd/entities/post/model/post';

import { useRef } from 'react';
import {
	HiCalendar,
	HiExclamationCircle,
	HiFolderOpen,
	HiTag,
} from 'react-icons/hi';

import { useGetCategories } from '@/fsd/shared/api/useGetCategories';
import {
	Button,
	Flex,
	Input,
	Stack,
	Tag,
	Typography,
} from '@jung/design-system/components';
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
	const { data } = useGetCategories('blog');
	const { mainCategories, subCategories } = data;

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
		<Stack
			gap='2'
			marginY='5'
			space='5'
			borderBottomWidth='hairline'
			borderColor='primary50'
			borderStyle='solid'
		>
			<Input
				className={styles.titleInput}
				value={title}
				onChange={(e) => onFieldChange('title', e.target.value)}
				placeholder='Untitled'
			/>
			{errors?.title && (
				<Typography.SubText
					level={2}
					color='error'
					gap='1'
					display='flex'
					alignItems='center'
				>
					<HiExclamationCircle size={16} /> {errors.title}
				</Typography.SubText>
			)}
			<Input
				className={styles.descriptionInput}
				value={description}
				onChange={(e) => onFieldChange('description', e.target.value)}
				placeholder='Add a description...'
			/>
			{errors?.description && (
				<Typography.SubText
					level={2}
					color='error'
					gap='1'
					display='flex'
					alignItems='center'
				>
					<HiExclamationCircle size={16} /> {errors.description}
				</Typography.SubText>
			)}
			<Stack gap='2'>
				<Flex gap='2'>
					<Typography.Text
						display='flex'
						alignItems='center'
						level={3}
						gap='2'
						fontWeight='medium'
						color='primary'
						minWidth='25'
					>
						<HiCalendar size={20} />
						Date
					</Typography.Text>
					<CustomDatePicker
						selected={post.date ? new Date(post.date) : null}
						onChange={(date) =>
							onFieldChange('date', date?.toISOString() ?? '')
						}
						placeholderText='Select date'
					/>
				</Flex>
				{errors?.date && (
					<Typography.SubText
						level={2}
						color='error'
						gap='1'
						display='flex'
						alignItems='center'
					>
						<HiExclamationCircle size={16} /> {errors.date}
					</Typography.SubText>
				)}

				<Flex gap='2'>
					<Typography.Text
						display='flex'
						alignItems='center'
						level={3}
						gap='2'
						fontWeight='medium'
						color='primary'
						minWidth='25'
					>
						<HiFolderOpen size={20} />
						Category
					</Typography.Text>
					<div className={styles.selectWrapper}>
						<select
							className={styles.select}
							value={post.category || ''}
							onChange={(e) => onFieldChange('category', e.target.value)}
							data-error={!!errors?.category}
						>
							<option value='' disabled>
								Select category
							</option>
							<optgroup label='Main Categories'>
								{mainCategories?.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</optgroup>

							{mainCategories?.map((mainCategory) => {
								const subCats = subCategories?.filter(
									(sub) => sub.parent_id === mainCategory.id,
								);

								if (subCats && subCats.length > 0) {
									return (
										<optgroup
											key={mainCategory.id}
											label={`${mainCategory.name} - Sub`}
										>
											{subCats.map((subCategory) => (
												<option key={subCategory.id} value={subCategory.id}>
													{subCategory.name}
												</option>
											))}
										</optgroup>
									);
								}
								return null;
							})}
						</select>
					</div>
				</Flex>
				{errors?.category && (
					<Typography.SubText
						level={2}
						color='error'
						gap='1'
						display='flex'
						alignItems='center'
					>
						<HiExclamationCircle size={16} /> {errors.category}
					</Typography.SubText>
				)}

				<Flex gap='2'>
					<Typography.Text
						display='flex'
						alignItems='center'
						level={3}
						gap='2'
						fontWeight='medium'
						color='primary'
						minWidth='25'
					>
						<HiTag size={20} />
						Tags
					</Typography.Text>
					<Flex className={styles.tagInputContainer}>
						{tags.map((tag, index) => (
							<Tag key={index} variant='secondary' fontSize='sm'>
								{tag}
								<Button
									className={styles.removeTag}
									onClick={() => {
										const newTags = tags.filter((_, i) => i !== index);
										onFieldChange('tags', newTags);
									}}
								>
									×
								</Button>
							</Tag>
						))}
						<Input
							ref={tagInputRef}
							className={styles.inlineTagInput}
							placeholder={tags.length === 0 ? 'Press Enter to add tags' : ''}
							onKeyDown={handleTagKeyDown}
						/>
					</Flex>
				</Flex>
			</Stack>
		</Stack>
	);
};

export default TitleSection;

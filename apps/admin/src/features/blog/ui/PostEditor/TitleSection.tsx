import {
	Container,
	Input,
	Select,
	Textarea,
} from '@jung/design-system/components';
import { CATEGORIES } from '../../config/category';
import type { PostData } from '../../types/postData';
import ErrorMessage from './ErrorMessage';
import { TagsInput } from './TagsInput';
import * as styles from './TitleSection.css';

export interface TitleSectionProps {
	post: PostData;
	onFieldChange: <K extends keyof PostData>(
		field: K,
		value: PostData[K],
	) => void;

	maxTags?: number;
	errors: Partial<PostData>;
}

const TitleSection = ({
	post,
	maxTags = 2,
	errors,
	onFieldChange,
}: TitleSectionProps) => {
	const { title, category, tags, description } = post;

	return (
		<Container className={styles.titleSection}>
			{/* Title */}
			<Input
				className={styles.titleInput}
				value={title}
				onChange={(e) => onFieldChange('title', e.target.value)}
				placeholder='Untitled'
			/>
			{errors.title && <ErrorMessage message={errors.title} />}
			{/* Category */}
			<Select
				defaultValue={category}
				onValueChange={(category) => onFieldChange('category', category)}
				marginY='2'
			>
				{/* <Select.Label>Category</Select.Label> */}
				<Select.Trigger placeholder='Select a category' borderRadius='lg' />
				<Select.Menu borderRadius='lg'>
					{CATEGORIES.map((cat) => (
						<Select.Item key={cat} value={cat} borderRadius='lg'>
							{cat}
						</Select.Item>
					))}
				</Select.Menu>
			</Select>
			{errors.category && <ErrorMessage message={errors.category} />}
			{/* Description */}
			<Textarea
				className={styles.descriptionInput}
				value={description}
				variant='ghost'
				onChange={(e) => onFieldChange('description', e.target.value)}
				placeholder='Add a description...'
				rows={1}
			/>
			{errors.description && <ErrorMessage message={errors.description} />}
			{/* Tags */}
			<TagsInput
				tags={tags}
				onAddTags={(newTags) => onFieldChange('tags', newTags)}
				maxTags={maxTags}
			/>
		</Container>
	);
};

export default TitleSection;

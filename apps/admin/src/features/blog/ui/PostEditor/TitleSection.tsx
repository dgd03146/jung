import type { PostWithBlockContent } from '@/fsd/entities/post/model/post';
import { Container, Input, Select } from '@jung/design-system/components';
import { CATEGORIES } from '@jung/shared/constants';
import ErrorMessage from './ErrorMessage';
import { TagsInput } from './TagsInput';
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
						<Select.Item key={cat.id} value={cat.name} borderRadius='lg'>
							{cat.name}
						</Select.Item>
					))}
				</Select.Menu>
			</Select>
			{errors.category && <ErrorMessage message={errors.category} />}
			{/* Description */}
			<Input
				className={styles.descriptionInput}
				value={description}
				variant='ghost'
				onChange={(e) => onFieldChange('description', e.target.value)}
				placeholder='Add a description...'
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

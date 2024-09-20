import { Box, Button, Flex, Input, Tag } from '@jung/design-system/components';
import { useCallback, useState } from 'react';
import { FaTag, FaTimes } from 'react-icons/fa';
import * as styles from './TitleSection.css';

interface TagsInputProps {
	tags: string[];
	onAddTags: (newTags: string[]) => void;
	maxTags: number;
}

export const TagsInput = ({ tags, onAddTags, maxTags }: TagsInputProps) => {
	const [showTagInput, setShowTagInput] = useState(false);
	const [tagInput, setTagInput] = useState('');

	const handleAddTag = useCallback(() => {
		if (
			tagInput.trim() &&
			!tags.includes(tagInput.trim()) &&
			tags.length < maxTags
		) {
			onAddTags([...tags, tagInput.trim()]);
			setTagInput('');
		}
	}, [tagInput, tags, onAddTags, maxTags]);

	const handleRemoveTag = useCallback(
		(tagToRemove: string) => {
			onAddTags(tags.filter((tag) => tag !== tagToRemove));
		},
		[tags, onAddTags],
	);

	const handleKeyPress = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				handleAddTag();
			}
		},
		[handleAddTag],
	);

	return (
		<Box className={styles.optionsContainer}>
			<Flex gap='2'>
				<Button
					className={styles.optionButton}
					onClick={() => setShowTagInput(!showTagInput)}
					prefix={<FaTag />}
				>
					Add Tags
				</Button>
			</Flex>
			{showTagInput && tags.length < maxTags && (
				<Input
					boxShadow='primary'
					variant='ghost'
					width='min'
					borderRadius='lg'
					value={tagInput}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setTagInput(e.target.value)
					}
					onKeyPress={handleKeyPress}
					placeholder='Enter tag and press Enter'
					color='black'
					outlineColor='transparent'
				/>
			)}
			{tags.length > 0 && (
				<Flex gap='2' marginTop='2' flexWrap='wrap'>
					{tags.map((tag) => (
						<Tag
							key={tag}
							variant='ghost'
							display='flex'
							alignItems='center'
							background='primary100'
							borderRadius='md'
							boxShadow='primary'
							columnGap='2'
							suffix={
								<Button
									size='zero'
									variant='ghost'
									onClick={() => handleRemoveTag(tag)}
								>
									<FaTimes size={14} />
								</Button>
							}
						>
							{tag}
						</Tag>
					))}
				</Flex>
			)}
		</Box>
	);
};

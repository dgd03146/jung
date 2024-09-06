import React, { useState } from 'react';

import { Box, Flex, Input, Tag } from '@jung/design-system/components';
import { FaTimes } from 'react-icons/fa';
import * as styles from './TagInput.css';

const TagInput = React.memo(
	({
		value,
		onChange,
	}: {
		value: string[];
		onChange: (tags: string[]) => void;
	}) => {
		const [input, setInput] = useState('');

		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setInput(e.target.value);
		};

		const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter' && input.trim()) {
				e.preventDefault();
				onChange([...value, input.trim()]);
				setInput('');
			}
		};

		const handleRemoveTag = (tagToRemove: string) => {
			onChange(value.filter((tag) => tag !== tagToRemove));
		};

		return (
			<Box>
				<Input
					value={input}
					variant='ghost'
					boxShadow='primary'
					borderRadius='lg'
					placeholder='Add tags (press Enter to add)'
					onChange={handleInputChange}
					onKeyDown={handleInputKeyDown}
				/>
				<Flex wrap='wrap' gap='2' marginTop='2'>
					{value.map((tag) => (
						<Tag key={tag} className={styles.tagStyle}>
							{tag}
							<button
								className={styles.closeButtonStyle}
								onClick={() => handleRemoveTag(tag)}
								aria-label={`Remove ${tag} tag`}
							>
								<FaTimes size={12} />
							</button>
						</Tag>
					))}
				</Flex>
			</Box>
		);
	},
);

export default TagInput;

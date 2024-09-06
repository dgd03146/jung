import {
	Box,
	Button,
	Container,
	Flex,
	Input,
	Tag,
} from '@jung/design-system/components';
import React, { useState, useRef, useCallback } from 'react';
import { FaImage, FaTag, FaTimes } from 'react-icons/fa';
import * as styles from './TitleSection.css';

interface TitleSectionProps {
	title: string;
	onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onAddImage: (file: File) => void;
	onAddTags: (newTags: string[]) => void;
	tags: string[];
	maxTags?: number;
}

const TitleSection = React.memo(
	({
		title,
		onTitleChange,
		onAddImage,
		onAddTags,
		tags,
		maxTags = 2,
	}: TitleSectionProps) => {
		const [showTagInput, setShowTagInput] = useState(false);
		const [tagInput, setTagInput] = useState('');
		const [imagePreview, setImagePreview] = useState<string | null>(null);
		const fileInputRef = useRef<HTMLInputElement>(null);

		const handleImageUpload = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				const file = e.target.files?.[0];
				if (file) {
					try {
						onAddImage(file);
						const reader = new FileReader();
						reader.onloadend = () => {
							setImagePreview(reader.result as string);
						};
						reader.readAsDataURL(file);
					} catch (error) {
						console.error('Error uploading image:', error);
					}
				}
				if (fileInputRef.current) {
					fileInputRef.current.value = '';
				}
			},
			[onAddImage],
		);

		const handleRemoveImage = useCallback(() => {
			setImagePreview(null);
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}, []);

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
			<Container className={styles.titleSection}>
				{imagePreview && (
					<Box className={styles.imagePreviewContainer}>
						<Box
							as='img'
							src={imagePreview}
							alt='Cover'
							className={styles.imagePreview}
						/>
						<Button
							className={styles.removeImageButton}
							onClick={handleRemoveImage}
							aria-label='Remove image'
						>
							<FaTimes />
						</Button>
					</Box>
				)}
				<Input
					className={styles.titleInput}
					value={title}
					onChange={onTitleChange}
					placeholder='Untitled'
				/>
				<Box className={styles.optionsContainer}>
					<Flex gap='2'>
						<Button
							className={styles.optionButton}
							prefix={<FaImage />}
							onClick={() => fileInputRef.current?.click()}
						>
							Add Cover
						</Button>
						<Input
							ref={fileInputRef}
							type='file'
							accept='image/*'
							onChange={handleImageUpload}
							display='none'
						/>
						<Button
							className={styles.optionButton}
							onClick={() => setShowTagInput(!showTagInput)}
							prefix={<FaTag />}
						>
							Add Tags
						</Button>
					</Flex>
				</Box>
				{showTagInput && tags.length < maxTags && (
					<Box marginTop='4'>
						<Flex alignItems='center' gap='2'>
							<Input
								boxShadow='primary'
								variant='ghost'
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
						</Flex>
					</Box>
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
			</Container>
		);
	},
);

export default TitleSection;

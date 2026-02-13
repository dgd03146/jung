import type { PartialBlock } from '@blocknote/core';
import {
	Box,
	Button,
	Container,
	Flex,
	Input,
	Stack,
	Typography,
	useToast,
} from '@jung/design-system/components';
import { getImageUrl } from '@jung/shared/lib/getImageUrl';
import { useParams } from '@tanstack/react-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
	HiDocumentText,
	HiOutlinePhotograph,
	HiSparkles,
	HiX,
} from 'react-icons/hi';
import { uploadToR2 } from '@/fsd/shared/lib/r2/uploadToR2';
import {
	deserializeContent,
	EMPTY_CONTENT,
	serializeContent,
} from '@/fsd/shared';
import {
	useCreateArticle,
	useGetArticle,
	useImproveArticle,
	useUpdateArticle,
} from '../../api';
import { textToBlocks } from '../../lib';
import { useArticleContent } from '../../model';
import type { ArticleCategory, ArticleInput } from '../../types';
import { ArticleBlockNote } from './ArticleBlockNote';
import * as styles from './ArticleForm.css';

const MAX_IMAGES = 3;
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = [
	'image/jpeg',
	'image/png',
	'image/webp',
	'image/gif',
];

interface ArticleFormData {
	title: string;
	original_url: string;
	category: ArticleCategory;
	published_at: string;
	status: 'draft' | 'published';
	images: string[];
}

const INITIAL_FORM_DATA: ArticleFormData = {
	title: '',
	original_url: '',
	category: 'frontend',
	published_at: '',
	status: 'draft',
	images: [],
};

const isValidStatus = (s: unknown): s is 'draft' | 'published' =>
	s === 'draft' || s === 'published';

const parseContent = (content: string | null | undefined): PartialBlock[] => {
	if (!content) return [EMPTY_CONTENT];
	try {
		return deserializeContent(content);
	} catch {
		// plain text fallback: 기존 텍스트 데이터를 블록으로 변환
		return textToBlocks(content);
	}
};

export const ArticleForm = () => {
	const showToast = useToast();
	const createArticleMutation = useCreateArticle();
	const updateArticleMutation = useUpdateArticle();
	const improveArticleMutation = useImproveArticle();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const params = useParams({ strict: false });
	const isEditMode = !!(params as { articleId?: string })?.articleId;
	const articleId = (params as { articleId?: string })?.articleId;

	const { data: article, isLoading } = useGetArticle(articleId);

	const [formData, setFormData] = useState<ArticleFormData>(INITIAL_FORM_DATA);
	const [isUploading, setIsUploading] = useState(false);

	const initialSummaryContent = useMemo(
		() => parseContent(article?.summary),
		[article?.summary],
	);
	const initialThoughtsContent = useMemo(
		() => parseContent(article?.my_thoughts),
		[article?.my_thoughts],
	);

	const { editor: summaryEditor, getContent: getSummaryContent } =
		useArticleContent(initialSummaryContent);
	const { editor: thoughtsEditor, getContent: getThoughtsContent } =
		useArticleContent(initialThoughtsContent);

	useEffect(() => {
		if (isEditMode && article) {
			setFormData({
				title: article.title,
				original_url: article.original_url,
				category: article.category as ArticleCategory,
				published_at: article.published_at
					? article.published_at.split('T')[0]
					: '',
				status: isValidStatus(article.status) ? article.status : 'draft',
				images: article.images || [],
			});
		}
	}, [isEditMode, article]);

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;

		const remaining = MAX_IMAGES - formData.images.length;
		if (remaining <= 0) {
			showToast(`Maximum ${MAX_IMAGES} images allowed.`, 'error');
			return;
		}

		const filesToUpload = Array.from(files).slice(0, remaining);

		const invalidFiles = filesToUpload.filter(
			(file) =>
				!ALLOWED_IMAGE_TYPES.includes(file.type) ||
				file.size > MAX_FILE_SIZE_BYTES,
		);
		if (invalidFiles.length > 0) {
			showToast(
				`Only JPEG, PNG, WebP, GIF under ${MAX_FILE_SIZE_MB}MB allowed.`,
				'error',
			);
			return;
		}

		setIsUploading(true);

		try {
			const results = await Promise.all(
				filesToUpload.map((file) => uploadToR2(file, 'articles')),
			);

			setFormData((prev) => ({
				...prev,
				images: [...prev.images, ...results.map((r) => r.key)],
			}));

			showToast(`${results.length} image(s) uploaded.`, 'success');
		} catch {
			showToast('Failed to upload images.', 'error');
		} finally {
			setIsUploading(false);
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}
	};

	const handleRemoveImage = (index: number) => {
		setFormData((prev) => ({
			...prev,
			images: prev.images.filter((_, i) => i !== index),
		}));
	};

	const handleSubmit = (status: 'draft' | 'published') => {
		const summaryContent = serializeContent(getSummaryContent());

		if (!formData.title || !formData.original_url || !summaryContent) {
			showToast('Please fill in all required fields.', 'error');
			return;
		}

		const thoughtsContent = serializeContent(getThoughtsContent());

		const now = new Date().toISOString();

		const getPublishedAt = () => {
			if (formData.published_at)
				return new Date(formData.published_at).toISOString();
			return status === 'published' ? now : null;
		};

		const articleData: ArticleInput = {
			title: formData.title.trim(),
			original_url: formData.original_url.trim(),
			summary: summaryContent,
			my_thoughts: thoughtsContent || null,
			category: formData.category,
			published_at: getPublishedAt(),
			status,
			images: formData.images,
		};

		if (isEditMode && articleId) {
			updateArticleMutation.mutate({
				id: articleId,
				article: articleData,
			});
		} else {
			createArticleMutation.mutate(articleData);
		}
	};

	const handleImprove = async () => {
		const currentSummary = serializeContent(getSummaryContent());
		const currentThoughts = serializeContent(getThoughtsContent());

		if (!formData.title && !currentSummary) {
			showToast('Please enter title or summary first.', 'error');
			return;
		}

		improveArticleMutation.mutate(
			{
				title: formData.title,
				summary: currentSummary,
				my_thoughts: currentThoughts || null,
			},
			{
				onSuccess: (data) => {
					setFormData((prev) => ({
						...prev,
						title: data.title,
					}));

					// AI 결과를 에디터에 삽입
					const summaryBlocks = textToBlocks(data.summary);
					summaryEditor.replaceBlocks(summaryEditor.document, summaryBlocks);

					if (data.my_thoughts) {
						const thoughtsBlocks = textToBlocks(data.my_thoughts);
						thoughtsEditor.replaceBlocks(
							thoughtsEditor.document,
							thoughtsBlocks,
						);
					}
				},
			},
		);
	};

	const isMutating =
		createArticleMutation.isPending || updateArticleMutation.isPending;

	if (isEditMode && isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Container background='white'>
			<Box
				as='form'
				background='white'
				borderRadius='lg'
				padding='6'
				boxShadow='primary'
				onSubmit={(e: React.FormEvent) => e.preventDefault()}
				className={styles.formContainer}
			>
				<Flex align='center' gap='2' color='primary' marginBottom='6'>
					<HiDocumentText size={24} />
					<Typography.Text level={1} fontWeight='semibold'>
						{isEditMode ? 'Edit Article' : 'New Article'}
					</Typography.Text>
				</Flex>

				<Stack space='5'>
					{/* Title */}
					<Stack space='2'>
						<Typography.Text level={2} fontWeight='medium'>
							Title
							{!formData.title && (
								<Typography.Text as='span' level={2} color='secondary'>
									*
								</Typography.Text>
							)}
						</Typography.Text>
						<Input
							width='full'
							borderRadius='md'
							type='text'
							value={formData.title}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, title: e.target.value }))
							}
							placeholder='Enter article title'
						/>
					</Stack>

					{/* Original URL */}
					<Stack space='2'>
						<Typography.Text level={2} fontWeight='medium'>
							Original URL
							{!formData.original_url && (
								<Typography.Text as='span' level={2} color='secondary'>
									*
								</Typography.Text>
							)}
						</Typography.Text>
						<Input
							width='full'
							borderRadius='md'
							type='url'
							value={formData.original_url}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									original_url: e.target.value,
								}))
							}
							placeholder='https://example.com/article'
						/>
					</Stack>

					{/* Summary */}
					<Stack space='2'>
						<Typography.Text level={2} fontWeight='medium'>
							Summary
						</Typography.Text>
						<ArticleBlockNote editor={summaryEditor} />
					</Stack>

					{/* Images */}
					<Stack space='2'>
						<Typography.Text level={2} fontWeight='medium'>
							Images ({formData.images.length}/{MAX_IMAGES})
						</Typography.Text>

						{formData.images.length > 0 && (
							<div className={styles.imageGrid}>
								{formData.images.map((key, index) => (
									<div key={key} className={styles.imagePreview}>
										<img
											src={getImageUrl(key)}
											alt={`Article capture ${index + 1}`}
											className={styles.imagePreviewImg}
										/>
										<button
											type='button'
											className={styles.imageRemoveButton}
											onClick={() => handleRemoveImage(index)}
										>
											<HiX size={14} />
										</button>
									</div>
								))}
							</div>
						)}

						{formData.images.length < MAX_IMAGES && (
							<div>
								<input
									ref={fileInputRef}
									type='file'
									accept='image/*'
									multiple
									onChange={handleImageUpload}
									className={styles.fileInput}
								/>
								<Button
									type='button'
									variant='outline'
									borderRadius='md'
									onClick={() => fileInputRef.current?.click()}
									disabled={isUploading}
								>
									<HiOutlinePhotograph size={18} />
									{isUploading ? 'Uploading...' : 'Add Images'}
								</Button>
							</div>
						)}
					</Stack>

					{/* Why I Recommend */}
					<Stack space='2'>
						<Typography.Text level={2} fontWeight='medium'>
							Why I Recommend
						</Typography.Text>
						<ArticleBlockNote editor={thoughtsEditor} />
					</Stack>

					{/* Category */}
					<Stack space='2'>
						<Typography.Text level={2} fontWeight='medium'>
							Category
							{!formData.category && (
								<Typography.Text as='span' level={2} color='secondary'>
									*
								</Typography.Text>
							)}
						</Typography.Text>
						<select
							value={formData.category}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									category: e.target.value as ArticleCategory,
								}))
							}
							className={styles.select}
						>
							<option value='frontend'>Frontend</option>
							<option value='ai'>AI</option>
						</select>
					</Stack>

					{/* Published At */}
					<Stack space='2'>
						<Typography.Text level={2} fontWeight='medium'>
							Published Date
						</Typography.Text>
						<Input
							width='full'
							borderRadius='md'
							type='date'
							value={formData.published_at}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									published_at: e.target.value,
								}))
							}
						/>
					</Stack>
				</Stack>

				{/* Actions */}
				<Flex justify='space-between' gap='3' paddingY='6'>
					<Button
						type='button'
						borderRadius='md'
						className={styles.improveButton}
						onClick={handleImprove}
						disabled={improveArticleMutation.isPending}
					>
						<HiSparkles size={18} />
						{improveArticleMutation.isPending ? 'Improving...' : 'AI Improve'}
					</Button>

					<Flex gap='3'>
						<Button
							type='button'
							variant='outline'
							borderRadius='md'
							onClick={() => handleSubmit('draft')}
							disabled={isMutating}
						>
							Save as Draft
						</Button>
						<Button
							type='button'
							borderRadius='md'
							className={styles.publishButton}
							onClick={() => handleSubmit('published')}
							disabled={isMutating}
						>
							{isEditMode ? 'Update & Publish' : 'Publish'}
						</Button>
					</Flex>
				</Flex>
			</Box>
		</Container>
	);
};

export default ArticleForm;

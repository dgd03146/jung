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
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import { HiDocumentText, HiSparkles } from 'react-icons/hi';
import {
	deserializeContent,
	EMPTY_CONTENT,
	isEditorEmpty,
	serializeContent,
} from '@/fsd/shared';
import {
	useCreateArticle,
	useImproveArticle,
	useUpdateArticle,
} from '../../api';
import { articleQueryOptions } from '../../api/articleQueryOptions';
import { textToBlocks } from '../../lib';
import { useArticleContent } from '../../model';
import type { ArticleCategory, ArticleInput } from '../../types';
import { ArticleBlockNote } from './ArticleBlockNote';
import * as styles from './ArticleForm.css';

const ICON_SIZE = {
	heading: 24,
	button: 18,
} as const;

interface ArticleFormData {
	title: string;
	original_url: string;
	category: ArticleCategory;
	published_at: string;
}

const INITIAL_FORM_DATA: ArticleFormData = {
	title: '',
	original_url: '',
	category: 'frontend',
	published_at: '',
};

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

	const params = useParams({ strict: false });
	const articleId = (params as { articleId?: string })?.articleId;
	const isEditMode = !!articleId;

	const { data: article, isLoading } = useQuery(
		articleQueryOptions.detail(articleId),
	);

	const [formData, setFormData] = useState<ArticleFormData>(INITIAL_FORM_DATA);

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
				published_at: article.published_at?.split('T')[0] ?? '',
			});
		}
	}, [isEditMode, article]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const summaryBlocks = getSummaryContent();

		if (
			!formData.title ||
			!formData.original_url ||
			isEditorEmpty(summaryBlocks)
		) {
			showToast('Please fill in all required fields.', 'error');
			return;
		}

		const thoughtsBlocks = getThoughtsContent();
		const thoughtsContent = isEditorEmpty(thoughtsBlocks)
			? null
			: serializeContent(thoughtsBlocks);

		const articleData: ArticleInput = {
			title: formData.title.trim(),
			original_url: formData.original_url.trim(),
			summary: serializeContent(summaryBlocks),
			my_thoughts: thoughtsContent,
			category: formData.category,
			published_at: formData.published_at
				? new Date(formData.published_at).toISOString()
				: null,
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
		const summaryEmpty = isEditorEmpty(getSummaryContent());

		if (!formData.title && summaryEmpty) {
			showToast('Please enter title or summary first.', 'error');
			return;
		}

		const currentSummary = serializeContent(getSummaryContent());
		const thoughtsBlocks = getThoughtsContent();
		const currentThoughts = isEditorEmpty(thoughtsBlocks)
			? null
			: serializeContent(thoughtsBlocks);

		improveArticleMutation.mutate(
			{
				title: formData.title,
				summary: currentSummary,
				my_thoughts: currentThoughts,
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

	const isSubmitting =
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
				onSubmit={handleSubmit}
				className={styles.formContainer}
			>
				<Flex align='center' gap='2' color='primary' marginBottom='6'>
					<HiDocumentText size={ICON_SIZE.heading} />
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
							required
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
							required
						/>
					</Stack>

					{/* Summary */}
					<Stack space='2'>
						<Typography.Text level={2} fontWeight='medium'>
							Summary
						</Typography.Text>
						<ArticleBlockNote editor={summaryEditor} />
					</Stack>

					{/* My Thoughts */}
					<Stack space='2'>
						<Typography.Text level={2} fontWeight='medium'>
							My Thoughts
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
							required
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
						<HiSparkles size={ICON_SIZE.button} />
						{improveArticleMutation.isPending ? 'Improving...' : 'AI Improve'}
					</Button>

					<Button type='submit' borderRadius='md' disabled={isSubmitting}>
						{isEditMode ? 'Update Article' : 'Create Article'}
					</Button>
				</Flex>
			</Box>
		</Container>
	);
};

export default ArticleForm;

import {
	Box,
	Button,
	Container,
	Flex,
	Input,
	Stack,
	Textarea,
	Typography,
	useToast,
} from '@jung/design-system/components';
import { useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { HiDocumentText, HiSparkles } from 'react-icons/hi';
import {
	useCreateArticle,
	useGetArticle,
	useImproveArticle,
	useUpdateArticle,
} from '../../api';
import type { ArticleCategory, ArticleInput } from '../../types';
import * as styles from './ArticleForm.css';

interface ArticleFormData {
	title: string;
	original_url: string;
	summary: string;
	my_thoughts: string;
	category: ArticleCategory;
	published_at: string;
}

const INITIAL_FORM_DATA: ArticleFormData = {
	title: '',
	original_url: '',
	summary: '',
	my_thoughts: '',
	category: 'frontend',
	published_at: '',
};

export const ArticleForm = () => {
	const showToast = useToast();
	const createArticleMutation = useCreateArticle();
	const updateArticleMutation = useUpdateArticle();
	const improveArticleMutation = useImproveArticle();

	const params = useParams({ strict: false });
	const isEditMode = !!(params as { articleId?: string })?.articleId;
	const articleId = (params as { articleId?: string })?.articleId;

	const { data: article, isLoading } = useGetArticle(articleId);

	const [formData, setFormData] = useState<ArticleFormData>(INITIAL_FORM_DATA);

	useEffect(() => {
		if (isEditMode && article) {
			setFormData({
				title: article.title,
				original_url: article.original_url,
				summary: article.summary,
				my_thoughts: article.my_thoughts || '',
				category: article.category as ArticleCategory,
				published_at: article.published_at
					? article.published_at.split('T')[0]
					: '',
			});
		}
	}, [isEditMode, article]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.title || !formData.original_url || !formData.summary) {
			showToast('Please fill in all required fields.', 'error');
			return;
		}

		const articleData: ArticleInput = {
			title: formData.title.trim(),
			original_url: formData.original_url.trim(),
			summary: formData.summary.trim(),
			my_thoughts: formData.my_thoughts.trim() || null,
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
		if (!formData.title && !formData.summary) {
			showToast('Please enter title or summary first.', 'error');
			return;
		}

		improveArticleMutation.mutate(
			{
				title: formData.title,
				summary: formData.summary,
				my_thoughts: formData.my_thoughts || null,
			},
			{
				onSuccess: (data) => {
					setFormData((prev) => ({
						...prev,
						title: data.title,
						summary: data.summary,
						my_thoughts: data.my_thoughts,
					}));
				},
			},
		);
	};

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
							{!formData.summary && (
								<Typography.Text as='span' level={2} color='secondary'>
									*
								</Typography.Text>
							)}
						</Typography.Text>
						<Textarea
							width='full'
							borderRadius='md'
							value={formData.summary}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									summary: e.target.value,
								}))
							}
							placeholder='Write a brief summary (2-3 sentences)'
							required
						/>
					</Stack>

					{/* My Thoughts */}
					<Stack space='2'>
						<Typography.Text level={2} fontWeight='medium'>
							My Thoughts
						</Typography.Text>
						<Textarea
							width='full'
							borderRadius='md'
							value={formData.my_thoughts}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									my_thoughts: e.target.value,
								}))
							}
							placeholder='Your personal comments or thoughts (optional)'
						/>
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
						<HiSparkles size={18} />
						{improveArticleMutation.isPending ? 'Improving...' : 'AI Improve'}
					</Button>

					<Button
						type='submit'
						borderRadius='md'
						disabled={
							createArticleMutation.isPending || updateArticleMutation.isPending
						}
					>
						{isEditMode ? 'Update Article' : 'Create Article'}
					</Button>
				</Flex>
			</Box>
		</Container>
	);
};

export default ArticleForm;

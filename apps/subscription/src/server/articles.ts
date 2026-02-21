import type { Database } from '@jung/shared/types';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { getServerSupabase } from './supabase';

export type Article = Database['public']['Tables']['articles']['Row'];

const ARTICLE_CATEGORIES = ['frontend', 'ai'] as const;
const MIN_PAGE = 1;
const DEFAULT_PAGE = 1;
const MAX_PAGE_SIZE = 50;
const DEFAULT_PAGE_SIZE = 10;

const fetchArticlesInput = z.object({
	category: z.string().optional(),
	q: z.string().optional(),
	page: z.number().int().min(MIN_PAGE).default(DEFAULT_PAGE),
	pageSize: z
		.number()
		.int()
		.min(MIN_PAGE)
		.max(MAX_PAGE_SIZE)
		.default(DEFAULT_PAGE_SIZE),
});

export type FetchArticlesInput = z.input<typeof fetchArticlesInput>;

export type PaginatedArticles = {
	articles: Article[];
	totalCount: number;
	page: number;
	pageSize: number;
};

export const fetchArticles = createServerFn({ method: 'GET' })
	.inputValidator((data?: FetchArticlesInput) =>
		fetchArticlesInput.parse(data ?? {}),
	)
	.handler(async ({ data }) => {
		const supabase = getServerSupabase();
		const { category, q, page, pageSize } = data;

		const from = (page - 1) * pageSize;
		const to = from + pageSize - 1;

		let query = supabase
			.from('articles')
			.select('*', { count: 'exact' })
			.eq('status', 'published')
			.order('published_at', { ascending: false, nullsFirst: false });

		if (category && category !== 'all') {
			query = query.eq('category', category);
		}

		if (q) {
			query = query.or(`title.ilike.%${q}%,summary.ilike.%${q}%`);
		}

		query = query.range(from, to);

		const { data: articles, error, count } = await query;

		if (error) {
			throw new Error(`Failed to fetch articles: ${error.message}`);
		}

		return {
			articles: articles ?? [],
			totalCount: count ?? 0,
			page,
			pageSize,
		} satisfies PaginatedArticles;
	});

export const fetchArticleById = createServerFn({ method: 'GET' })
	.inputValidator((id: string) => z.string().uuid().parse(id))
	.handler(async ({ data: id }) => {
		return fetchArticleByIdInternal(id);
	});

const RELATED_ARTICLES_LIMIT = 3;

async function queryRelatedArticles(
	articleId: string,
	category: string,
): Promise<Article[]> {
	const supabase = getServerSupabase();

	const { data: articles, error } = await supabase
		.from('articles')
		.select('*')
		.eq('status', 'published')
		.eq('category', category)
		.neq('id', articleId)
		.order('published_at', { ascending: false, nullsFirst: false })
		.limit(RELATED_ARTICLES_LIMIT);

	if (error) {
		throw new Error(`Failed to fetch related articles: ${error.message}`);
	}

	return articles ?? [];
}

export async function fetchArticleByIdInternal(id: string) {
	const supabase = getServerSupabase();

	const { data, error } = await supabase
		.from('articles')
		.select('*')
		.eq('id', id)
		.eq('status', 'published')
		.single();

	if (error) {
		throw new Error(`Failed to fetch article: ${error.message}`);
	}

	return data;
}

const fetchRelatedInput = z.object({
	articleId: z.string().uuid(),
	category: z.enum(ARTICLE_CATEGORIES),
});

export const fetchRelatedArticles = createServerFn({ method: 'GET' })
	.inputValidator((data: z.infer<typeof fetchRelatedInput>) =>
		fetchRelatedInput.parse(data),
	)
	.handler(async ({ data }) => {
		return queryRelatedArticles(data.articleId, data.category);
	});

export const fetchArticleWithRelated = createServerFn({ method: 'GET' })
	.inputValidator((id: string) => z.string().uuid().parse(id))
	.handler(async ({ data: id }) => {
		const article = await fetchArticleByIdInternal(id);

		const related = await queryRelatedArticles(
			article.id,
			article.category,
		).catch((err) => {
			console.error('Failed to fetch related articles:', err);
			return [] as Article[];
		});

		return { article, relatedArticles: related };
	});

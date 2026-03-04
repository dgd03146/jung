import { FEED_SOURCES, QUALITY_THRESHOLD } from '../config/feeds';
import { scoreArticlesBatch } from './quality-scorer';
import type { RawArticle } from './rss-fetcher';
import { fetchAllFeeds } from './rss-fetcher';
import { getServerSupabase } from './supabase';

export interface PipelineResult {
	fetched: number;
	duplicates: number;
	scored: number;
	belowThreshold: number;
	stored: number;
	errors: string[];
}

async function deduplicateByUrl(
	articles: RawArticle[],
): Promise<{ newArticles: RawArticle[]; duplicateCount: number }> {
	if (articles.length === 0) {
		return { newArticles: [], duplicateCount: 0 };
	}

	const urls = articles.map((a) => a.url);
	const supabase = getServerSupabase();

	const { data: existing } = await supabase
		.from('articles')
		.select('original_url')
		.in('original_url', urls);

	const existingUrls = new Set((existing ?? []).map((row) => row.original_url));

	const newArticles = articles.filter((a) => !existingUrls.has(a.url));
	const duplicateCount = articles.length - newArticles.length;

	return { newArticles, duplicateCount };
}

async function insertArticles(
	articles: Awaited<ReturnType<typeof scoreArticlesBatch>>['scored'],
): Promise<number> {
	if (articles.length === 0) return 0;

	const supabase = getServerSupabase();

	const { data, error } = await supabase
		.from('articles')
		.upsert(
			articles.map((a) => ({
				title: a.title,
				original_url: a.url,
				summary: a.summary,
				author: a.author,
				category: a.category,
				status: 'draft' as const,
				source_feed: a.sourceFeed,
				quality_score: a.qualityScore,
				score_reason: a.scoreReason,
				images: [],
			})),
			{ onConflict: 'original_url', ignoreDuplicates: true },
		)
		.select('id');

	if (error) {
		throw new Error(`Failed to insert articles: ${error.message}`);
	}

	return data?.length ?? 0;
}

export async function runPipeline(options?: {
	threshold?: number;
}): Promise<PipelineResult> {
	const threshold = options?.threshold ?? QUALITY_THRESHOLD;
	const allErrors: string[] = [];

	// 1. Fetch all RSS feeds
	const { articles: rawArticles, errors: fetchErrors } =
		await fetchAllFeeds(FEED_SOURCES);
	allErrors.push(...fetchErrors);

	// 2. Deduplicate by URL
	const { newArticles, duplicateCount } = await deduplicateByUrl(rawArticles);

	// 3. Score with AI
	const {
		scored,
		belowThreshold,
		errors: scoreErrors,
	} = await scoreArticlesBatch(newArticles, threshold);
	allErrors.push(...scoreErrors);

	// 4. Store passing articles as drafts
	const stored = await insertArticles(scored);

	return {
		fetched: rawArticles.length,
		duplicates: duplicateCount,
		scored: scored.length,
		belowThreshold,
		stored,
		errors: allErrors,
	};
}

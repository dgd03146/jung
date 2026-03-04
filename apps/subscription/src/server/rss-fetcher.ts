import type { FeedCategory, FeedSource } from '../config/feeds';

export interface RawArticle {
	title: string;
	url: string;
	summary: string;
	author: string | null;
	publishedAt: string;
	sourceFeed: string;
	category: FeedCategory;
}

const FETCH_TIMEOUT_MS = 10_000;
const SUMMARY_MAX_LENGTH = 500;

function stripHtml(html: string): string {
	return html
		.replace(/<[^>]*>/g, '')
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/\s+/g, ' ')
		.trim();
}

function truncate(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return `${text.slice(0, maxLength - 3)}...`;
}

async function fetchFeed(source: FeedSource): Promise<RawArticle[]> {
	const Parser = (await import('rss-parser')).default;
	const parser = new Parser({
		timeout: FETCH_TIMEOUT_MS,
		headers: { 'User-Agent': 'CuratedByJung/1.0' },
	});

	const feed = await parser.parseURL(source.url);

	return (feed.items ?? [])
		.filter((item) => item.title && item.link)
		.map((item) => {
			const rawSummary =
				item.contentSnippet || item.content || item.summary || '';

			return {
				title: stripHtml(item.title ?? ''),
				url: item.link!,
				summary: truncate(stripHtml(rawSummary), SUMMARY_MAX_LENGTH),
				author: item.creator || item.author || null,
				publishedAt: item.pubDate || item.isoDate || new Date().toISOString(),
				sourceFeed: source.url,
				category: source.category,
			};
		});
}

export async function fetchAllFeeds(
	sources: FeedSource[],
): Promise<{ articles: RawArticle[]; errors: string[] }> {
	const results = await Promise.allSettled(
		sources.map((source) => fetchFeed(source)),
	);

	const articles: RawArticle[] = [];
	const errors: string[] = [];

	for (let i = 0; i < results.length; i++) {
		const result = results[i];
		const source = sources[i];

		if (result.status === 'fulfilled') {
			articles.push(...result.value);
		} else {
			const message = `[${source.name}] ${result.reason instanceof Error ? result.reason.message : String(result.reason)}`;
			errors.push(message);
			console.error(`RSS fetch failed: ${message}`);
		}
	}

	return { articles, errors };
}

export type FeedCategory = 'frontend' | 'ai';

export interface FeedSource {
	name: string;
	url: string;
	category: FeedCategory;
}

export const QUALITY_THRESHOLD = 60;

export const FEED_SOURCES: FeedSource[] = [
	// Frontend
	{
		name: 'web.dev',
		url: 'https://web.dev/feed.xml',
		category: 'frontend',
	},
	{
		name: 'CSS-Tricks',
		url: 'https://css-tricks.com/feed/',
		category: 'frontend',
	},
	{
		name: 'Smashing Magazine',
		url: 'https://www.smashingmagazine.com/feed/',
		category: 'frontend',
	},
	{
		name: 'Kent C. Dodds',
		url: 'https://kentcdodds.com/blog/rss.xml',
		category: 'frontend',
	},
	{
		name: 'Josh W. Comeau',
		url: 'https://joshwcomeau.com/rss.xml',
		category: 'frontend',
	},
	// AI
	{
		name: 'Google AI Blog',
		url: 'https://blog.google/technology/ai/rss/',
		category: 'ai',
	},
	{
		name: 'Hugging Face Blog',
		url: 'https://huggingface.co/blog/feed.xml',
		category: 'ai',
	},
	{
		name: 'The Batch (deeplearning.ai)',
		url: 'https://www.deeplearning.ai/the-batch/feed/',
		category: 'ai',
	},
];

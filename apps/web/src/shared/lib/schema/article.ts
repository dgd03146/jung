import { AUTHOR, PUBLISHER, SITE_URL } from './constants';
import type { Article, WithContext } from './types';

type ArticleSchemaInput = {
	title: string;
	description?: string;
	image?: string;
	datePublished: string;
	dateModified?: string;
	slug: string;
	tags?: string[];
	category?: string;
	wordCount?: number;
	readingTimeMinutes?: number;
	lang?: string;
};

export const createArticleSchema = ({
	title,
	description,
	image,
	datePublished,
	dateModified,
	slug,
	tags,
	category,
	wordCount,
	readingTimeMinutes,
	lang = 'ko',
}: ArticleSchemaInput): WithContext<Article> => {
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: title,
		description:
			description || `JUNG의 블로그에서 "${title}" 포스트를 읽어보세요.`,
		image: image || `${SITE_URL}/images/og/blog-default.jpg`,
		author: {
			'@type': 'Person',
			name: AUTHOR.name,
			url: AUTHOR.url,
			image: AUTHOR.image,
			sameAs: [...AUTHOR.sameAs],
		},
		publisher: {
			'@type': 'Organization',
			name: PUBLISHER.name,
			url: PUBLISHER.url,
			logo: PUBLISHER.logo,
		},
		datePublished,
		dateModified: dateModified || datePublished,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${SITE_URL}/${lang}/blog/${slug}`,
		},
		keywords: tags,
		articleSection: category,
		wordCount,
		timeRequired: readingTimeMinutes ? `PT${readingTimeMinutes}M` : undefined,
		inLanguage: lang,
	};
};

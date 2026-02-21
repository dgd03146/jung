import { SITE_CONFIG } from '../config/site';

interface ArticleJsonLdParams {
	title: string;
	summary: string;
	url: string;
	publishedAt: string | null;
	category: string;
	imageUrl?: string;
}

export function generateArticleJsonLd({
	title,
	summary,
	url,
	publishedAt,
	category,
	imageUrl,
}: ArticleJsonLdParams) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: title,
		description: summary,
		url,
		...(publishedAt && { datePublished: publishedAt }),
		...(imageUrl && { image: imageUrl }),
		author: {
			'@type': 'Person',
			name: 'Jung',
		},
		publisher: {
			'@type': 'Organization',
			name: SITE_CONFIG.name,
			url: SITE_CONFIG.url,
		},
		articleSection: category,
	};
}

interface BreadcrumbItem {
	name: string;
	url: string;
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};
}

export function generateCollectionPageJsonLd(articleCount: number) {
	return {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: `${SITE_CONFIG.name} - Articles`,
		description: SITE_CONFIG.description,
		url: `${SITE_CONFIG.url}/articles`,
		numberOfItems: articleCount,
		publisher: {
			'@type': 'Organization',
			name: SITE_CONFIG.name,
			url: SITE_CONFIG.url,
		},
	};
}

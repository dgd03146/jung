import { SITE_URL } from './constants';
import type { BreadcrumbList, WithContext } from './types';

type BreadcrumbInput = {
	name: string;
	path?: string;
};

export const createBreadcrumbSchema = (
	items: BreadcrumbInput[],
	lang = 'ko',
): WithContext<BreadcrumbList> => {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem' as const,
			position: index + 1,
			name: item.name,
			item: item.path ? `${SITE_URL}/${lang}${item.path}` : undefined,
		})),
	};
};

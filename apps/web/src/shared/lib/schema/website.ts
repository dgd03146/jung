import { AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './constants';
import type { WebSite, WithContext } from './types';

type WebSiteSchemaInput = {
	lang?: string;
};

export const createWebSiteSchema = ({
	lang = 'ko',
}: WebSiteSchemaInput = {}): WithContext<WebSite> => {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SITE_NAME,
		url: SITE_URL,
		description: SITE_DESCRIPTION,
		author: {
			'@type': 'Person',
			name: AUTHOR.name,
			url: AUTHOR.url,
			image: AUTHOR.image,
			sameAs: [...AUTHOR.sameAs],
		},
		inLanguage: lang,
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${SITE_URL}/${lang}/blog?q={search_term_string}`,
			},
			'query-input': 'required name=search_term_string',
		},
	};
};

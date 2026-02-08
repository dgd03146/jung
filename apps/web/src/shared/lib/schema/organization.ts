import { AUTHOR, PUBLISHER, SITE_DESCRIPTION, SITE_URL } from './constants';
import type { WithContext } from './types';

type OrganizationSchema = {
	'@type': 'Organization';
	name: string;
	url: string;
	logo: string;
	description: string;
	sameAs: string[];
	founder: {
		'@type': 'Person';
		name: string;
		url: string;
		image: string;
		jobTitle?: string;
		description?: string;
		knowsAbout?: readonly string[];
	};
	// GEO 최적화 필드
	address: {
		'@type': 'PostalAddress';
		addressCountry: string;
		addressLocality?: string;
	};
	areaServed: string[];
	foundingDate?: string;
	contactPoint?: {
		'@type': 'ContactPoint';
		contactType: string;
		url: string;
	};
};

export const createOrganizationSchema = (): WithContext<OrganizationSchema> => {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: PUBLISHER.name,
		url: SITE_URL,
		logo: PUBLISHER.logo,
		description: SITE_DESCRIPTION,
		sameAs: [...AUTHOR.sameAs],
		founder: {
			'@type': 'Person',
			name: AUTHOR.name,
			url: AUTHOR.url,
			image: AUTHOR.image,
			jobTitle: AUTHOR.jobTitle,
			description: AUTHOR.description,
			knowsAbout: AUTHOR.knowsAbout,
		},
		// GEO 최적화: 지역 정보 추가
		address: {
			'@type': 'PostalAddress',
			addressCountry: AUTHOR.workLocation.addressCountry,
			addressLocality: 'Seoul',
		},
		areaServed: ['KR', 'Global'],
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'Customer Support',
			url: `${SITE_URL}/about`,
		},
	};
};

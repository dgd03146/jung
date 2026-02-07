// JSON-LD Schema Types for SEO

export type WithContext<T> = T & {
	'@context': 'https://schema.org';
};

export type Person = {
	'@type': 'Person';
	name: string;
	url?: string;
	image?: string;
	sameAs?: string[];
};

export type Organization = {
	'@type': 'Organization';
	name: string;
	url?: string;
	logo?: string;
};

export type ImageObject = {
	'@type': 'ImageObject';
	url: string;
	width?: number;
	height?: number;
	caption?: string;
	description?: string;
	name?: string;
	datePublished?: string;
};

export type WebSite = {
	'@type': 'WebSite';
	name: string;
	url: string;
	description?: string;
	author?: Person;
	inLanguage?: string | string[];
	potentialAction?: SearchAction;
};

export type SearchAction = {
	'@type': 'SearchAction';
	target: {
		'@type': 'EntryPoint';
		urlTemplate: string;
	};
	'query-input': string;
};

export type Article = {
	'@type': 'Article' | 'BlogPosting' | 'TechArticle';
	headline: string;
	description?: string;
	image?: string | ImageObject | ImageObject[];
	author: Person | Person[];
	publisher?: Organization;
	datePublished: string;
	dateModified?: string;
	mainEntityOfPage?: {
		'@type': 'WebPage';
		'@id': string;
	};
	keywords?: string[];
	articleSection?: string;
	wordCount?: number;
	timeRequired?: string;
	inLanguage?: string;
};

export type BreadcrumbItem = {
	'@type': 'ListItem';
	position: number;
	name: string;
	item?: string;
};

export type BreadcrumbList = {
	'@type': 'BreadcrumbList';
	itemListElement: BreadcrumbItem[];
};

export type Place = {
	'@type': 'Place';
	name: string;
	description?: string;
	image?: string | ImageObject[];
	address?: {
		'@type': 'PostalAddress';
		addressCountry?: string;
		addressLocality?: string;
		addressRegion?: string;
		streetAddress?: string;
	};
	geo?: {
		'@type': 'GeoCoordinates';
		latitude: number;
		longitude: number;
	};
};

export type FAQPage = {
	'@type': 'FAQPage';
	mainEntity: Question[];
};

export type Question = {
	'@type': 'Question';
	name: string;
	acceptedAnswer: {
		'@type': 'Answer';
		text: string;
	};
};

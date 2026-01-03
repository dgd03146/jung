import { AUTHOR, SITE_URL } from './constants';
import type { ImageObject, WithContext } from './types';

type ImageObjectSchemaInput = {
	url: string;
	width?: number;
	height?: number;
	caption?: string;
	description?: string;
	name?: string;
	datePublished?: string;
	id: string;
	lang?: string;
};

export const createImageObjectSchema = ({
	url,
	width,
	height,
	caption,
	description,
	name,
	datePublished,
	id,
	lang = 'ko',
}: ImageObjectSchemaInput): WithContext<
	ImageObject & {
		author: typeof AUTHOR & { '@type': 'Person' };
		mainEntityOfPage: { '@type': 'WebPage'; '@id': string };
	}
> => {
	return {
		'@context': 'https://schema.org',
		'@type': 'ImageObject',
		url,
		width,
		height,
		caption,
		description: description || caption,
		author: {
			'@type': 'Person',
			name: AUTHOR.name,
			url: AUTHOR.url,
			image: AUTHOR.image,
			sameAs: [...AUTHOR.sameAs],
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${SITE_URL}/${lang}/gallery/photo/${id}`,
		},
	};
};

type ImageGallerySchemaInput = {
	name: string;
	description?: string;
	images: Array<{
		url: string;
		caption?: string;
	}>;
	id: string;
	lang?: string;
};

export const createImageGallerySchema = ({
	name,
	description,
	images,
	id,
	lang = 'ko',
}: ImageGallerySchemaInput): WithContext<{
	'@type': 'ImageGallery';
	name: string;
	description?: string;
	image: Array<{ '@type': 'ImageObject'; url: string; caption?: string }>;
	mainEntityOfPage: { '@type': 'WebPage'; '@id': string };
}> => {
	return {
		'@context': 'https://schema.org',
		'@type': 'ImageGallery',
		name,
		description,
		image: images.map((img) => ({
			'@type': 'ImageObject' as const,
			url: img.url,
			caption: img.caption,
		})),
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${SITE_URL}/${lang}/gallery/collections/${id}`,
		},
	};
};

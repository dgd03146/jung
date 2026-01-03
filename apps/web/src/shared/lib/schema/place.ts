import { SITE_URL } from './constants';
import type { Place, WithContext } from './types';

type PlaceSchemaInput = {
	name: string;
	description?: string;
	image?: string;
	address?: {
		country?: string;
		locality?: string;
		region?: string;
		street?: string;
	};
	coordinates?: {
		latitude: number;
		longitude: number;
	};
	id: string;
	lang?: string;
};

export const createPlaceSchema = ({
	name,
	description,
	image,
	address,
	coordinates,
}: PlaceSchemaInput): WithContext<Place> => {
	return {
		'@context': 'https://schema.org',
		'@type': 'Place',
		name,
		description,
		image: image || `${SITE_URL}/images/og/place-default.jpg`,
		...(address && {
			address: {
				'@type': 'PostalAddress',
				addressCountry: address.country,
				addressLocality: address.locality,
				addressRegion: address.region,
				streetAddress: address.street,
			},
		}),
		...(coordinates && {
			geo: {
				'@type': 'GeoCoordinates',
				latitude: coordinates.latitude,
				longitude: coordinates.longitude,
			},
		}),
	};
};

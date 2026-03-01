import { PLACE_DEFAULTS, usePlacesQuery } from '@/fsd/entities/place';

export function usePlaceListQuery(category: string) {
	return usePlacesQuery({
		cat: category,
		sort: PLACE_DEFAULTS.SORT,
		q: PLACE_DEFAULTS.QUERY,
	});
}

'use client';

import type { Place } from '@jung/shared/types';
import { useMemo, useRef } from 'react';

interface Bounds {
	minLat: number;
	maxLat: number;
	minLng: number;
	maxLng: number;
}

const DEFAULT_CENTER = { lat: 25, lng: 0 } as const;
const DEFAULT_BOUNDS: Bounds = {
	minLat: 90,
	maxLat: -90,
	minLng: 180,
	maxLng: -180,
} as const;

const calculateCenter = (bounds: Bounds) => ({
	lat: (bounds.minLat + bounds.maxLat) / 2,
	lng: (bounds.minLng + bounds.maxLng) / 2,
});

export const useMapState = (
	initialCenter: google.maps.LatLngLiteral | undefined,
	place: Place | undefined,
	places: Place[],
) => {
	const previousPlaces = useRef<Place[]>([]);
	const previousPlace = useRef<Place | undefined>(undefined);

	const markersData = useMemo(() => {
		const hasNoChanges =
			place === previousPlace.current && places === previousPlaces.current;

		if (!hasNoChanges) {
			previousPlace.current = place;
			previousPlaces.current = places;
		}

		return place ? [place] : (places ?? []);
	}, [places, place]);

	const mapConfig = useMemo(() => {
		if (initialCenter) {
			return { center: initialCenter, zoom: 15 };
		}

		if (place) {
			return { center: place.coordinates, zoom: 15 };
		}

		if (!markersData.length) {
			return { center: DEFAULT_CENTER, zoom: 2 };
		}

		if (markersData.length === 1) {
			return {
				center: markersData[0]?.coordinates || DEFAULT_CENTER,
				zoom: 15,
			};
		}

		const bounds = markersData.reduce<Bounds>(
			(acc, marker) => ({
				minLat: Math.min(acc.minLat, marker.coordinates.lat),
				maxLat: Math.max(acc.maxLat, marker.coordinates.lat),
				minLng: Math.min(acc.minLng, marker.coordinates.lng),
				maxLng: Math.max(acc.maxLng, marker.coordinates.lng),
			}),
			DEFAULT_BOUNDS,
		);

		return {
			center: calculateCenter(bounds),
			zoom: 3,
		};
	}, [initialCenter, place, markersData]);

	return {
		markersData: markersData satisfies Place[],
		center: mapConfig.center,
		zoom: mapConfig.zoom,
	};
};

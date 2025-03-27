'use client';

import type { Spot } from '@jung/shared/types';
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
	spot: Spot | undefined,
	spots: Spot[],
) => {
	const previousSpots = useRef<Spot[]>([]);
	const previousSpot = useRef<Spot | undefined>();

	const markersData = useMemo(() => {
		if (spot === previousSpot.current && spots === previousSpots.current) {
			return spot ? [spot] : spots;
		}

		previousSpot.current = spot;
		previousSpots.current = spots;
		return spot ? [spot] : spots || [];
	}, [spots, spot]);

	const mapConfig = useMemo(() => {
		if (initialCenter) {
			return { center: initialCenter, zoom: 15 };
		}

		if (spot) {
			return { center: spot.coordinates, zoom: 15 };
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
	}, [initialCenter, spot, markersData]);

	return {
		markersData: markersData satisfies Spot[],
		center: mapConfig.center,
		zoom: mapConfig.zoom,
	};
};

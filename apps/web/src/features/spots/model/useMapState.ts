import type { Spot } from '@jung/shared/types';
import { useCallback, useMemo, useState } from 'react';

const useMapState = (
	initialCenter: google.maps.LatLngLiteral | undefined,
	spot: Spot | undefined,
	spots: Spot[],
) => {
	const [currentCenter, setCurrentCenter] =
		useState<google.maps.LatLngLiteral | null>(null);
	const [currentZoom, setCurrentZoom] = useState<number | null>(null);
	const [selectedMarker, setSelectedMarker] = useState<Spot | null>(null);

	const markersData = useMemo(() => {
		if (spot) return [spot];
		return spots || [];
	}, [spots, spot]);

	const { center, zoom } = useMemo(() => {
		if (currentCenter && currentZoom !== null) {
			return { center: currentCenter, zoom: currentZoom };
		}

		if (initialCenter) {
			return { center: initialCenter, zoom: 15 };
		}

		if (spot) {
			return { center: spot.coordinates, zoom: 15 };
		}

		if (!markersData.length) {
			return {
				center: { lat: 25, lng: 0 },
				zoom: 2,
			};
		}

		if (markersData.length === 1) {
			return {
				center: markersData[0]?.coordinates,
				zoom: 15,
			};
		}

		const bounds = markersData.reduce(
			(acc, marker) => {
				return {
					minLat: Math.min(acc.minLat, marker.coordinates.lat),
					maxLat: Math.max(acc.maxLat, marker.coordinates.lat),
					minLng: Math.min(acc.minLng, marker.coordinates.lng),
					maxLng: Math.max(acc.maxLng, marker.coordinates.lng),
				};
			},
			{
				minLat: 90,
				maxLat: -90,
				minLng: 180,
				maxLng: -180,
			},
		);

		return {
			center: {
				lat: (bounds.minLat + bounds.maxLat) / 2,
				lng: (bounds.minLng + bounds.maxLng) / 2,
			},
			zoom: 3,
		};
	}, [initialCenter, spot, markersData, currentCenter, currentZoom]);

	const handleMarkerClick = useCallback((markerSpot: Spot) => {
		setSelectedMarker((prev) =>
			prev?.id === markerSpot.id ? null : markerSpot,
		);
	}, []);

	return {
		currentCenter,
		currentZoom,
		markersData,
		center,
		zoom,
		selectedMarker,
		setCurrentCenter,
		setCurrentZoom,
		setSelectedMarker,
		handleMarkerClick,
	};
};

export default useMapState;

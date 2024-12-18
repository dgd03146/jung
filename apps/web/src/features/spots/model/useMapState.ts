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
		if (currentCenter && currentZoom) {
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
				center: { lat: 36.5, lng: 127.5 }, // 한국
				zoom: 7,
			};
		}

		if (markersData.length === 1) {
			return {
				center: markersData[0]?.coordinates,
				zoom: 15,
			};
		}

		return {
			center: { lat: 45, lng: 60 }, // 유럽과 한국 사이 중간 지점
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

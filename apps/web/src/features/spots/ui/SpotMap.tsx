'use client';

import { Button } from '@jung/design-system/components';
import { GoogleMap, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useState } from 'react';
import { SpotCard } from './SpotCard';

import type { Spot } from '@jung/shared/types';
import { mapOptions } from '../config';
import useMapLoad from '../model/useMapLoad';
import useMapState from '../model/useMapState';
import MarkerCluster from './MarkerCluster';
import * as styles from './SpotMap.css';

interface SpotMapProps {
	spots?: Spot[];
	spot?: Spot;
	initialCenter?: google.maps.LatLngLiteral;
	onShowListClick?: () => void;
	isListVisible?: boolean;
}

export function SpotMap({
	spots,
	spot,
	initialCenter,
	onShowListClick,
	isListVisible,
}: SpotMapProps) {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
	});

	const [map, setMap] = useState<google.maps.Map | null>(null);

	const {
		currentCenter,
		currentZoom,
		markersData,
		center,
		zoom,
		selectedMarker,
		setCurrentCenter,
		setSelectedMarker,
		setCurrentZoom,
		handleMarkerClick,
	} = useMapState(initialCenter, spot, spots || []);

	if (!markersData.length) {
		return (
			<div className={styles.loadingContainer}>
				<p>No locations available</p>
			</div>
		);
	}
	const { onLoad, onUnmount } = useMapLoad(setMap, center);

	const onMapChange = useCallback(() => {
		if (!map) return;

		const newCenter = map.getCenter()?.toJSON();
		const newZoom = map.getZoom();

		if (newCenter) setCurrentCenter(newCenter);
		if (newZoom) setCurrentZoom(newZoom);
	}, [map, setCurrentCenter, setCurrentZoom]);

	const onMapClick = useCallback(() => {
		setSelectedMarker(null);
	}, [setSelectedMarker]);

	return (
		<div className={styles.mapContainer}>
			{isLoaded && (
				<GoogleMap
					mapContainerClassName={styles.map}
					center={currentCenter || center}
					zoom={currentZoom || zoom}
					onLoad={onLoad}
					onUnmount={onUnmount}
					onDragEnd={onMapChange}
					onZoomChanged={onMapChange}
					options={mapOptions}
					onClick={onMapClick}
				>
					<MarkerCluster
						markersData={markersData}
						selectedMarkerId={selectedMarker?.id || null}
						handleMarkerClick={handleMarkerClick}
					/>
					{selectedMarker && (
						<InfoWindow
							position={selectedMarker.coordinates}
							onCloseClick={() => setSelectedMarker(null)}
						>
							<SpotCard spot={selectedMarker} variant='compact' />
						</InfoWindow>
					)}
				</GoogleMap>
			)}

			<Button onClick={onShowListClick} className={styles.showListButton}>
				{isListVisible ? 'Hide list' : 'Show list'}
			</Button>
		</div>
	);
}

'use client';

import { Button } from '@jung/design-system/components';
import { GoogleMap, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useCallback } from 'react';
import { SpotCard } from './SpotCard';

import type { Spot } from '@jung/shared/types';
import { mapOptions } from '../config';
import useMapLoad from '../model/useMapLoad';
import useMapState from '../model/useMapState';
import MarkerCluster from './MarkerCluster';
import * as styles from './SpotMap.css';
import { SpotMapEmptyState } from './SpotMapEmptyState';

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

	const {
		markersData,
		center,
		zoom,
		selectedMarker,
		setSelectedMarker,
		handleMarkerClick,
	} = useMapState(initialCenter, spot, spots || []);

	const { onLoad, onUnmount } = useMapLoad(center);

	if (!markersData.length) {
		return (
			<SpotMapEmptyState
				title='There are no places to display'
				description='There are no places to display. Please try searching for a different location.'
				actionText='Search for a different location'
				actionLink='/spots'
			/>
		);
	}

	const onMapClick = useCallback(() => {
		setSelectedMarker(null);
	}, [setSelectedMarker]);

	return (
		<div className={styles.mapContainer}>
			{isLoaded && (
				<GoogleMap
					mapContainerClassName={styles.map}
					center={center}
					zoom={zoom}
					onLoad={onLoad}
					onUnmount={onUnmount}
					options={{
						...mapOptions,
						gestureHandling: 'greedy',
					}}
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

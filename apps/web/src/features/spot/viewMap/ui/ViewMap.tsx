'use client';

import { SpotCard, SpotEmptyState } from '@/fsd/entities/spot';
import {
	SelectMarker,
	useMapLoad,
	useMapState,
	useMarker,
} from '@/fsd/features/spot';
import { LoadingSpinner } from '@/fsd/shared';
import { Flex } from '@jung/design-system/components';
import type { Spot } from '@jung/shared/types';
import {
	GoogleMap,
	InfoWindow,
	MarkerClusterer,
	useJsApiLoader,
} from '@react-google-maps/api';
import { useEffect } from 'react';
import { mapOptions } from '../config/mapOptions';
import { markerClusterOptions } from '../config/markerClusterOptions';
import * as styles from './ViewMap.css';

interface ViewMapProps {
	spots?: Spot[];
	spot?: Spot;
	initialCenter?: google.maps.LatLngLiteral;
}

export const ViewMap = ({ spots, spot, initialCenter }: ViewMapProps) => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
	});

	const { markersData, center, zoom } = useMapState(
		initialCenter,
		spot,
		spots || [],
	);
	const { onLoad, onUnmount } = useMapLoad(center);

	const { selectedMarker, setSelectedMarker } = useMarker();

	useEffect(() => {
		setSelectedMarker(null);
	}, [setSelectedMarker]);

	if (!isLoaded) {
		return (
			<Flex justify='center' align='center' height='1/4'>
				<LoadingSpinner size='large' />
			</Flex>
		);
	}

	if (!markersData.length) {
		return <SpotEmptyState />;
	}

	return (
		<div className={styles.mapContainer}>
			<GoogleMap
				mapContainerClassName={styles.map}
				center={center}
				zoom={zoom}
				onLoad={onLoad}
				onUnmount={onUnmount}
				options={mapOptions}
				onClick={() => setSelectedMarker(null)}
			>
				<MarkerClusterer options={markerClusterOptions}>
					{(clusterer) => (
						<>
							{markersData.map((markerSpot: Spot) => (
								<SelectMarker
									key={markerSpot.id}
									spot={markerSpot}
									clusterer={clusterer}
								/>
							))}
						</>
					)}
				</MarkerClusterer>
				{selectedMarker && (
					<InfoWindow
						position={selectedMarker.coordinates}
						onCloseClick={() => setSelectedMarker(null)}
					>
						<SpotCard spot={selectedMarker} variant='compact' />
					</InfoWindow>
				)}
			</GoogleMap>
		</div>
	);
};

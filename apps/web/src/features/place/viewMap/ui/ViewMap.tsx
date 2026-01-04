'use client';

import { Flex } from '@jung/design-system/components';
import type { Place } from '@jung/shared/types';
import {
	GoogleMap,
	InfoWindow,
	MarkerClusterer,
	useJsApiLoader,
} from '@react-google-maps/api';
import { useEffect } from 'react';
import { PlaceCard, PlaceEmptyState } from '@/fsd/entities/place';
import {
	SelectMarker,
	useMapLoad,
	useMapState,
	useMarker,
} from '@/fsd/features/place';
import { LoadingSpinner } from '@/fsd/shared';
import { mapOptions } from '../config/mapOptions';
import { markerClusterOptions } from '../config/markerClusterOptions';
import * as styles from './ViewMap.css';

interface ViewMapProps {
	places?: Place[];
	place?: Place;
	initialCenter?: google.maps.LatLngLiteral;
}

export const ViewMap = ({ places, place, initialCenter }: ViewMapProps) => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
	});

	const { markersData, center, zoom } = useMapState(
		initialCenter,
		place,
		places || [],
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
		return <PlaceEmptyState />;
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
							{markersData.map((markerPlace: Place) => (
								<SelectMarker
									key={markerPlace.id}
									place={markerPlace}
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
						<PlaceCard place={selectedMarker} variant='compact' />
					</InfoWindow>
				)}
			</GoogleMap>
		</div>
	);
};

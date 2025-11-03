import type { Clusterer } from '@react-google-maps/marker-clusterer';
import { useEffect, useState } from 'react';

export const useMarkerVisibility = (
	clusterer: Clusterer,
	position: google.maps.LatLngLiteral,
) => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		if (!clusterer) {
			setIsVisible(true);
			return;
		}

		const map = clusterer.getMap() as google.maps.Map | null;
		if (!map) return;

		const checkClusterStatus = () => {
			const clusters = clusterer.getClusters();
			let foundInCluster = false;

			for (const cluster of clusters) {
				if (cluster.getSize() > 1) {
					const markers = cluster.getMarkers() as google.maps.Marker[];
					if (!markers) continue;

					for (const marker of markers) {
						const pos = marker.getPosition();
						if (pos?.lat() === position.lat && pos?.lng() === position.lng) {
							foundInCluster = true;
							break;
						}
					}
				}
				if (foundInCluster) break;
			}

			setIsVisible(!foundInCluster);
		};

		checkClusterStatus();

		const clusteringEndListener = google.maps.event.addListener(
			clusterer,
			'clusteringend',
			checkClusterStatus,
		);

		const idleListener = google.maps.event.addListener(
			map,
			'idle',
			checkClusterStatus,
		);

		return () => {
			google.maps.event.removeListener(clusteringEndListener);
			google.maps.event.removeListener(idleListener);
		};
	}, [clusterer, position]);

	return isVisible;
};

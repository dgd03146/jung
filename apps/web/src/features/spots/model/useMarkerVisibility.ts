import { useEffect, useState } from 'react';

const useMarkerVisibility = (
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	clusterer: any,
	position: google.maps.LatLngLiteral,
) => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		if (!clusterer) {
			setIsVisible(true);
			return;
		}

		const map = clusterer.getMap();
		if (!map) return;

		const checkClusterStatus = () => {
			const clusters = clusterer.getClusters();
			let foundInCluster = false;

			for (const cluster of clusters) {
				if (cluster.getSize() > 1) {
					const markers = cluster.getMarkers();
					for (const marker of markers) {
						const pos = marker.getPosition();
						if (pos.lat() === position.lat && pos.lng() === position.lng) {
							foundInCluster = true;
						}
					}
				}
			}

			setIsVisible(!foundInCluster);
		};

		checkClusterStatus();

		const clusteringEndListener = clusterer.addListener(
			'clusteringend',
			checkClusterStatus,
		);
		const zoomChangedListener = map.addListener(
			'zoom_changed',
			checkClusterStatus,
		);

		return () => {
			google.maps.event.removeListener(clusteringEndListener);
			google.maps.event.removeListener(zoomChangedListener);
		};
	}, [clusterer, position]);

	return isVisible;
};

export default useMarkerVisibility;

import { useCallback } from 'react';

const useMapLoad = (center: google.maps.LatLngLiteral) => {
	const onLoad = useCallback(
		(map: google.maps.Map) => {
			map.setCenter(center);
		},
		[center],
	);

	const onUnmount = useCallback((map: google.maps.Map) => {
		if (map) {
			google.maps.event.clearInstanceListeners(map);
		}
	}, []);

	return { onLoad, onUnmount };
};

export default useMapLoad;

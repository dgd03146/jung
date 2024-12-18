import { useCallback } from 'react';

const useMapLoad = (
	setMap: (map: google.maps.Map | null) => void,
	initialMapCenter?: google.maps.LatLngLiteral,
) => {
	const onLoad = useCallback(
		(map: google.maps.Map) => {
			const bounds = new window.google.maps.LatLngBounds(initialMapCenter);
			map.fitBounds(bounds);
			setMap(map);
		},
		[initialMapCenter, setMap],
	);

	const onUnmount = useCallback(() => {
		setMap(null);
	}, [setMap]);

	return { onLoad, onUnmount };
};

export default useMapLoad;

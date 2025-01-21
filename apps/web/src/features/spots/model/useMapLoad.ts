import { useCallback } from 'react';

const useMapLoad = (
	setMap: (map: google.maps.Map | null) => void,
	center: google.maps.LatLngLiteral,
) => {
	const onLoad = useCallback(
		(map: google.maps.Map) => {
			const bounds = new google.maps.LatLngBounds();
			map.setCenter(center);
			setMap(map);
		},
		[center, setMap],
	);

	const onUnmount = useCallback(() => {
		setMap(null);
	}, [setMap]);

	return { onLoad, onUnmount };
};

export default useMapLoad;

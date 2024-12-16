'use client';

import { LoadScript } from '@react-google-maps/api';

const libraries: ('places' | 'geometry')[] = ['places', 'geometry'];

export function GoogleMapsProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<LoadScript
			googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
			libraries={libraries}
		>
			{children}
		</LoadScript>
	);
}

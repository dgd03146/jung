'use client';

import type { Place } from '@jung/shared/types';
import { createContext, type ReactNode, useContext, useState } from 'react';

interface MarkerContextType {
	selectedMarker: Place | null;
	setSelectedMarker: (marker: Place | null) => void;
	handleMarkerClick: (marker: Place) => void;
}

const MarkerContext = createContext<MarkerContextType | undefined>(undefined);

export function MarkerProvider({ children }: { children: ReactNode }) {
	const [selectedMarker, setSelectedMarker] = useState<Place | null>(null);

	const handleMarkerClick = (marker: Place) => {
		setSelectedMarker((prevMarker) =>
			prevMarker?.id === marker.id ? null : marker,
		);
	};

	return (
		<MarkerContext.Provider
			value={{
				selectedMarker,
				setSelectedMarker,
				handleMarkerClick,
			}}
		>
			{children}
		</MarkerContext.Provider>
	);
}

export function useMarker() {
	const context = useContext(MarkerContext);
	if (context === undefined) {
		throw new Error('useMarker must be used within a MarkerProvider');
	}
	return context;
}

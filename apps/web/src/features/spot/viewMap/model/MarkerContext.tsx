'use client';

import type { Spot } from '@jung/shared/types';
import { type ReactNode, createContext, useContext, useState } from 'react';

interface MarkerContextType {
	selectedMarker: Spot | null;
	setSelectedMarker: (marker: Spot | null) => void;
	handleMarkerClick: (marker: Spot) => void;
}

const MarkerContext = createContext<MarkerContextType | undefined>(undefined);

export function MarkerProvider({ children }: { children: ReactNode }) {
	const [selectedMarker, setSelectedMarker] = useState<Spot | null>(null);

	const handleMarkerClick = (marker: Spot) => {
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

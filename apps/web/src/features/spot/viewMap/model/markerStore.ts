import type { Spot } from '@jung/shared/types';
import { create } from 'zustand';

interface MarkerState {
	selectedMarker: Spot | null;
	setSelectedMarker: (marker: Spot | null) => void;
	handleMarkerClick: (marker: Spot) => void;
}

export const useMarkerStore = create<MarkerState>((set) => ({
	selectedMarker: null,
	setSelectedMarker: (marker) => set({ selectedMarker: marker }),
	handleMarkerClick: (marker) =>
		set((state) => ({
			selectedMarker: state.selectedMarker?.id === marker.id ? null : marker,
		})),
}));

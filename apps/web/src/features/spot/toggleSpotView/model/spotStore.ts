import { create } from 'zustand';

interface SpotState {
	isSlidListVisible: boolean;
	isListView: boolean;

	toggleList: () => void;
	toggleView: () => void;
}

export const useSpotStore = create<SpotState>((set) => ({
	isSlidListVisible: false,
	isListView: true,

	toggleList: () =>
		set((state) => ({ isSlidListVisible: !state.isSlidListVisible })),
	toggleView: () => set((state) => ({ isListView: !state.isListView })),
}));

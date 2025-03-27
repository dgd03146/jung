import { create } from 'zustand';
import type { ViewMode } from './view';

interface ViewModeState {
	viewMode: ViewMode;
	setViewMode: (mode: ViewMode) => void;
}

export const useViewModeStore = create<ViewModeState>((set) => ({
	viewMode: 'list',
	setViewMode: (mode) => set({ viewMode: mode }),
}));

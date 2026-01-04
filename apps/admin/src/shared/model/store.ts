import { create } from 'zustand';

interface SidebarState {
	isOpen: boolean;
	openSections: string[];
	actions: {
		toggle: () => void;
		toggleSection: (section: string) => void;
	};
}

export const useSidebarStore = create<SidebarState>((set) => ({
	isOpen: true,
	openSections: ['Dashboard'],
	actions: {
		toggle: () => set((state) => ({ isOpen: !state.isOpen })),
		toggleSection: (section) =>
			set((state) => ({
				openSections: state.openSections.includes(section)
					? state.openSections.filter((s) => s !== section)
					: [...state.openSections, section],
			})),
	},
}));

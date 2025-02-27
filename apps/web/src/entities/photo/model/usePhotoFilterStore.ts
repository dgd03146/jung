import type { Sort } from '@/fsd/shared';
import { create } from 'zustand';

interface PhotoFilterState {
	sort: Sort;
	collectionId?: string;
	setSort: (sort: Sort) => void;
	setCollectionId: (id?: string) => void;
	reset: () => void;
}

export const usePhotoFilterStore = create<PhotoFilterState>()((set) => ({
	sort: 'latest',
	collectionId: undefined,
	setSort: (sort) => set({ sort }),
	setCollectionId: (collectionId) => set({ collectionId }),
	reset: () => set({ sort: 'latest', collectionId: undefined }),
}));

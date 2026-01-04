'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';
import type { Sort } from '@/fsd/shared';

interface PhotoFilterContextType {
	sort: Sort;
	collectionId?: string;
	setSort: (sort: Sort) => void;
	setCollectionId: (id?: string) => void;
	reset: () => void;
}

const PhotoFilterContext = createContext<PhotoFilterContextType | undefined>(
	undefined,
);

export function PhotoFilterProvider({ children }: { children: ReactNode }) {
	const [sort, setSort] = useState<Sort>('latest');
	const [collectionId, setCollectionId] = useState<string | undefined>(
		undefined,
	);

	const reset = () => {
		setSort('latest');
		setCollectionId(undefined);
	};

	return (
		<PhotoFilterContext.Provider
			value={{
				sort,
				collectionId,
				setSort,
				setCollectionId,
				reset,
			}}
		>
			{children}
		</PhotoFilterContext.Provider>
	);
}

export function usePhotoFilter() {
	const context = useContext(PhotoFilterContext);
	if (context === undefined) {
		throw new Error('usePhotoFilter must be used within a PhotoFilterProvider');
	}
	return context;
}

'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';
import type { ViewMode } from '@/fsd/entities/blog/model/view';

interface ViewModeContextType {
	viewMode: ViewMode;
	setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(
	undefined,
);

export function ViewModeProvider({ children }: { children: ReactNode }) {
	const [viewMode, setViewMode] = useState<ViewMode>('list');

	return (
		<ViewModeContext.Provider
			value={{
				viewMode,
				setViewMode,
			}}
		>
			{children}
		</ViewModeContext.Provider>
	);
}

export function useViewMode() {
	const context = useContext(ViewModeContext);
	if (context === undefined) {
		throw new Error('useViewMode must be used within a ViewModeProvider');
	}
	return context;
}

'use client';

import { type ReactNode, createContext, useContext, useState } from 'react';

interface SpotViewContextType {
	isSlidListVisible: boolean;
	isListView: boolean;
	toggleList: () => void;
	toggleView: () => void;
}

const SpotViewContext = createContext<SpotViewContextType | undefined>(
	undefined,
);

export function SpotViewProvider({ children }: { children: ReactNode }) {
	const [isSlidListVisible, setIsSlidListVisible] = useState(false);
	const [isListView, setIsListView] = useState(true);

	const toggleList = () => {
		setIsSlidListVisible((prev) => !prev);
	};

	const toggleView = () => {
		setIsListView((prev) => !prev);
	};

	return (
		<SpotViewContext.Provider
			value={{
				isSlidListVisible,
				isListView,
				toggleList,
				toggleView,
			}}
		>
			{children}
		</SpotViewContext.Provider>
	);
}

export function useSpotView() {
	const context = useContext(SpotViewContext);
	if (context === undefined) {
		throw new Error('useSpotView must be used within a SpotViewProvider');
	}
	return context;
}

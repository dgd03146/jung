'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';

interface PlaceViewContextType {
	isSlidListVisible: boolean;
	isListView: boolean;
	toggleList: () => void;
	toggleView: () => void;
}

const PlaceViewContext = createContext<PlaceViewContextType | undefined>(
	undefined,
);

export function PlaceViewProvider({ children }: { children: ReactNode }) {
	const [isSlidListVisible, setIsSlidListVisible] = useState(false);
	const [isListView, setIsListView] = useState(true);

	const toggleList = () => {
		setIsSlidListVisible((prev) => !prev);
	};

	const toggleView = () => {
		setIsListView((prev) => !prev);
	};

	return (
		<PlaceViewContext.Provider
			value={{
				isSlidListVisible,
				isListView,
				toggleList,
				toggleView,
			}}
		>
			{children}
		</PlaceViewContext.Provider>
	);
}

export function usePlaceView() {
	const context = useContext(PlaceViewContext);
	if (context === undefined) {
		throw new Error('usePlaceView must be used within a PlaceViewProvider');
	}
	return context;
}

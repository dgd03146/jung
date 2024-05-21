import { useCallback } from 'react';
import { useTabsContext } from '../context/TabsContext';

export const useTabHandler = (value: string) => {
	const { currentTab, setCurrentTab, variant, rounded } = useTabsContext();

	const handleTabClick = useCallback(() => {
		setCurrentTab(value);
	}, [setCurrentTab, value]);

	const isActive = currentTab === value;

	return { isActive, variant, rounded, handleTabClick };
};

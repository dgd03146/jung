import { createContext, useContext } from 'react';

type TabsContextState = {
	currentTab?: string | number;
	setCurrentTab: (tabId: string | number) => void;
	variant?: 'primary' | 'secondary';
	rounded?: boolean;
};

export const TabsContext = createContext<TabsContextState | null>(null);

export const useTabsContext = () => {
	const context = useContext(TabsContext);
	if (!context) {
		throw new Error('It should be rendered in the Tabs component');
	}
	return context;
};

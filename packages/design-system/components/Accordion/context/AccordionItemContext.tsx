import { createContext, useContext } from 'react';

type AccordionItemContextState = {
	index?: number;
	id?: string;
};

export const AccordionItemContext =
	createContext<AccordionItemContextState | null>(null);

export const useAccordionItemContext = () => {
	const context = useContext(AccordionItemContext);
	if (!context) {
		throw new Error('It should be rendered in the AccordionItem component');
	}
	return context;
};

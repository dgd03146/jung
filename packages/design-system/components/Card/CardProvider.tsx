'use client';

import { type ReactNode, createContext, useContext } from 'react';
import type { Item } from './types/card';

const defaultValue = {
	title: '',
	description: '',
	date: new Date(),
	tags: [],
};

const CardContext = createContext<Item>(defaultValue);

export const useCardContext = () => {
	const context = useContext(CardContext);
	if (!context) {
		throw Error('It should be rendered in Card component');
	}
	return context;
};

export const CardProvider = ({
	children,
	item,
}: {
	children: ReactNode;
	item: Item;
}) => {
	return <CardContext.Provider value={item}>{children}</CardContext.Provider>;
};

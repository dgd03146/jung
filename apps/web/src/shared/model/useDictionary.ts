'use client';

import { useContext } from 'react';
import { DictionaryContext } from './dictionaryContext';

export const useDictionary = () => {
	const context = useContext(DictionaryContext);
	if (!context) {
		throw new Error(
			'[!] useDictionary must be used within a DictionaryProvider',
		);
	}
	return context;
};

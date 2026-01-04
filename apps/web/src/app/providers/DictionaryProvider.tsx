'use client';

import { useEffect, useState } from 'react';
import {
	DictionaryContext,
	type DictionaryType,
	getDictionary,
} from '@/fsd/shared';

interface DictionaryProviderProps {
	lang: string;
	initialDictionary: DictionaryType;
	children: React.ReactNode;
}

export const DictionaryProvider = ({
	lang,
	initialDictionary,
	children,
}: DictionaryProviderProps) => {
	const [dictionary, setDictionary] =
		useState<DictionaryType>(initialDictionary);

	useEffect(() => {
		const fetchDictionary = async () => {
			const dict = await getDictionary(lang);
			setDictionary(dict);
		};

		if (!initialDictionary) {
			fetchDictionary();
		}
	}, [lang, initialDictionary]);

	return (
		<DictionaryContext.Provider value={{ dictionary, lang }}>
			{children}
		</DictionaryContext.Provider>
	);
};

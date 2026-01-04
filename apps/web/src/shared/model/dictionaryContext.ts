'use client';

import { createContext } from 'react';
import type { DictionaryType } from '../config';

export interface DictionaryContextProps {
	dictionary: DictionaryType;
	lang: string;
}

export const DictionaryContext = createContext<DictionaryContextProps>(
	{} as DictionaryContextProps,
);

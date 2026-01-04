'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

interface SearchParamsConfig<T> {
	defaults: T;
}

export const useSearchParamsState = <T extends Record<string, string>>(
	config: SearchParamsConfig<T>,
) => {
	const searchParams = useSearchParams();

	const result = useMemo(() => {
		return Object.keys(config.defaults).reduce<T>((acc, key) => {
			const value = searchParams.get(key) || config.defaults[key];
			acc[key as keyof T] = value as T[keyof T];
			return acc;
		}, {} as T);
	}, [searchParams, config.defaults]);

	return result;
};

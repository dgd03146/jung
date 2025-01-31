'use client';

import { useSearchParams } from 'next/navigation';

interface SearchParamsConfig<T> {
	defaults: T;
}

export const useSearchParamsState = <T extends Record<string, string>>(
	config: SearchParamsConfig<T>,
) => {
	const searchParams = useSearchParams();

	const result = Object.keys(config.defaults).reduce<T>((acc, key) => {
		const value = searchParams.get(key) || config.defaults[key];
		acc[key as keyof T] = value as T[keyof T];
		return acc;
	}, {} as T);

	return result;
};

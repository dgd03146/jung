'use client';

import {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';

type StorageType = 'localStorage' | 'sessionStorage';

export const useStorage = <T>(
	key: string,
	initialValue: T,
	storageType: StorageType = 'sessionStorage',
): [T, Dispatch<SetStateAction<T>>] => {
	const storageObject =
		typeof window !== 'undefined'
			? storageType === 'localStorage'
				? window.localStorage
				: window.sessionStorage
			: null;

	const [storedValue, setStoredValue] = useState<T>(() => {
		if (!storageObject) {
			return initialValue;
		}
		try {
			const item = storageObject.getItem(key);

			if (item) {
				const parsed = JSON.parse(item);
				if (initialValue instanceof Set && Array.isArray(parsed)) {
					return new Set(parsed) as T;
				}
				return parsed;
			}
		} catch (error) {
			console.error(`Error reading ${storageType} key “${key}”:`, error);
			return initialValue;
		}
	});

	useEffect(() => {
		if (!storageObject) {
			return;
		}
		try {
			const valueToStore =
				storedValue instanceof Set
					? JSON.stringify(Array.from(storedValue))
					: JSON.stringify(storedValue);
			storageObject.setItem(key, valueToStore);
		} catch (error) {
			console.error(`Error setting ${storageType} key “${key}”:`, error);
		}
	}, [key, storedValue, storageObject, storageType]);

	const setValue: Dispatch<SetStateAction<T>> = useCallback((value) => {
		setStoredValue(value);
	}, []);

	return [storedValue, setValue];
};

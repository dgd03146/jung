'use client';

import {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

type StorageType = 'localStorage' | 'sessionStorage';

export const useStorage = <T>(
	key: string,
	initialValue: T,
	storageType: StorageType = 'sessionStorage',
): [T, Dispatch<SetStateAction<T>>] => {
	const [storedValue, setStoredValue] = useState<T>(initialValue);
	const isInitialized = useRef(false);

	useEffect(() => {
		if (isInitialized.current) return;
		isInitialized.current = true;

		const storageObject =
			storageType === 'localStorage'
				? window.localStorage
				: window.sessionStorage;

		try {
			const item = storageObject.getItem(key);
			if (item) {
				const parsed = JSON.parse(item);
				if (initialValue instanceof Set && Array.isArray(parsed)) {
					setStoredValue(new Set(parsed) as T);
				} else {
					setStoredValue(parsed);
				}
			}
		} catch (error) {
			console.error(`Error reading ${storageType} key "${key}":`, error);
		}
	}, [key, initialValue, storageType]);

	useEffect(() => {
		if (!isInitialized.current) return;

		const storageObject =
			storageType === 'localStorage'
				? window.localStorage
				: window.sessionStorage;

		try {
			const valueToStore =
				storedValue instanceof Set
					? JSON.stringify(Array.from(storedValue))
					: JSON.stringify(storedValue);
			storageObject.setItem(key, valueToStore);
		} catch (error) {
			console.error(`Error setting ${storageType} key "${key}":`, error);
		}
	}, [key, storedValue, storageType]);

	const setValue: Dispatch<SetStateAction<T>> = useCallback((value) => {
		setStoredValue(value);
	}, []);

	return [storedValue, setValue];
};

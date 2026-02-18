import { useCallback, useEffect, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

export const THEME_KEY = 'jung-theme';

function isTheme(value: string | null): value is Theme {
	return value === 'light' || value === 'dark';
}

const listeners = new Set<() => void>();

function emitChange() {
	for (const listener of listeners) {
		listener();
	}
}

function subscribe(callback: () => void) {
	listeners.add(callback);
	return () => listeners.delete(callback);
}

function getSnapshot(): Theme {
	const stored = localStorage.getItem(THEME_KEY);
	return isTheme(stored) ? stored : 'light';
}

function getServerSnapshot(): Theme {
	return 'light';
}

export function useTheme() {
	const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	const setTheme = useCallback((newTheme: Theme) => {
		localStorage.setItem(THEME_KEY, newTheme);
		document.documentElement.setAttribute('data-theme', newTheme);
		emitChange();
	}, []);

	const toggleTheme = useCallback(() => {
		const current = getSnapshot();
		setTheme(current === 'light' ? 'dark' : 'light');
	}, [setTheme]);

	return { theme, setTheme, toggleTheme };
}

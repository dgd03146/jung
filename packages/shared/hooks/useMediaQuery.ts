'use client';

import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		setMatches(window.matchMedia(query).matches);

		const mediaQuery = window.matchMedia(query);
		const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

		mediaQuery.addEventListener('change', handler);
		return () => mediaQuery.removeEventListener('change', handler);
	}, [query]);

	return matches ?? false;
};

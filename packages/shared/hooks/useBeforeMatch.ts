import { type RefObject, useEffect } from 'react';

export const useBeforeMatch = <T extends HTMLElement>(
	ref: RefObject<T>,
	onMatch: (event: Event) => void,
) => {
	useEffect(() => {
		const handleMatch = (event: Event) => onMatch(event);
		const element = ref.current;
		if (element) {
			element.addEventListener('beforematch', handleMatch);
		}
		return () => {
			if (element) {
				element.removeEventListener('beforematch', handleMatch);
			}
		};
	}, [ref, onMatch]);
};

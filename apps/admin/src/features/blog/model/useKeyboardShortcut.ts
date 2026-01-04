import { useEffect } from 'react';

type KeyboardEvent = {
	key: string;
	ctrlKey: boolean;
	metaKey: boolean;
	preventDefault: () => void;
};

export const useKeyboardShortcut = (key: string, callback: () => void) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if ((event.ctrlKey || event.metaKey) && event.key === key) {
				event.preventDefault();
				callback();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [key, callback]);
};

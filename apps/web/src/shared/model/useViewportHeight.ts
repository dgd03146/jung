'use client';

import { useEffect, useState } from 'react';

const IS_SERVER = typeof window === 'undefined';

export function useViewportHeight(fallbackHeight = 768): number {
	const [height, setHeight] = useState<number>(
		IS_SERVER ? fallbackHeight : window.innerHeight,
	);

	useEffect(() => {
		if (IS_SERVER) {
			return;
		}

		const handleResize = () => {
			setHeight(window.innerHeight);
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return height;
}

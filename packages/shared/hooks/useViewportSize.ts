'use client';

import { useEffect, useState } from 'react';

export const useViewportSize = () => {
	const [viewportSize, setViewportSize] = useState({
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			setViewportSize({
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight,
			});
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return {
		viewportSize,
		setViewportSize,
	};
};

import { useCallback, useEffect, useRef, useState } from 'react';

export const useScrollDetection = (threshold: number) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const lastScrollY = useRef(0);
	const ticking = useRef(false);

	const handleScroll = useCallback(() => {
		const currentScrollY = window.scrollY;

		if (!ticking.current) {
			window.requestAnimationFrame(() => {
				if (currentScrollY > threshold && !isScrolled) {
					setIsScrolled(true);
				} else if (currentScrollY <= threshold && isScrolled) {
					setIsScrolled(false);
				}

				lastScrollY.current = currentScrollY;
				ticking.current = false;
			});

			ticking.current = true;
		}
	}, [isScrolled, threshold]);

	useEffect(() => {
		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll]);

	return isScrolled;
};

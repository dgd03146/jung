import { useRef } from 'react';

import { useEffect, useState } from 'react';

export const useScrollDetection = ({
	threshold,
	hysteresis = 20,
}: { threshold: number; hysteresis?: number }) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const ticking = useRef(false);

	useEffect(() => {
		const handleScroll = () => {
			if (!ticking.current) {
				ticking.current = true;
				requestAnimationFrame(() => {
					const currentScrollY = window.scrollY;

					if (!isScrolled && currentScrollY > threshold + hysteresis) {
						setIsScrolled(true);
					} else if (isScrolled && currentScrollY < threshold - hysteresis) {
						setIsScrolled(false);
					}

					ticking.current = false;
				});
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [threshold, hysteresis, isScrolled]);

	return isScrolled;
};

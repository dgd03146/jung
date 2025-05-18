import { useRef } from 'react';

import { useEffect, useState } from 'react';

const SCROLL_LOCK_ACTIVE_MARKER_CLASS = 'js-scroll-lock-active'; // useScrollLock과 동일한 마커 클래스명 사용

export const useScrollDetection = ({
	threshold,
	hysteresis = 20,
}: { threshold: number; hysteresis?: number }) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const ticking = useRef(false);

	useEffect(() => {
		const handleScroll = () => {
			// 스크롤 잠금 마커 클래스가 body에 있다면, isScrolled 상태를 업데이트하지 않음
			if (document.body.classList.contains(SCROLL_LOCK_ACTIVE_MARKER_CLASS)) {
				return;
			}

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

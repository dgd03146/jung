'use client';

import { useCallback, useLayoutEffect, useRef } from 'react';
import { bodyScrollLock, scrollPosition } from '../ui/ScrollLock.css';

const getScrollbarWidth = () => {
	if (typeof window === 'undefined') return 0;
	return window.innerWidth - document.documentElement.clientWidth;
};

export const useScrollLock = (isLocked: boolean) => {
	const scrollYRef = useRef(0);
	const originalPaddingRightRef = useRef('');

	const lockScroll = useCallback(() => {
		scrollYRef.current = window.scrollY;
		originalPaddingRightRef.current = document.body.style.paddingRight;

		const scrollbarWidth = getScrollbarWidth();
		document.body.style.paddingRight = `${scrollbarWidth}px`;

		document.documentElement.style.setProperty(
			scrollPosition,
			`${scrollYRef.current}px`,
		);
		document.body.classList.add(bodyScrollLock);
	}, []);

	const unlockScroll = useCallback(() => {
		document.body.classList.remove(bodyScrollLock);
		document.documentElement.style.removeProperty(scrollPosition);
		document.body.style.paddingRight = originalPaddingRightRef.current;
		window.scrollTo(0, scrollYRef.current);
	}, []);

	useLayoutEffect(() => {
		if (isLocked) {
			lockScroll();
		} else {
			unlockScroll();
		}

		return () => {
			if (document.body.classList.contains(bodyScrollLock)) {
				unlockScroll();
			}
		};
	}, [isLocked, lockScroll, unlockScroll]);
};

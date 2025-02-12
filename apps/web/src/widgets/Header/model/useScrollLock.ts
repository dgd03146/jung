import { useCallback, useLayoutEffect, useRef } from 'react';
import { bodyScrollLock, scrollPosition } from '../ui/Header.css';

const useScrollLock = (isLocked: boolean) => {
	const scrollYRef = useRef(0);

	const lockScroll = useCallback(() => {
		scrollYRef.current = window.scrollY;
		document.documentElement.style.setProperty(
			scrollPosition,
			`${scrollYRef.current}px`,
		);
		document.body.classList.add(bodyScrollLock);
	}, []);

	const unlockScroll = useCallback(() => {
		document.body.classList.remove(bodyScrollLock);
		document.documentElement.style.removeProperty(scrollPosition);
		window.scrollTo(0, scrollYRef.current);
	}, []);

	// TODO: 스크롤 복원 블로그 글 작성 useLayoutEffect로 비교

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

export default useScrollLock;

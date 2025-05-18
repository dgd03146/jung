'use client';

import { useCallback, useLayoutEffect, useRef } from 'react';
import { bodyScrollLock, scrollPosition } from '../ui/ScrollLock.css';

// 모듈 레벨 스코프
let lockCount = 0;
let originalBodyPaddingRight = '';
let scrollYAtFirstLock = 0; // 최초 잠금 시퀀스 시작 시점의 스크롤 위치 (모든 잠금 해제 후 복원용)
const SCROLL_LOCK_ACTIVE_MARKER_CLASS = 'js-scroll-lock-active'; // JS 확인용 마커 클래스

const getScrollbarWidth = () => {
	if (typeof window === 'undefined') return 0;
	return window.innerWidth - document.documentElement.clientWidth;
};

export const useScrollLock = (isLocked: boolean) => {
	const instanceLockedRef = useRef(false);

	const lockScroll = useCallback(() => {
		const currentScrollY = window.scrollY; // 함수 호출 시점의 현재 스크롤 위치

		if (lockCount === 0) {
			// 최초 잠금: body 스타일 기본 설정 및 최초 스크롤 위치 기록
			scrollYAtFirstLock = currentScrollY;
			originalBodyPaddingRight = document.body.style.paddingRight;

			const scrollbarWidth = getScrollbarWidth();
			document.body.style.paddingRight = `${scrollbarWidth}px`;

			// bodyScrollLock 클래스를 추가하여 position:fixed 및 overflow:hidden 등 기본 잠금 스타일 적용
			document.body.classList.add(bodyScrollLock);
			document.body.classList.add(SCROLL_LOCK_ACTIVE_MARKER_CLASS); // 마커 클래스 추가
		}

		// scrollPosition CSS 변수를 현재 스크롤 위치(currentScrollY)로 설정합니다.
		document.documentElement.style.setProperty(
			scrollPosition,
			`${currentScrollY}px`,
		);

		// 이 인스턴스가 잠금을 요청했음을 표시하고 잠금 카운트 증가
		if (!instanceLockedRef.current) {
			// 이 인스턴스가 처음 lockScroll을 호출하는 경우
			lockCount++;
			instanceLockedRef.current = true;
		}
	}, []);

	const unlockScroll = useCallback(() => {
		if (!instanceLockedRef.current) return;

		lockCount--;
		instanceLockedRef.current = false;

		if (lockCount === 0) {
			// 모든 잠금이 해제된 경우: body 스타일 원복 및 최초 기록 위치로 스크롤
			document.body.classList.remove(bodyScrollLock);
			document.body.classList.remove(SCROLL_LOCK_ACTIVE_MARKER_CLASS); // 마커 클래스 제거
			document.documentElement.style.removeProperty(scrollPosition);
			document.body.style.paddingRight = originalBodyPaddingRight;

			window.scrollTo(0, scrollYAtFirstLock);
		}
	}, []);

	useLayoutEffect(() => {
		if (isLocked) {
			lockScroll();
		} else {
			if (instanceLockedRef.current) {
				unlockScroll();
			}
		}

		return () => {
			if (instanceLockedRef.current) {
				unlockScroll();
			}
		};
	}, [isLocked, lockScroll, unlockScroll]);
};

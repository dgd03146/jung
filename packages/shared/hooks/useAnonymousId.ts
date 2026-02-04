'use client';

import { useEffect, useState } from 'react';

const ANON_ID_KEY = 'jung_anonymous_id';

/**
 * 익명 ID 생성 헬퍼
 * - secure context에서는 crypto.randomUUID() 사용
 * - 그 외에는 Date.now() + Math.random() 기반 폴백
 */
const generateAnonId = (): string => {
	if (typeof crypto?.randomUUID === 'function') {
		return `anon_${crypto.randomUUID()}`;
	}
	return `anon_${Date.now()}_${Math.floor(Math.random() * 1e9)}`;
};

/**
 * localStorage 기반 익명 사용자 ID 관리 훅
 * - 첫 방문 시 UUID 생성하여 저장
 * - 이후 방문 시 저장된 ID 반환
 * - 브라우저/기기별 고유 ID
 */
export const useAnonymousId = () => {
	const [anonymousId, setAnonymousId] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		try {
			let id = localStorage.getItem(ANON_ID_KEY);

			if (!id) {
				id = generateAnonId();
				localStorage.setItem(ANON_ID_KEY, id);
			}

			setAnonymousId(id);
		} catch {
			// localStorage 접근 실패 시 (private browsing 등)
			// 임시 ID 생성 (세션 동안만 유효)
			setAnonymousId(generateAnonId());
			console.warn('localStorage unavailable, using temporary anonymous ID');
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		anonymousId,
		isLoading,
	};
};

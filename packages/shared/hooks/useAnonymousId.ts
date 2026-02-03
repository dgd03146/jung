'use client';

import { useEffect, useState } from 'react';

const ANON_ID_KEY = 'jung_anonymous_id';

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
				id = `anon_${crypto.randomUUID()}`;
				localStorage.setItem(ANON_ID_KEY, id);
			}

			setAnonymousId(id);
		} catch (error) {
			// localStorage 접근 실패 시 (private browsing 등)
			// 임시 ID 생성 (세션 동안만 유효)
			const tempId = `anon_${crypto.randomUUID()}`;
			setAnonymousId(tempId);
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

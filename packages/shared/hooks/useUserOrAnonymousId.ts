'use client';

import type { User } from '@supabase/supabase-js';
import { useAnonymousId } from './useAnonymousId';

interface UseUserOrAnonymousIdProps {
	user: User | null;
}

interface UseUserOrAnonymousIdResult {
	/** 사용자 ID (로그인) 또는 익명 ID */
	id: string | null;
	/** 로그인 상태 여부 */
	isAuthenticated: boolean;
	/** 익명 상태 여부 (로그인하지 않은 상태) */
	isAnonymous: boolean;
	/** 로딩 중 여부 */
	isLoading: boolean;
}

/**
 * 로그인 사용자 또는 익명 사용자의 ID를 반환하는 훅
 * - 로그인 사용자: Supabase User ID 반환
 * - 비로그인 사용자: localStorage 기반 익명 ID 반환
 */
export const useUserOrAnonymousId = ({
	user,
}: UseUserOrAnonymousIdProps): UseUserOrAnonymousIdResult => {
	const { anonymousId, isLoading } = useAnonymousId();

	if (user) {
		return {
			id: user.id,
			isAuthenticated: true,
			isAnonymous: false,
			isLoading: false,
		};
	}

	return {
		id: anonymousId,
		isAuthenticated: false,
		isAnonymous: !!anonymousId,
		isLoading,
	};
};

import type { Photo } from '@jung/shared/types';
import { useMemo } from 'react';

const FALLBACK_ASPECT_RATIO = 4 / 3;

/**
 * 사진의 가로세로 비율 정보를 계산하는 훅
 *
 * @param photo 사진 객체
 * @param fallbackRatio 기본 비율 (기본값: 4/3)
 * @returns 계산된 비율 정보 (숫자 비율, CSS 값, 유효성 여부)
 */
export function useAspectRatio(
	photo: Photo | null | undefined,
	fallbackRatio: number = FALLBACK_ASPECT_RATIO,
) {
	return useMemo(() => {
		const hasValidDimensions = !!(
			photo?.width &&
			photo?.height &&
			photo.height !== 0
		);

		const ratio = hasValidDimensions
			? photo.width / photo.height
			: fallbackRatio;

		const cssValue = hasValidDimensions
			? `${photo.width} / ${photo.height}`
			: `${Math.round(fallbackRatio * 100)} / 100`;

		return {
			ratio,
			cssValue,
			isValid: hasValidDimensions,
		};
	}, [photo, fallbackRatio]);
}

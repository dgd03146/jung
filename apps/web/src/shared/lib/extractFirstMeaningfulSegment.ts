/**
 * URL 경로에서 첫 번째 의미 있는 세그먼트를 추출합니다.
 * 경로가 언어 코드(예: /ko/, /en/)로 시작하는 경우, 그 다음 세그먼트를 반환합니다.
 * 그렇지 않은 경우 첫 번째 세그먼트를 반환합니다.
 *
 * @param pathname URL 경로 문자열
 * @returns 추출된 의미 있는 첫 번째 세그먼트
 */
export const extractFirstMeaningfulSegment = (pathname: string): string => {
	const segments = pathname.split('/').filter(Boolean);

	if (segments.length > 0 && segments[0] && /^[a-z]{2}$/.test(segments[0])) {
		return segments[1] || '';
	}

	return segments[0] || '';
};

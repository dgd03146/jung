/**
 * R2에 저장된 이미지 key를 Public URL로 변환
 *
 * 사용 예시:
 * getImageUrl('gallery/abc123.jpg')
 * → https://pub-xxx.r2.dev/gallery/abc123.jpg
 *
 * getImageUrl('gallery/abc123.jpg', { width: 800 })
 * → Cloudflare Images Transform 적용 (추후)
 */

const R2_PUBLIC_URL =
	process.env.NEXT_PUBLIC_R2_PUBLIC_URL ||
	'https://pub-9bcb425f9715403f904fe760becda177.r2.dev';

export interface ImageOptions {
	width?: number;
	height?: number;
	quality?: number;
	format?: 'auto' | 'webp' | 'avif';
}

/**
 * R2 이미지 key를 Public URL로 변환
 */
export const getImageUrl = (key: string, _options?: ImageOptions): string => {
	if (!key) return '';

	// 이미 전체 URL인 경우 그대로 반환 (기존 Supabase URL 호환)
	if (key.startsWith('http://') || key.startsWith('https://')) {
		return key;
	}

	return `${R2_PUBLIC_URL}/${key}`;
};

/**
 * 이미지 URL이 R2 key인지 확인
 */
export const isR2Key = (value: string): boolean => {
	return !value.startsWith('http://') && !value.startsWith('https://');
};

// JSON-LD Schema Constants

export const SITE_URL = 'https://www.geojung.com';
export const SITE_NAME = 'JUNG Archive';
export const SITE_DESCRIPTION =
	'감정, 기억, 경험을 아카이빙하는 개인 디지털 공간. 개발, 여행, 일상에 대한 이야기를 담고 있습니다.';

export const AUTHOR = {
	name: 'JUNG',
	url: SITE_URL,
	image: `${SITE_URL}/images/profile.jpg`,
	sameAs: [
		'https://github.com/dgd03146',
		'https://twitter.com/jung',
		'https://linkedin.com/in/jung',
	],
} as const;

export const PUBLISHER = {
	name: SITE_NAME,
	url: SITE_URL,
	logo: `${SITE_URL}/images/logo.png`,
} as const;

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og/default.jpg`;

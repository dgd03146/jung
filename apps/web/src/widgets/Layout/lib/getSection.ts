export const getSection = (pathname: string) => {
	const pathWithoutLocale = pathname.split('/').slice(2).join('/');
	const paths = pathWithoutLocale.split('/').filter(Boolean);

	// "about" 페이지는 숨기기
	if (paths[0] === 'about') {
		return '';
	}

	// blog/[id]와 같은 경우는 숨기기
	if (
		(paths[0] === 'blog' && paths.length > 1) ||
		(paths[0] === 'spots' && paths.length > 1)
	) {
		return '';
	}

	// gallery/collections/[id]와 같은 경우는 GALLERY/COLLECTIONS 표시
	if (paths[0] === 'gallery' && paths.length > 2) {
		return `${paths[0].toUpperCase()}/${paths[1]?.toUpperCase()}`;
	}

	// 첫 번째 path만 있는 경우
	if (paths.length > 0) {
		return paths[0]?.toUpperCase() || '';
	}

	return '';
};

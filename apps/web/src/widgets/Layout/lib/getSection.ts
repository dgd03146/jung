export const getSection = (pathname: string) => {
	const pathWithoutLocale = pathname.split('/').slice(2).join('/');
	const paths = pathWithoutLocale.split('/').filter(Boolean);

	// blog/[id] 숨기기
	if (
		(paths[0] === 'blog' && paths.length > 1 && paths[1] !== 'categories') ||
		(paths[0] === 'places' && paths.length > 1 && paths[1] !== 'categories')
	) {
		return '';
	}

	// gallery/collections/[id] => GALLERY/COLLECTIONS 표시
	if (paths[0] === 'gallery' && paths.length > 2) {
		return `${paths[0].toUpperCase()}/${paths[1]?.toUpperCase()}`;
	}

	// 첫 번째 path만 있는 경우
	if (paths.length > 0) {
		return paths[0]?.toUpperCase() || '';
	}

	return '';
};

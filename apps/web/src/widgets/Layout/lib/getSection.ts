const DETAIL_PAGES = ['blog', 'places'] as const;

const isDetailPagePath = (firstPath: string, secondPath?: string): boolean => {
	const isDetailablePage = DETAIL_PAGES.includes(
		firstPath as (typeof DETAIL_PAGES)[number],
	);
	const hasSubPath = Boolean(secondPath);
	const isNotCategoryPage = secondPath !== 'categories';
	return isDetailablePage && hasSubPath && isNotCategoryPage;
};

export const getSection = (pathname: string) => {
	const paths = pathname.split('/').filter(Boolean);

	if (paths[0] && isDetailPagePath(paths[0], paths[1])) {
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

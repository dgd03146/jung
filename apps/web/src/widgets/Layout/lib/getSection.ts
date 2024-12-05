export const getSection = (pathname: string) => {
	// gallery 섹션이면 'Gallery' 반환
	if (pathname.includes('/gallery')) {
		return 'Gallery';
	}

	// gallery가 아닌 상세 페이지는 숨기기
	const isDetailPage = pathname.split('/').length > 3;
	if (isDetailPage) {
		return '';
	}

	const section = pathname.split('/').pop() || '';
	return section.charAt(0).toUpperCase() + section.slice(1);
};

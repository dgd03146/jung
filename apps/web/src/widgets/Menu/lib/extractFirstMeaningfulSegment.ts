export const extractFirstMeaningfulSegment = (pathname: string) => {
	const segments = pathname.split('/').filter(Boolean);

	if (segments.length > 0 && segments[0] && /^[a-z]{2}$/.test(segments[0])) {
		return segments[1] || '';
	}

	return segments[0] || '';
};

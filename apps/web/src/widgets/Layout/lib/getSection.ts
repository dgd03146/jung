export const getSection = (pathName: string) => {
	const section = pathName.split('/').pop();

	const isDetailPage = pathName.split('/').length > 3;

	return !isDetailPage ? section : '';
};

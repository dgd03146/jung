function getPageTitle(pathname: string): string {
	if (pathname === '/') {
		return 'dashboard.';
	}

	return `${pathname.replace(/^\//, '').split('/', 1)}.`;
}

export default getPageTitle;

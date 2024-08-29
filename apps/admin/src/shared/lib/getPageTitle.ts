function getPageTitle(pathname: string): string {
	if (pathname === '/') {
		return 'dashboard.';
	}

	return `${pathname.replace(/^\//, '')}.`;
}

export default getPageTitle;

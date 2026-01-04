import { type NextRequest, NextResponse } from 'next/server';

import getLocale from './getLocale';

/**
 * Handles locale redirection based on the given request, supported locale codes, and default locale.
 * @param request - The Next.js request object.
 * @param localeCodes - An array of supported locale codes.
 * @param defaultLocale - The default locale code.
 * @returns A Next.js response object for redirection or null if no redirection is needed.
 */
const handleLocaleRedirection = (
	request: NextRequest,
	localeCodes: string[],
	defaultLocale: string,
): NextResponse | null => {
	const { pathname } = request.nextUrl;

	// Check if the given pathname has a supported locale
	const pathnameHasLocale = localeCodes.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (!pathnameHasLocale) {
		// Get the best matching locale (user's browser settings or default 'en')
		const locale = getLocale(request, localeCodes, defaultLocale);

		// Check if the detected locale in the pathname is valid
		const isValidLocale = localeCodes.includes(locale);
		// Create a new URL with the detected locale (default to 'en' if not valid)
		const redirectLocale = isValidLocale ? locale : defaultLocale;

		const redirectUrl = new URL(
			`/${redirectLocale}/${pathname.split('/').slice(1).join('/')}`,
			request.url,
		);
		return NextResponse.redirect(redirectUrl);
	}
	return null;
};

export default handleLocaleRedirection;

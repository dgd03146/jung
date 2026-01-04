import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import type { NextRequest } from 'next/server';

/**
 * Retrieves the best matching locale based on the request headers and available locale codes.
 * @param request - The Next.js request object containing headers.
 * @param localeCodes - An array of supported locale codes.
 * @param defaultLocale - The default locale to use if no match is found.
 * @returns The best matching locale code.
 */
const getLocale = (
	request: NextRequest,
	localeCodes: string[],
	defaultLocale: string,
) => {
	const negotiator = new Negotiator({
		headers: Object.fromEntries(request.headers.entries()),
	});
	const languages: string[] = negotiator.languages();
	try {
		return match(languages, localeCodes, defaultLocale);
	} catch (_e) {
		return defaultLocale;
	}
};

export default getLocale;

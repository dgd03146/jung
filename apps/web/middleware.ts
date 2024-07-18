import {
	defaultLocale,
	handleLocaleRedirection,
	locales,
} from '@/fsd/shared/config';
import { type NextRequest, NextResponse } from 'next/server';

const localeCodes = locales.map((locale) => locale.code);

export function middleware(request: NextRequest) {
	const redirectResponse = handleLocaleRedirection(
		request,
		localeCodes,
		defaultLocale,
	);

	if (redirectResponse) {
		return redirectResponse;
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

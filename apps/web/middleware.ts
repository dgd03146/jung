import { updateSession } from '@/fsd/shared/api/supabase/middleware';
import {
	defaultLocale,
	handleLocaleRedirection,
	locales,
} from '@/fsd/shared/config';
import { type NextRequest, NextResponse } from 'next/server';

const localeCodes = locales.map((locale) => locale.code);

export async function middleware(request: NextRequest) {
	try {
		const redirectResponse = handleLocaleRedirection(
			request,
			localeCodes,
			defaultLocale,
		);

		if (redirectResponse) {
			return redirectResponse;
		}

		return await updateSession(request);
	} catch (error) {
		console.error('미들웨어 오류:', error);

		return NextResponse.next({ request });
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

import { type NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { updateSession } from '@/fsd/shared/api/supabase/middleware';
import { routing } from './src/i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export async function proxy(request: NextRequest) {
	try {
		// Handle i18n routing first
		const intlResponse = intlMiddleware(request);

		// If intl middleware returns a redirect, return it
		if (intlResponse.status !== 200) {
			return intlResponse;
		}

		// Update Supabase session
		return await updateSession(request);
	} catch (error) {
		console.error('Proxy error:', error);
		return NextResponse.next({ request });
	}
}

export const config = {
	matcher: ['/', '/(ko|en)/:path*'],
};

import type { Metadata } from 'next';
import {
	getGoogleVerificationCode,
	SITE_URL,
	SUPPORTED_LANGS,
} from '@/fsd/shared';
import { createClient } from '@/fsd/shared/index.server';
import { LoginPage } from '@/fsd/views';

export const metadata: Metadata = {
	title: 'Login',
	description: 'JUNG의 웹사이트에 로그인하여 더 많은 기능을 이용해보세요.',
	robots: {
		index: false,
		follow: true,
	},
	openGraph: {
		title: 'JUNG • Login',
		description: 'JUNG의 웹사이트에 로그인하여 더 많은 기능을 이용해보세요.',
		type: 'website',
		siteName: 'JUNG',
		locale: 'ko_KR',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Login • JUNG',
		creator: '@jung',
		description: 'JUNG의 웹사이트에 로그인하여 더 많은 기능을 이용해보세요.',
	},
	alternates: {
		canonical: `${SITE_URL}/login`,
		languages: {
			en: `${SITE_URL}/en/login`,
			ko: `${SITE_URL}/ko/login`,
		},
	},
	verification: {
		google: getGoogleVerificationCode(),
	},
};

export async function generateStaticParams() {
	return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export default async function Page() {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	return <LoginPage session={session} />;
}

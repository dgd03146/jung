import {
	SUPPORTED_LANGS,
	getApiUrl,
	getGoogleVerificationCode,
} from '@/fsd/shared';
import { createClient } from '@/fsd/shared/index.server';
import { LoginPage } from '@/fsd/views';
import type { Metadata } from 'next';

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
		canonical: `${getApiUrl()}/login`,
		languages: {
			en: `${getApiUrl()}/en/login`,
			ko: `${getApiUrl()}/ko/login`,
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

import { createClientForServer } from '@/fsd/shared/index.server';
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
		canonical: 'https://your-domain.com/login',
		languages: {
			en: 'https://your-domain.com/en/login',
			ko: 'https://your-domain.com/ko/login',
		},
	},
	verification: {
		google: 'your-google-verification-code',
	},
};

export default async function Page() {
	const supabase = createClientForServer();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	return <LoginPage session={session} />;
}

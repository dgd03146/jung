import { LoginContent } from '@/fsd/features/auth';
import { createClientForServer } from '@/fsd/shared/index.server';
import { Box, Container } from '@jung/design-system';
import type { Metadata } from 'next';
import * as styles from './page.css';

export const metadata: Metadata = {
	title: 'Login • JUNG',
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
		images: [
			{
				url: '/images/og/login.jpg',
				width: 1200,
				height: 630,
				alt: 'JUNG Login Page',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Login • JUNG',
		creator: '@jung',
		description: 'JUNG의 웹사이트에 로그인하여 더 많은 기능을 이용해보세요.',
		images: ['/images/og/login.jpg'],
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

export default async function LoginPage({
	searchParams,
}: {
	searchParams: { next?: string };
}) {
	const supabase = createClientForServer();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	return (
		<Container className={styles.container}>
			<Box className={styles.card}>
				<LoginContent session={session} next={searchParams.next} />
			</Box>
		</Container>
	);
}

import type { Metadata } from 'next';
import { Bebas_Neue, Nanum_Myeongjo, Poppins } from 'next/font/google';
import Script from 'next/script';
import {
	createOrganizationSchema,
	getGA4MeasurementId,
	getGoogleVerificationCode,
	isProduction,
	SITE_URL,
} from '@/fsd/shared';
import { JsonLd } from '@/fsd/shared/ui';

const bebasNeue = Bebas_Neue({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-bebas',
	display: 'swap',
});

const poppins = Poppins({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-poppins',
	display: 'swap',
});

const nanumMyeongjo = Nanum_Myeongjo({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-nanum-myeongjo',
	display: 'swap',
});

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		template: '%s',
		default: 'JUNG',
	},
	icons: {
		icon: '/favicon.ico',
	},
	description: 'Personal blog and portfolio website of Jung',
	keywords: ['blog', 'portfolio', 'photography', 'travel', 'development'],
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: SITE_URL,
		siteName: 'JUNG',
		images: [
			{
				url: '/images/logo.png',
				width: 1200,
				height: 630,
				alt: 'JUNG',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'JUNG',
		description: 'Personal blog and portfolio website of Jung',
		creator: '@jung',
		images: ['/images/og/default.png'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	alternates: {
		canonical: SITE_URL,
		languages: {
			en: `${SITE_URL}/en`,
			ko: `${SITE_URL}/ko`,
		},
		types: {
			'application/rss+xml': `${SITE_URL}/feed.xml`,
			'application/atom+xml': `${SITE_URL}/atom.xml`,
		},
	},
	verification: {
		google: getGoogleVerificationCode(),
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const ga4Id = getGA4MeasurementId();
	const shouldLoadGA4 = isProduction() && ga4Id;

	return (
		<html lang='ko'>
			<body
				className={`${poppins.className} ${bebasNeue.variable} ${nanumMyeongjo.variable}`}
			>
				<JsonLd data={createOrganizationSchema()} />
				{shouldLoadGA4 && (
					<>
						<Script
							src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
							strategy='afterInteractive'
						/>
						<Script id='gtag-init' strategy='afterInteractive'>
							{`
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());
								gtag('config', '${ga4Id}', {
									page_path: window.location.pathname,
									send_page_view: false
								});
							`}
						</Script>
					</>
				)}
				{children}
			</body>
		</html>
	);
}

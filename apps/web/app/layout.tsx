import { siteUrl } from '@/fsd/shared';
import type { Metadata } from 'next';
import { Bebas_Neue, Poppins } from 'next/font/google';

const bebasNeue = Bebas_Neue({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-bebas',
});

const poppins = Poppins({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-poppins',
});

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
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
		url: siteUrl,
		siteName: 'JUNG',
		images: [
			{
				url: '/images/og/default.png',
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
	verification: {
		google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE,
		yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_CODE,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${poppins.className}  ${bebasNeue.variable} `}>
				{children}
			</body>
		</html>
	);
}

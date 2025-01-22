import type { Metadata } from 'next';
import {
	Anton,
	Archivo_Black,
	Bebas_Neue,
	Oswald,
	Poppins,
	Teko,
	Unbounded,
} from 'next/font/google';

const unbounded = Unbounded({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-unbounded',
});

const bebasNeue = Bebas_Neue({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-bebas',
});

const archivo = Archivo_Black({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-archivo',
});

const poppins = Poppins({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-poppins',
});

const anton = Anton({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-anton',
});

const oswald = Oswald({
	weight: ['500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-oswald',
});

const teko = Teko({
	weight: ['500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-teko',
});

export const metadata: Metadata = {
	metadataBase: new URL('https://your-domain.com'),
	title: {
		template: '%s | JUNG',
		default: 'JUNG',
	},
	description: 'Personal blog and portfolio website of Jung',
	keywords: ['blog', 'portfolio', 'photography', 'travel', 'development'],
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://your-domain.com',
		siteName: 'JUNG',
		images: [
			{
				url: '/og-image.jpg',
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
		images: ['/og-image.jpg'],
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
		google: 'your-google-verification-code',
		yandex: 'your-yandex-verification-code',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${poppins.className} ${unbounded.variable} ${bebasNeue.variable} ${archivo.variable} ${anton.variable} ${oswald.variable} ${teko.variable}`}
			>
				{children}
			</body>
		</html>
	);
}

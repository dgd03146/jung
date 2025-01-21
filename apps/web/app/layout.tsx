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
	title: 'JUNG',
	description: 'All about Jung',
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

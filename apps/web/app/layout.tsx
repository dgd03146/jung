import { Layout } from '@/fsd/widgets';
import type { Metadata } from 'next';
import { Poppins, Unbounded } from 'next/font/google';

const unbounded = Unbounded({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
});

const poppins = Poppins({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
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
			<body className={poppins.className}>
				<Layout>{children}</Layout>
			</body>
		</html>
	);
}

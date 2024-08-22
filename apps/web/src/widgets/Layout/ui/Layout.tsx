'use client';

import { Box, Container } from '@jung/design-system/components';
import { usePathname } from 'next/navigation';
import * as styles from './Layout.css';

import { Footer, Header } from '@/fsd/widgets';

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathName = usePathname();
	const isHome = pathName.length === 3;

	return (
		<Container className={styles.container}>
			<Header />
			<Box
				as='main'
				className={styles.main}
				width={isHome ? { desktop: 'desktop' } : { desktop: 'laptop' }}
			>
				<Box className={styles.section}>{children}</Box>
			</Box>

			<Footer />
		</Container>
	);
}

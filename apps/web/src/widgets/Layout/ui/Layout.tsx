'use client';

import { Container, Grid } from '@jung/design-system/components';
import { usePathname } from 'next/navigation';
import * as styles from './Layout.css';

import { Footer, Header } from '@/fsd/widgets';

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathName = usePathname();
	const isHome = pathName.length === 3;

	return (
		<Container className={styles.container}>
			<Header />
			<Container centerContent className={styles.content}>
				<Grid
					className={styles.main}
					width={isHome ? { desktop: 'desktop' } : { desktop: 'laptop' }}
				>
					<Grid className={styles.section}>{children}</Grid>
				</Grid>
			</Container>
			<Footer />
		</Container>
	);
}

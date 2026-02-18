import { Box } from '@jung/design-system/components';
import { Footer, Header } from '@/fsd/widgets';
import * as styles from './Layout.css';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Box className={styles.container}>
			<Header />
			<Box as='main' className={styles.main}>
				<Box className={styles.section}>{children}</Box>
			</Box>
			<Footer />
		</Box>
	);
}

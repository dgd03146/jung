import { Footer, Header } from '@/fsd/widgets';
import { Box } from '@jung/design-system/components';
import * as styles from './Layout.css';
import { SectionTitle } from './SectionTitle';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Box className={styles.container}>
			<Header />

			<Box as='main' className={styles.main}>
				<Box className={styles.section}>
					<SectionTitle />
					{children}
				</Box>
			</Box>
			<Footer />
		</Box>
	);
}

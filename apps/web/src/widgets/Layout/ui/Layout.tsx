import * as styles from './Layout.css';

import { Container, Grid } from '@jung/design-system/components';

import Footer from '../../Footer/ui/Footer';
import Header from '../../Header/ui/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Container className={styles.container}>
			<Header />
			<Container centerContent flexGrow={1}>
				<Grid className={styles.main}>
					<Grid className={styles.section}>{children}</Grid>
				</Grid>
			</Container>
			<Footer />
		</Container>
	);
}

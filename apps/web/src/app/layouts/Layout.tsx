import * as styles from './Layout.css';

import { Container, Grid } from '@jung/design-system/components';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Container className={styles.container}>
			{/* <Header /> */}
			<main>
				<Container centerContent>
					<Grid className={styles.main}>
						<Grid className={styles.section}>{children}</Grid>
					</Grid>
				</Container>
			</main>
			{/* <Footer /> */}
		</Container>
	);
}

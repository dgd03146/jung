import { Box, Container } from '@jung/design-system/components';

import { Sidebar } from '@/fsd/widgets/Sidebar/ui';
import Header from '../../Header/ui/Header';
import * as styles from './Layout.css';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Container className={styles.container}>
			{/* <Box as="main" display="flex"> */}
			<Sidebar />
			<Box
				as='section'
				flex='1'
				background='white200'
				paddingX='20'
				paddingY='10'
			>
				<Header />
				{children}
			</Box>
			{/* </Box> */}
		</Container>
	);
}

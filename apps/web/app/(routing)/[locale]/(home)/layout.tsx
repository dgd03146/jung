import { Box } from '@jung/design-system/components';
import { Header } from '@/fsd/widgets';
import * as styles from './layout.css';

interface Props {
	children: React.ReactNode;
}

export default function HomeLayout({ children }: Props) {
	return (
		<Box className={styles.wrapper}>
			<Header variant='dark' />
			{children}
		</Box>
	);
}

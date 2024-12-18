'use client';

import { Button } from '@jung/design-system/components/Button/Button';
import * as styles from './AboutPage.css';

export const ConnectButton = () => {
	return (
		<Button
			className={styles.ctaButton}
			onClick={() => window.open('https://www.linkedin.com/in/dgd03146/')}
		>
			Let's Connect
		</Button>
	);
};

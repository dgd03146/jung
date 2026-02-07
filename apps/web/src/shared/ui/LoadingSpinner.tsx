import { Box } from '@jung/design-system/components';
import * as styles from './LoadingSpinner.css';

interface LoadingSpinnerProps {
	size?: 'tiny' | 'small' | 'medium' | 'large';
	ref?: React.Ref<HTMLDivElement>;
}

const LoadingSpinner = ({ size = 'small' }: LoadingSpinnerProps) => {
	return (
		<Box
			className={styles.spinner({ size })}
			role='status'
			aria-label='로딩 중'
		/>
	);
};

export default LoadingSpinner;

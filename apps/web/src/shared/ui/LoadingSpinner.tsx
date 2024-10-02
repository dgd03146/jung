import { Box } from '@jung/design-system/components';
import * as styles from './LoadingSpinner.css';

interface LoadingSpinnerProps {
	size?: 'tiny' | 'small' | 'medium' | 'large';
	color?: string;
}

const LoadingSpinner = ({
	size = 'small',
	color = '#007bff',
}: LoadingSpinnerProps) => {
	const getSize = () => {
		switch (size) {
			case 'tiny':
				return { width: '12px', height: '12px', borderWidth: '1px' };
			case 'small':
				return { width: '16px', height: '16px', borderWidth: '2px' };
			case 'medium':
				return { width: '24px', height: '24px', borderWidth: '2px' };
			case 'large':
				return { width: '32px', height: '32px', borderWidth: '3px' };
			default:
				return { width: '20px', height: '20px', borderWidth: '2px' };
		}
	};

	const sizeStyle = getSize();

	return (
		<Box className={styles.spinnerContainer}>
			<Box
				className={styles.spinner}
				style={{
					...sizeStyle,
					borderTopColor: color,
					borderRightColor: color,
				}}
			/>
		</Box>
	);
};

export default LoadingSpinner;

import { useSpotStore } from '@/fsd/features/spot';
import { Button } from '@jung/design-system/components';
import * as styles from './ToggleSpotListButton.css';

export const ToggleSpotListButton = () => {
	const { isSlidListVisible: isListVisible, toggleList } = useSpotStore();

	return (
		<Button className={styles.showListButton} onClick={toggleList}>
			{isListVisible ? 'Hide list' : 'Show list'}
		</Button>
	);
};

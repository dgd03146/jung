import { Button } from '@jung/design-system/components';
import { usePlaceView } from '@/fsd/features/place';
import * as styles from './TogglePlaceListButton.css';

export const TogglePlaceListButton = () => {
	const { isSlidListVisible: isListVisible, toggleList } = usePlaceView();

	return (
		<Button className={styles.showListButton} onClick={toggleList}>
			{isListVisible ? 'Hide list' : 'Show list'}
		</Button>
	);
};

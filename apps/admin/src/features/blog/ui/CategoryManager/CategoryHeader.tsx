import { Flex } from '@jung/design-system/components';
import { CiCircleList, CiGrid41 } from 'react-icons/ci';
import { HiPlus } from 'react-icons/hi2';
import * as styles from './CategoryHeader.css';

interface CategoryHeaderProps {
	view: 'grid' | 'list';
	onViewChange: (view: 'grid' | 'list') => void;
	onAddNew: () => void;
}

export const CategoryHeader = ({
	view,
	onViewChange,
	onAddNew,
}: CategoryHeaderProps) => {
	return (
		<div className={styles.header}>
			<h2 className={styles.title}>Category Management</h2>
			<Flex gap='4' align='center'>
				<div className={styles.viewToggle}>
					<button
						className={styles.viewToggleButton}
						data-active={view === 'grid'}
						onClick={() => onViewChange('grid')}
					>
						<CiGrid41 size={20} />
					</button>
					<button
						className={styles.viewToggleButton}
						data-active={view === 'list'}
						onClick={() => onViewChange('list')}
					>
						<CiCircleList size={20} />
					</button>
				</div>
				<button className={styles.addButton} onClick={onAddNew}>
					<HiPlus />
					New Category
				</button>
			</Flex>
		</div>
	);
};

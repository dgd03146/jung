import { Flex } from '@jung/design-system/components';
import { CiCircleList, CiGrid41 } from 'react-icons/ci';
import { HiPlus } from 'react-icons/hi2';
import * as styles from './CategoryHeader.css';

interface CategoryHeaderProps {
	view: 'grid' | 'list';
	onViewChange: (view: 'grid' | 'list') => void;
	onAddNew: () => void;
	type: 'blog' | 'spots';
}

export const CategoryHeader = ({
	view,
	onViewChange,
	onAddNew,
	type,
}: CategoryHeaderProps) => {
	const title =
		type === 'blog' ? 'Blog Category Management' : 'Spot Category Management';

	const buttonText =
		type === 'blog' ? 'New Blog Category' : 'New Spot Category';

	return (
		<div className={styles.header}>
			<h2 className={styles.title}>{title}</h2>
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
					{buttonText}
				</button>
			</Flex>
		</div>
	);
};

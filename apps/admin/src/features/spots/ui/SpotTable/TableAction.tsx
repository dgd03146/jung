import { Link } from '@tanstack/react-router';
import { FaPlus } from 'react-icons/fa';
import * as styles from './SpotTable.css';

import { useSpotTableFilter } from '../../model/useSpotTableFilter';
export const TableAction = () => {
	const { filter, handleFilterChange } = useSpotTableFilter();

	return (
		<div className={styles.tableAction}>
			<input
				type='text'
				className={styles.searchInput}
				value={filter ?? ''}
				onChange={handleFilterChange}
				placeholder='Search spots...'
			/>
			<Link to={'/spots/new'}>
				<button className={styles.newButton}>
					<FaPlus size={14} />
					New
				</button>
			</Link>
		</div>
	);
};

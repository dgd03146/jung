import { Link } from '@tanstack/react-router';
import { FaPlus } from 'react-icons/fa';
import { usePlaceTableFilter } from '../../model/usePlaceTableFilter';
import * as styles from './PlaceTable.css';
export const TableAction = () => {
	const { filter, handleFilterChange } = usePlaceTableFilter();

	return (
		<div className={styles.tableAction}>
			<input
				type='text'
				className={styles.searchInput}
				value={filter ?? ''}
				onChange={handleFilterChange}
				placeholder='Search places...'
			/>
			<Link to={'/places/new'}>
				<button className={styles.newButton}>
					<FaPlus size={14} />
					New
				</button>
			</Link>
		</div>
	);
};

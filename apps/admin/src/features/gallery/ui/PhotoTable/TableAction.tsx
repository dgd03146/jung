import { Routes } from '@/fsd/shared';
import { Link } from '@tanstack/react-router';
import { HiPlus } from 'react-icons/hi';
import { usePhotoTableFilter } from '../../model/usePhotoTableFilter';
import * as styles from './PhotoTable.css';

export const TableAction = () => {
	const { filter, handleFilterChange } = usePhotoTableFilter();

	return (
		<div className={styles.tableAction}>
			<input
				type='text'
				className={styles.searchInput}
				value={filter ?? ''}
				onChange={handleFilterChange}
				placeholder='Search photos...'
			/>
			<Link to={`${Routes.gallery.path}/photos/new`}>
				<button className={styles.newButton}>
					<HiPlus size={14} />
					New Photos
				</button>
			</Link>
		</div>
	);
};

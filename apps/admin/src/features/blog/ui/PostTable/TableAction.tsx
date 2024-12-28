import { usePostTableFilter } from '@/fsd/features/blog/model';
import { Routes } from '@/fsd/shared';
import { Link } from '@tanstack/react-router';
import { FaPlus } from 'react-icons/fa';
import * as styles from './PostTable.css';

const TableAction = () => {
	const { filter, handleFilterChange } = usePostTableFilter();

	return (
		<div className={styles.tableAction}>
			<input
				type='text'
				className={styles.searchInput}
				value={filter ?? ''}
				onChange={handleFilterChange}
				placeholder='Search posts...'
			/>
			<Link to={`${Routes.blog.path}/new`}>
				<button className={styles.newButton}>
					<FaPlus size={14} />
					New
				</button>
			</Link>
		</div>
	);
};

export default TableAction;

import type { Spot } from '@jung/shared/types';
import { Link } from '@tanstack/react-router';
import { type Table, flexRender } from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDeleteSpot } from '../../api/useDeleteSpot';
import { useGetSpotCategories } from '../../api/useGetSpotCategories';
import * as styles from './SpotTable.css';
import { CategoryCell } from './cells/CategoryCell';
import { DateCell } from './cells/DateCell';
import { ImageCell } from './cells/ImageCell';

interface TableBodyProps<T> {
	table: Table<T>;
}

export const TableBody = <T,>({ table }: TableBodyProps<T>) => {
	const deleteSpotMutation = useDeleteSpot();
	const { data: categoriesData } = useGetSpotCategories();

	const handleDelete = (id: string) => {
		if (window.confirm('이 장소를 삭제하시겠습니까?')) {
			deleteSpotMutation.mutate(id);
		}
	};

	return (
		<tbody>
			{table.getRowModel().rows.map((row) => {
				const spot = row.original as Spot;

				const category = categoriesData?.allCategories.find(
					(cat) => cat.id === spot.category_id,
				);

				return (
					<tr key={row.id} className={styles.row}>
						{row.getVisibleCells().map((cell) => (
							<td
								key={cell.id}
								className={`${styles.td} ${
									cell.column.id === 'title' ||
									cell.column.id === 'address' ||
									cell.column.id === 'tips'
										? styles.textAlignLeft
										: cell.column.id === 'likes' || cell.column.id === 'rating'
										  ? styles.textAlignRight
										  : ''
								}`}
							>
								{cell.column.id === 'photos' ? (
									<ImageCell url={spot.photos[0]?.url} alt={spot.title} />
								) : cell.column.id === 'created_at' ? (
									<DateCell date={spot.created_at} />
								) : cell.column.id === 'category' ? (
									<CategoryCell category={category} />
								) : (
									flexRender(cell.column.columnDef.cell, cell.getContext())
								)}
							</td>
						))}
						<td className={styles.td}>
							<div style={{ display: 'flex', gap: '8px' }}>
								<Link to={'/spots/$spotId/edit'} params={{ spotId: spot.id }}>
									<button className={styles.actionButton}>
										<FaEdit size={16} />
									</button>
								</Link>
								<button
									className={styles.actionButton}
									onClick={() => handleDelete(spot.id)}
								>
									<FaTrash size={16} />
								</button>
							</div>
						</td>
					</tr>
				);
			})}
		</tbody>
	);
};

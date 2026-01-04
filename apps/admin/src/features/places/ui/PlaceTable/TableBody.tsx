import type { Place } from '@jung/shared/types';
import { Link } from '@tanstack/react-router';
import { flexRender, type Table } from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useGetCategories } from '@/fsd/shared';
import { CategoryCell, DateCell, ImageCell } from '@/fsd/shared/ui';
import { useDeletePlace } from '../../api/useDeletePlace';
import * as styles from './PlaceTable.css';

interface TableBodyProps<T> {
	table: Table<T>;
}

export const TableBody = <T,>({ table }: TableBodyProps<T>) => {
	const deletePlaceMutation = useDeletePlace();
	const { data: categoriesData } = useGetCategories('places');

	const handleDelete = (id: string) => {
		if (window.confirm('Delete this place?')) {
			deletePlaceMutation.mutate(id);
		}
	};

	return (
		<tbody>
			{table.getRowModel().rows.map((row) => {
				const place = row.original as Place;

				const category = categoriesData?.allCategories.find(
					(cat) => cat.id === place.category_id,
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
										: cell.column.id === 'likes'
											? styles.textAlignRight
											: ''
								}`}
							>
								{cell.column.id === 'photos' ? (
									<ImageCell url={place.photos[0].url} alt={place.title} />
								) : cell.column.id === 'created_at' ? (
									<DateCell date={place.created_at} />
								) : cell.column.id === 'category' ? (
									<CategoryCell category={category} />
								) : (
									flexRender(cell.column.columnDef.cell, cell.getContext())
								)}
							</td>
						))}
						<td className={styles.td}>
							<div style={{ display: 'flex', gap: '8px' }}>
								<Link
									to={'/places/$placeId/edit'}
									params={{ placeId: place.id }}
								>
									<button className={styles.actionButton}>
										<FaEdit size={16} />
									</button>
								</Link>
								<button
									className={styles.actionButton}
									onClick={() => handleDelete(place.id)}
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

import { Checkbox } from '@jung/design-system/components';
import type { Place } from '@jung/shared/types';
import { Link } from '@tanstack/react-router';
import { flexRender, type Table } from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useConfirmDialog, useGetCategories } from '@/fsd/shared';
import { CategoryCell, DateCell, ImageCell } from '@/fsd/shared/ui';
import { useDeletePlace } from '../../api/useDeletePlace';
import * as styles from './PlaceTable.css';

interface TableBodyProps<T> {
	table: Table<T>;
	isSelected?: (id: string) => boolean;
	onToggle?: (id: string) => void;
}

export const TableBody = <T,>({
	table,
	isSelected,
	onToggle,
}: TableBodyProps<T>) => {
	const deletePlaceMutation = useDeletePlace();
	const { data: categoriesData } = useGetCategories('places');
	const { confirm } = useConfirmDialog();

	const handleDelete = async (id: string) => {
		const ok = await confirm({
			title: 'Delete Place',
			description:
				'Are you sure you want to delete this place? This action cannot be undone.',
			confirmText: 'Delete',
			variant: 'destructive',
		});
		if (ok) {
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
						{onToggle && (
							<td className={styles.td} style={{ width: '40px' }}>
								<Checkbox
									checked={isSelected?.(place.id)}
									onChange={() => onToggle(place.id)}
								/>
							</td>
						)}
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
									<button className={styles.actionButton} type='button'>
										<FaEdit size={16} />
									</button>
								</Link>
								<button
									className={styles.actionButton}
									onClick={() => handleDelete(place.id)}
									disabled={deletePlaceMutation.isPending}
									type='button'
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

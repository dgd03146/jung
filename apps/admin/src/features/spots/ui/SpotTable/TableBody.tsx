import type { Spot } from '@jung/shared/types';
import { Link } from '@tanstack/react-router';
import { type Table, flexRender } from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdStar } from 'react-icons/md';
import { useDeleteSpot } from '../../api/useDeleteSpot';
import { CATEGORY_LABELS } from '../../model/useSpotTable';
import * as styles from './SpotTable.css';
import { CoordinatesCell } from './cells/CoordinatesCell';
import { DateCell } from './cells/DateCell';
import { ImageCell } from './cells/ImageCell';
import { TipsCell } from './cells/TipsCell';

interface TableBodyProps<T> {
	table: Table<T>;
}

export const TableBody = <T,>({ table }: TableBodyProps<T>) => {
	const deleteSpotMutation = useDeleteSpot();

	const handleDelete = (id: string) => {
		if (window.confirm('이 장소를 삭제하시겠습니까?')) {
			deleteSpotMutation.mutate(id);
		}
	};

	return (
		<tbody>
			{table.getRowModel().rows.map((row) => {
				const spot = row.original as Spot;

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
								) : cell.column.id === 'coordinates' ? (
									<CoordinatesCell
										lat={spot.coordinates.lat}
										lng={spot.coordinates.lng}
									/>
								) : cell.column.id === 'created_at' ? (
									<DateCell date={spot.created_at} />
								) : cell.column.id === 'tips' ? (
									<TipsCell tips={spot.tips || []} />
								) : cell.column.id === 'category' ? (
									<span className={styles.categoryBadge}>
										{CATEGORY_LABELS[spot.category]}
									</span>
								) : cell.column.id === 'rating' ? (
									<span className={styles.rating}>
										<MdStar /> {spot.rating.toFixed(1)}
									</span>
								) : (
									flexRender(cell.column.columnDef.cell, cell.getContext())
								)}
							</td>
						))}
						<td className={styles.td}>
							<div style={{ display: 'flex', gap: '8px' }}>
								<Link to={'/spots/edit/$spotId'} params={{ spotId: spot.id }}>
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

import type { Photo } from '@jung/shared/types';
import { Link } from '@tanstack/react-router';
import { type Table, flexRender } from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDeletePhoto } from '../../api';
import * as styles from './PhotoTable.css';
import { DateCell } from './cells/DateCell';
import { ImageCell } from './cells/ImageCell';
import { TagsCell } from './cells/TagsCell';

interface TableBodyProps<T> {
	table: Table<T>;
}

export const TableBody = <T,>({ table }: TableBodyProps<T>) => {
	const deletePhotoMutation = useDeletePhoto();

	const handleDelete = (id: string) => {
		if (window.confirm('Are you sure you want to delete this photo?')) {
			deletePhotoMutation.mutate(id);
		}
	};

	return (
		<tbody>
			{table.getRowModel().rows.map((row) => {
				const photo = row.original as Photo;

				return (
					<tr key={row.id} className={styles.row}>
						{row.getVisibleCells().map((cell) => (
							<td key={cell.id} className={styles.td}>
								{cell.column.id === 'image_url' ? (
									<ImageCell url={photo.image_url} alt={photo.alt} />
								) : cell.column.id === 'tags' ? (
									<TagsCell tags={photo.tags} />
								) : cell.column.id === 'created_at' ? (
									<DateCell date={photo.created_at} />
								) : (
									flexRender(cell.column.columnDef.cell, cell.getContext())
								)}
							</td>
						))}
						<td className={styles.td}>
							<div style={{ display: 'flex', gap: '8px' }}>
								<Link
									to='/gallery/photos/$photoId/edit'
									params={{ photoId: photo.id }}
									className={styles.actionButton}
								>
									<FaEdit size={16} />
								</Link>

								<button
									className={styles.actionButton}
									onClick={() => handleDelete(photo.id)}
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

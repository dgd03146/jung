import { Checkbox } from '@jung/design-system/components';
import type { Photo } from '@jung/shared/types';
import { Link } from '@tanstack/react-router';
import { flexRender, type Table } from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useConfirmDialog } from '@/fsd/shared';
import { useDeletePhoto } from '../../api';
import { DateCell } from './cells/DateCell';
import { ImageCell } from './cells/ImageCell';
import { TagsCell } from './cells/TagsCell';
import * as styles from './PhotoTable.css';

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
	const deletePhotoMutation = useDeletePhoto();
	const { confirm } = useConfirmDialog();

	const handleDelete = async (id: string) => {
		const ok = await confirm({
			title: 'Delete Photo',
			description:
				'Are you sure you want to delete this photo? This action cannot be undone.',
			confirmText: 'Delete',
			variant: 'destructive',
		});
		if (ok) {
			deletePhotoMutation.mutate(id);
		}
	};

	return (
		<tbody>
			{table.getRowModel().rows.map((row) => {
				const photo = row.original as Photo;

				return (
					<tr key={row.id} className={styles.row}>
						{onToggle && (
							<td className={styles.td} style={{ width: '40px' }}>
								<Checkbox
									checked={isSelected?.(photo.id)}
									onChange={() => onToggle(photo.id)}
								/>
							</td>
						)}
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
									disabled={deletePhotoMutation.isPending}
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

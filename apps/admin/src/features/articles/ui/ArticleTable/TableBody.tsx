import { Button, Checkbox, Flex } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { type Cell, flexRender, type Table } from '@tanstack/react-table';
import { FaEdit, FaExternalLinkAlt, FaTrash } from 'react-icons/fa';
import { useConfirmDialog } from '@/fsd/shared';
import { useDeleteArticle } from '../../api';
import type { Article } from '../../types';
import * as styles from './Table.css';

interface TableBodyProps {
	table: Table<Article>;
	isSelected?: (id: string) => boolean;
	onToggle?: (id: string) => void;
}

export const TableBody = ({ table, isSelected, onToggle }: TableBodyProps) => {
	const deleteArticleMutation = useDeleteArticle();
	const { confirm } = useConfirmDialog();

	const handleDelete = async (id: string) => {
		const ok = await confirm({
			title: 'Delete Article',
			description:
				'Are you sure you want to delete this article? This action cannot be undone.',
			confirmText: 'Delete',
			variant: 'destructive',
		});
		if (ok) {
			deleteArticleMutation.mutate(id);
		}
	};

	const formatDate = (dateString: string | null) => {
		if (!dateString) return '-';
		return new Date(dateString).toLocaleDateString('ko-KR');
	};

	const renderCell = (cell: Cell<Article, unknown>, article: Article) => {
		switch (cell.column.id) {
			case 'category':
				return (
					<span
						className={
							article.category === 'frontend'
								? styles.frontendBadge
								: styles.aiBadge
						}
					>
						{article.category}
					</span>
				);
			case 'status':
				return (
					<span
						className={
							article.status === 'published'
								? styles.publishedBadge
								: styles.draftBadge
						}
					>
						{article.status}
					</span>
				);
			case 'published_at':
			case 'created_at':
				return formatDate(cell.getValue() as string | null);
			default:
				return flexRender(cell.column.columnDef.cell, cell.getContext());
		}
	};

	return (
		<tbody>
			{table.getRowModel().rows.map((row) => {
				const article = row.original;

				return (
					<tr key={row.id} className={styles.row}>
						{onToggle && (
							<td className={styles.td} style={{ width: '40px' }}>
								<Checkbox
									checked={isSelected?.(article.id)}
									onChange={() => onToggle(article.id)}
								/>
							</td>
						)}
						{row.getVisibleCells().map((cell) => (
							<td key={cell.id} className={styles.td}>
								{renderCell(cell, article)}
							</td>
						))}
						<td className={styles.td}>
							<Flex gap='2'>
								<a
									href={article.original_url}
									target='_blank'
									rel='noopener noreferrer'
								>
									<Button variant='ghost'>
										<FaExternalLinkAlt size={14} />
									</Button>
								</a>
								<Link
									to='/articles/edit/$articleId'
									params={{ articleId: article.id }}
								>
									<Button variant='ghost'>
										<FaEdit size={16} />
									</Button>
								</Link>
								<Button
									variant='ghost'
									onClick={() => handleDelete(article.id)}
									disabled={deleteArticleMutation.isPending}
								>
									<FaTrash size={16} />
								</Button>
							</Flex>
						</td>
					</tr>
				);
			})}
		</tbody>
	);
};

import { Button, Flex } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { flexRender, type Table } from '@tanstack/react-table';
import { FaEdit, FaExternalLinkAlt, FaTrash } from 'react-icons/fa';
import { useDeleteArticle } from '../../api';
import type { Article } from '../../types';
import * as styles from './Table.css';

interface TableBodyProps {
	table: Table<Article>;
}

export const TableBody = ({ table }: TableBodyProps) => {
	const deleteArticleMutation = useDeleteArticle();

	const handleDelete = (id: string) => {
		if (window.confirm('Are you sure you want to delete this article?')) {
			deleteArticleMutation.mutate(id);
		}
	};

	const formatDate = (dateString: string | null) => {
		if (!dateString) return '-';
		return new Date(dateString).toLocaleDateString('ko-KR');
	};

	return (
		<tbody>
			{table.getRowModel().rows.map((row) => {
				const article = row.original;

				return (
					<tr key={row.id} className={styles.row}>
						{row.getVisibleCells().map((cell) => (
							<td key={cell.id} className={styles.td}>
								{cell.column.id === 'category' ? (
									<span
										className={
											article.category === 'frontend'
												? styles.frontendBadge
												: styles.aiBadge
										}
									>
										{article.category}
									</span>
								) : cell.column.id === 'published_at' ||
									cell.column.id === 'created_at' ? (
									formatDate(cell.getValue() as string | null)
								) : (
									flexRender(cell.column.columnDef.cell, cell.getContext())
								)}
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

import { Button, Flex } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { flexRender, type Table } from '@tanstack/react-table';
import {
	FaEdit,
	FaExternalLinkAlt,
	FaPaperPlane,
	FaTrash,
} from 'react-icons/fa';
import { useConfirmDialog } from '@/fsd/shared';
import { useDeleteArticle, useSendNewsletter } from '../../api';
import type { Article } from '../../types';
import * as styles from './Table.css';

interface TableBodyProps {
	table: Table<Article>;
}

export const TableBody = ({ table }: TableBodyProps) => {
	const deleteArticleMutation = useDeleteArticle();
	const sendNewsletterMutation = useSendNewsletter();
	const { confirm } = useConfirmDialog();

	const handleDelete = (id: string) => {
		if (window.confirm('Are you sure you want to delete this article?')) {
			deleteArticleMutation.mutate(id);
		}
	};

	const handleSendNewsletter = async (articleId: string) => {
		const ok = await confirm({
			title: 'Send Newsletter',
			description:
				'This will send the newsletter to all active subscribers matching this category. Continue?',
			confirmText: 'Send',
		});
		if (ok) {
			sendNewsletterMutation.mutate({ articleId });
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
				const isSent = !!(
					article as Article & { newsletter_sent_at?: string | null }
				).newsletter_sent_at;
				const canSend = !!article.published_at;

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
								) : cell.column.id === 'status' ? (
									<span
										className={
											article.status === 'published'
												? styles.publishedBadge
												: styles.draftBadge
										}
									>
										{article.status}
									</span>
								) : cell.column.id === 'published_at' ||
									cell.column.id === 'created_at' ||
									cell.column.id === 'newsletter_sent_at' ? (
									formatDate(cell.getValue() as string | null)
								) : (
									flexRender(cell.column.columnDef.cell, cell.getContext())
								)}
							</td>
						))}
						<td className={styles.td}>
							<Flex gap='2'>
								<Button
									variant='ghost'
									onClick={() => handleSendNewsletter(article.id)}
									disabled={!canSend || sendNewsletterMutation.isPending}
									title={
										isSent
											? 'Newsletter already sent'
											: canSend
												? 'Send newsletter'
												: 'Publish article first'
									}
								>
									<FaPaperPlane
										size={14}
										color={isSent ? '#059669' : undefined}
									/>
								</Button>
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

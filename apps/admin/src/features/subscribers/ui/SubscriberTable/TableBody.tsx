import { Button, Typography } from '@jung/design-system/components';
import type { Table } from '@tanstack/react-table';
import type { Subscriber } from '@/fsd/entities/subscriber';
import { DateCell } from '@/fsd/shared/ui';
import { useToggleSubscriber } from '../../api/useToggleSubscriber';
import * as styles from './Table.css';

interface TableBodyProps {
	table: Table<Subscriber>;
}

const CategoryBadge = ({ category }: { category: string }) => {
	const colorMap: Record<string, string> = {
		frontend: '#3B82F6',
		ai: '#8B5CF6',
		both: '#10B981',
	};

	return (
		<Typography.Text
			level={3}
			style={{
				color: colorMap[category] ?? '#6B7280',
				fontWeight: 500,
			}}
		>
			{category}
		</Typography.Text>
	);
};

const StatusBadge = ({ isActive }: { isActive: boolean }) => (
	<Typography.Text
		level={3}
		style={{
			color: isActive ? '#10B981' : '#EF4444',
			fontWeight: 500,
		}}
	>
		{isActive ? 'Active' : 'Inactive'}
	</Typography.Text>
);

export const TableBody = ({ table }: TableBodyProps) => {
	const toggleMutation = useToggleSubscriber();

	return (
		<tbody>
			{table.getRowModel().rows.map((row) => {
				const subscriber = row.original;

				return (
					<tr key={row.id} className={styles.row}>
						<td className={styles.td}>
							<Typography.Text level={3}>{subscriber.email}</Typography.Text>
						</td>
						<td className={styles.td}>
							<CategoryBadge category={subscriber.category} />
						</td>
						<td className={styles.td}>
							<StatusBadge isActive={subscriber.is_active} />
						</td>
						<td className={styles.td}>
							<DateCell date={subscriber.created_at} />
						</td>
						<td className={styles.td}>
							<Button
								variant={subscriber.is_active ? 'outline' : 'primary'}
								size='sm'
								borderRadius='md'
								onClick={() =>
									toggleMutation.mutate({
										id: subscriber.id,
										is_active: !subscriber.is_active,
									})
								}
								disabled={toggleMutation.isPending}
							>
								{subscriber.is_active ? 'Deactivate' : 'Activate'}
							</Button>
						</td>
					</tr>
				);
			})}
		</tbody>
	);
};

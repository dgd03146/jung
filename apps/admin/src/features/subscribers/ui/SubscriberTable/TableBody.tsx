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
	const variant =
		category in styles.categoryBadge
			? (category as keyof typeof styles.categoryBadge)
			: 'default';

	return (
		<Typography.Text level={3} className={styles.categoryBadge[variant]}>
			{category}
		</Typography.Text>
	);
};

const StatusBadge = ({ isActive }: { isActive: boolean }) => (
	<Typography.Text
		level={3}
		className={styles.statusBadge[isActive ? 'active' : 'inactive']}
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
				const isToggling =
					toggleMutation.isPending &&
					toggleMutation.variables?.id === subscriber.id;

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
								disabled={isToggling}
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

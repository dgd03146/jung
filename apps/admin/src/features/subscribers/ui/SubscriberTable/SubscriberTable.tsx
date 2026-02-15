import { Container } from '@jung/design-system/components';
import { useSubscriberTable } from '@/fsd/features/subscribers/model';
import TableAction from './TableAction';
import { TableContent } from './TableContent';

const SubscriberTable = () => {
	const { table, totalCount, isLoading, error, refetch } = useSubscriberTable();

	return (
		<Container marginTop='1'>
			<TableAction totalCount={totalCount} />
			<TableContent
				table={table}
				isLoading={isLoading}
				error={error}
				refetch={refetch}
			/>
		</Container>
	);
};

export default SubscriberTable;

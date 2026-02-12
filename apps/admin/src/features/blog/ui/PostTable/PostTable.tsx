import { Container } from '@jung/design-system/components';
import { usePostTable } from '@/fsd/features/blog/model';
import TableAction from './TableAction';
import { TableContent } from './TableContent';

const PostTable = () => {
	const { table, totalCount, isLoading, error, refetch } = usePostTable();

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

export default PostTable;

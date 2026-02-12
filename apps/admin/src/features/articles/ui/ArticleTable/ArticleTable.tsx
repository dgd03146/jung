import { Container } from '@jung/design-system/components';
import { useArticleTable } from '../../model';
import TableAction from './TableAction';
import { TableContent } from './TableContent';

const ArticleTable = () => {
	const { table, totalCount, isLoading, error, refetch } = useArticleTable();

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

export default ArticleTable;

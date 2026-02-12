import { Container } from '@jung/design-system/components';
import { useArticleTable } from '../../model';
import TableAction from './TableAction';
import { TableContent } from './TableContent';

const ArticleTable = () => {
	const { totalCount } = useArticleTable();

	return (
		<Container marginTop='1'>
			<TableAction totalCount={totalCount} />
			<TableContent />
		</Container>
	);
};

export default ArticleTable;

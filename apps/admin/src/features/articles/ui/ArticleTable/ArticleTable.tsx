import { Container } from '@jung/design-system/components';
import TableAction from './TableAction';
import { TableContent } from './TableContent';

const ArticleTable = () => {
	return (
		<Container marginTop='1'>
			<TableAction />
			<TableContent />
		</Container>
	);
};

export default ArticleTable;

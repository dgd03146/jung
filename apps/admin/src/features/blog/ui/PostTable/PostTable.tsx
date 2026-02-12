import { Container } from '@jung/design-system/components';
import { usePostTable } from '@/fsd/features/blog/model';
import TableAction from './TableAction';
import { TableContent } from './TableContent';

const PostTable = () => {
	const { totalCount } = usePostTable();

	return (
		<Container marginTop='1'>
			<TableAction totalCount={totalCount} />
			<TableContent />
		</Container>
	);
};

export default PostTable;

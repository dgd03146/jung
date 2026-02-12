import { Container } from '@jung/design-system/components';
import { usePlaceTable } from '../../model/usePlaceTable';
import { TableAction } from './TableAction';
import { TableContent } from './TableContent';

const PlaceTable = () => {
	const { totalCount } = usePlaceTable();

	return (
		<Container marginTop='1'>
			<TableAction totalCount={totalCount} />
			<TableContent />
		</Container>
	);
};

export default PlaceTable;

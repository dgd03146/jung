import { Container } from '@jung/design-system/components';
import { usePhotoTable } from '@/fsd/features/gallery/model';
import { TableAction } from './TableAction';
import { TableContent } from './TableContent';

const PhotoTable = () => {
	const { totalCount } = usePhotoTable();

	return (
		<Container marginTop='1'>
			<TableAction totalCount={totalCount} />
			<TableContent />
		</Container>
	);
};

export default PhotoTable;

import { Flex } from '@jung/design-system/components';
import { PhotoTable } from '@/fsd/features/gallery';

export default function GalleryPage() {
	return (
		<Flex direction='column' gap='4'>
			<PhotoTable />
		</Flex>
	);
}

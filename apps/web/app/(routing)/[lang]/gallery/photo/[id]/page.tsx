import { PhotoDetail } from '@/fsd/features/gallery/photos';
import { Container } from '@jung/design-system/components';

export default function PhotoPage({ params }: { params: { id: string } }) {
	return (
		<Container>
			<PhotoDetail id={params.id} />
		</Container>
	);
}

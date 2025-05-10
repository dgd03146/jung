import { Modal } from '@/fsd/shared';
import { PhotoDetailPage } from '@/fsd/views/gallery';

export default function PhotoModal({ params }: { params: { id: string } }) {
	return (
		<Modal>
			<PhotoDetailPage photoId={params.id} isModal />
		</Modal>
	);
}

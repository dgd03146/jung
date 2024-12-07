import { PhotoDetail } from '@/fsd/features/gallery/photos';
import { Modal } from '@/fsd/shared';

export default function PhotoModal({ params }: { params: { id: string } }) {
	return (
		<Modal>
			<PhotoDetail id={params.id} isModal />
		</Modal>
	);
}

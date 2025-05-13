import { Modal } from '@/fsd/shared';
import { PhotoDetailPage, PhotoDetailSkeleton } from '@/fsd/views/gallery';

import { Suspense } from 'react';

export default function PhotoModal({ params }: { params: { id: string } }) {
	return (
		<Modal>
			<Suspense fallback={<PhotoDetailSkeleton isModal />}>
				<PhotoDetailPage photoId={params.id} isModal />
			</Suspense>
		</Modal>
	);
}

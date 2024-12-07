import {
	PhotoDetail,
	PhotoDetailSkeleton,
} from '@/fsd/features/gallery/photos';
import { HydrateClient, trpc } from '@/fsd/shared/index.server';
import { Suspense } from 'react';

export default function PhotoPage({ params }: { params: { id: string } }) {
	const photoId = params.id;

	void trpc.photos.getPhotoById.prefetch(photoId);

	return (
		<HydrateClient>
			<Suspense fallback={<PhotoDetailSkeleton />}>
				<PhotoDetail id={params.id} isModal={false} />
			</Suspense>
		</HydrateClient>
	);
}

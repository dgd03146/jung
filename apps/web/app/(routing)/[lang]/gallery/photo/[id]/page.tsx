import { PhotoDetail } from '@/fsd/features/gallery/photos';
import { HydrateClient, trpc } from '@/fsd/shared/index.server';
import { Suspense } from 'react';

export default function PhotoPage({ params }: { params: { id: string } }) {
	const photoId = params.id;

	void trpc.photos.getPhotoById.prefetch(photoId);

	return (
		<HydrateClient>
			<Suspense fallback={<div>loading...</div>}>
				<PhotoDetail id={params.id} />
			</Suspense>
		</HydrateClient>
	);
}

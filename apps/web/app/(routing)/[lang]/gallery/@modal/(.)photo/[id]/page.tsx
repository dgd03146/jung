import { Modal } from '@/fsd/shared';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';
import { PhotoDetailPage, PhotoDetailSkeleton } from '@/fsd/views/gallery';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';

export default async function PhotoModal({
	params,
}: { params: { id: string } }) {
	const queryClient = getQueryClient();
	const photoId = params.id;

	queryClient.prefetchQuery(trpc.photos.getPhotoById.queryOptions(photoId));

	return (
		<Modal useRouterBack>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<Suspense fallback={<PhotoDetailSkeleton isModal />}>
					<PhotoDetailPage photoId={photoId} isModal />
				</Suspense>
			</HydrationBoundary>
		</Modal>
	);
}

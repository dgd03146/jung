import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Modal } from '@/fsd/shared';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';
import { PhotoDetailPage, PhotoDetailSkeleton } from '@/fsd/views/gallery';

export default async function PhotoModal({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id: photoId } = await params;
	const queryClient = getQueryClient();

	queryClient.prefetchQuery(trpc.gallery.getPhotoById.queryOptions(photoId));

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

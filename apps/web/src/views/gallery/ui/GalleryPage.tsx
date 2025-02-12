'use client';

import {
	PhotoList,
	transformPhoto,
	usePhotosQuery,
} from '@/fsd/entities/photo';
import {
	LoadingSpinner,
	useInfiniteScroll,
	useSearchParamsState,
} from '@/fsd/shared';
import { Flex } from '@jung/design-system/components';
import { Suspense } from 'react';

export const GalleryContent = () => {
	const { sort, q } = useSearchParamsState({
		defaults: {
			sort: 'latest',
			q: '',
		} as const,
	});

	const [data, query] = usePhotosQuery({
		sort,
		q,
	});

	const { fetchNextPage, hasNextPage, isFetchingNextPage } = query;
	const photos = data.pages.flatMap((page) => page.items) ?? [];
	const formattedPhotos = photos.map((photo) => transformPhoto(photo));

	const { ref } = useInfiniteScroll({
		fetchNextPage,
		hasNextPage,
	});

	return (
		<>
			<PhotoList photos={formattedPhotos} />
			<Flex justify='center' align='center' minHeight='10' ref={ref}>
				{isFetchingNextPage && <LoadingSpinner size='small' />}
			</Flex>
		</>
	);
};

export const GalleryPage = () => {
	return (
		<Suspense
			fallback={
				<Flex justify='center' align='center' height='1/4'>
					<LoadingSpinner size='medium' />
				</Flex>
			}
		>
			<GalleryContent />
		</Suspense>
	);
};

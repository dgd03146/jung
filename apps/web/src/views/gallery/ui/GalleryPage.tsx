'use client';

import {
	PhotoList,
	transformPhoto,
	usePhotosQuery,
} from '@/fsd/entities/photo';
import { LoadingSpinner, useInfiniteScroll } from '@/fsd/shared';
import { Flex } from '@jung/design-system/components';
import type { PhotoQueryParams } from '@jung/shared/types';
import { Suspense } from 'react';

export const GalleryContent = ({ sort, q }: PhotoQueryParams) => {
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

export const GalleryPage = ({ sort, q }: PhotoQueryParams) => {
	return (
		<Suspense
			fallback={
				<Flex justify='center' align='center' height='1/4'>
					<LoadingSpinner size='medium' />
				</Flex>
			}
		>
			<GalleryContent sort={sort} q={q} />
		</Suspense>
	);
};

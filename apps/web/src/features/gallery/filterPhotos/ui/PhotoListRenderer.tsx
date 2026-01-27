'use client';

import { Flex } from '@jung/design-system/components';
import type { PhotoQueryParams } from '@jung/shared/types';
import {
	PhotoCard,
	PhotoList,
	transformPhoto,
	usePhotosQuery,
} from '@/fsd/entities/gallery';
import { EmptyState, LoadingSpinner, useInfiniteScroll } from '@/fsd/shared';

export const PhotoListRenderer = ({ sort, q }: PhotoQueryParams) => {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		usePhotosQuery({ sort, q });

	const photos = data.pages.flatMap((page) => page.items) ?? [];
	const formattedPhotos = photos.map((photo) => transformPhoto(photo));

	const { ref } = useInfiniteScroll({
		fetchNextPage,
		hasNextPage,
	});

	if (photos.length === 0) {
		return <EmptyState type='gallery' />;
	}

	return (
		<>
			<PhotoList
				photos={formattedPhotos}
				renderPhoto={{
					image: (props, context) => {
						return <PhotoCard imageProps={props} contextProps={context} />;
					},
				}}
			/>
			<Flex justify='center' align='center' minHeight='10' ref={ref}>
				{isFetchingNextPage && <LoadingSpinner size='small' />}
			</Flex>
		</>
	);
};

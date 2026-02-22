'use client';

import { Flex } from '@jung/design-system/components';
import type { PhotoQueryParams } from '@jung/shared/types';
import { useRef } from 'react';
import {
	ExhibitionPhotoList,
	ExhibitionPhotoSection,
	usePhotosQuery,
} from '@/fsd/entities/gallery';
import { EmptyState, LoadingSpinner, useInfiniteScroll } from '@/fsd/shared';

export const PhotoListRenderer = ({ sort, q }: PhotoQueryParams) => {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		usePhotosQuery({ sort, q });

	const photos = data.pages.flatMap((page) => page.items) ?? [];

	const initialCount = useRef(0);
	if (initialCount.current === 0 && photos.length > 0) {
		initialCount.current = photos.length;
	}
	const totalCount = initialCount.current || photos.length;

	const { ref } = useInfiniteScroll({
		fetchNextPage,
		hasNextPage,
	});

	if (photos.length === 0) {
		return <EmptyState type='gallery' />;
	}

	return (
		<>
			<ExhibitionPhotoList>
				{photos.map((photo, index) => (
					<ExhibitionPhotoSection
						key={photo.id}
						photo={photo}
						index={index}
						totalCount={totalCount}
					/>
				))}
			</ExhibitionPhotoList>
			<Flex justify='center' align='center' minHeight='10' ref={ref}>
				{isFetchingNextPage && <LoadingSpinner size='small' />}
			</Flex>
		</>
	);
};

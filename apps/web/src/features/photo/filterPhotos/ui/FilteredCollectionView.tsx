'use client';

import {
	PHOTO_DEFAULTS,
	PhotoCard,
	PhotoList,
	transformPhoto,
	usePhotosQuery,
} from '@/fsd/entities/photo';
import {
	EmptyState,
	LoadingSpinner,
	useInfiniteScroll,
	useSearchParamsState,
} from '@/fsd/shared';
import { Flex } from '@jung/design-system/components';
import { useEffect } from 'react';
import { usePhotoFilter } from '../model/PhotoFilterContext';

interface FilteredCollectionViewProps {
	collectionId: string;
}

export const FilteredCollectionView = ({
	collectionId,
}: FilteredCollectionViewProps) => {
	const { setCollectionId } = usePhotoFilter();

	useEffect(() => {
		setCollectionId(collectionId);
	}, [collectionId, setCollectionId]);

	const { q, sort } = useSearchParamsState({
		defaults: {
			sort: PHOTO_DEFAULTS.SORT,
			q: PHOTO_DEFAULTS.QUERY,
		} as const,
	});

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		usePhotosQuery({
			sort,
			q,
		});

	const photos = data.pages.flatMap((page) => page.items) ?? [];

	if (photos.length === 0) {
		return <EmptyState content='photos' />;
	}

	const formattedPhotos = photos.map((photo) => transformPhoto(photo));

	const { ref } = useInfiniteScroll({
		fetchNextPage,
		hasNextPage,
	});

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

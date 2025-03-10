'use client';

import {
	PhotoCard,
	PhotoList,
	transformPhoto,
	usePhotosQuery,
} from '@/fsd/entities/photo';
import {
	EmptyState,
	LoadingSpinner,
	type Sort,
	useInfiniteScroll,
	useSearchParamsState,
} from '@/fsd/shared';
import { Flex } from '@jung/design-system/components';
import { Suspense } from 'react';
import { useGalleryRouteSync } from '../model/useGalleryRouteSync';

export const GalleryContent = ({ sort }: { sort: Sort }) => {
	useGalleryRouteSync();

	const { q } = useSearchParamsState({
		defaults: {
			sort,
			q: '',
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
					image: (props, context) => (
						<PhotoCard imageProps={props} contextProps={context} />
					),
				}}
			/>
			<Flex justify='center' align='center' minHeight='10' ref={ref}>
				{isFetchingNextPage && <LoadingSpinner size='small' />}
			</Flex>
		</>
	);
};

export const GalleryPage = ({ sort }: { sort: Sort }) => {
	return (
		<Suspense
			fallback={
				<Flex justify='center' align='center' height='1/4'>
					<LoadingSpinner size='medium' />
				</Flex>
			}
		>
			<GalleryContent sort={sort} />
		</Suspense>
	);
};

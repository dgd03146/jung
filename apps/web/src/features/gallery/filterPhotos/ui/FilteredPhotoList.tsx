'use client';

import { Flex } from '@jung/design-system/components';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import {
	PHOTO_DEFAULTS,
	PhotoCard,
	PhotoList,
	TRENDING_PHOTO_DEFAULTS,
	transformPhoto,
	usePhotosQuery,
} from '@/fsd/entities/gallery';
import {
	EmptyState,
	LoadingSpinner,
	useInfiniteScroll,
	useSearchParamsState,
} from '@/fsd/shared';
import { usePhotoFilter } from '../model/PhotoFilterContext';

interface FilteredPhotoListProps {
	isTrending?: boolean;
}

export const FilteredPhotoList = ({ isTrending }: FilteredPhotoListProps) => {
	const pathname = usePathname();
	const { setSort, setCollectionId } = usePhotoFilter();

	useEffect(() => {
		const isModalActive = /\/gallery\/photo\/\d+/.test(pathname);
		if (!isModalActive) {
			const isTrending = pathname.includes('/trending');
			if (isTrending) {
				setSort('popular');
			} else {
				setSort('latest');
			}

			const collectionMatch = pathname.match(/\/collections\/([^/]+)/);
			setCollectionId(collectionMatch ? collectionMatch[1] : undefined);
		}
	}, [pathname, setSort, setCollectionId]);

	const { q, sort } = useSearchParamsState({
		defaults: {
			sort: isTrending ? TRENDING_PHOTO_DEFAULTS.SORT : PHOTO_DEFAULTS.SORT,
			q: PHOTO_DEFAULTS.QUERY,
		} as const,
	});

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		usePhotosQuery({
			sort,
			q,
		});

	const photos = data.pages.flatMap((page) => page.items) ?? [];
	const formattedPhotos = photos.map((photo) => transformPhoto(photo));

	const { ref } = useInfiniteScroll({
		fetchNextPage,
		hasNextPage,
	});

	if (photos.length === 0) {
		return <EmptyState content='photos' />;
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

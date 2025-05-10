'use client';

import {
	PHOTO_DEFAULTS,
	PhotoCard,
	PhotoList,
	TRENDING_PHOTO_DEFAULTS,
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
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { usePhotoFilter } from '../model/PhotoFilterContext';

export const GalleryContent = ({ isTrending }: { isTrending?: boolean }) => {
	const pathname = usePathname();
	const { setSort, setCollectionId } = usePhotoFilter();

	useEffect(() => {
		// 인터셉팅 라우트 감지
		const isPhotoIntercepting = /\/gallery\/photo\/\d+/.test(pathname);

		if (!isPhotoIntercepting) {
			const isTrending = pathname.includes('/trending');
			if (isTrending) {
				setSort('popular');
			} else {
				setSort('latest');
			}

			const collectionMatch = pathname.match(/\/collections\/([^\/]+)/);
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

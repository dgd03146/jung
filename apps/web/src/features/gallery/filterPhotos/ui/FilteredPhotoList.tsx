'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import {
	PHOTO_DEFAULTS,
	TRENDING_PHOTO_DEFAULTS,
} from '@/fsd/entities/gallery';
import { useSearchParamsState } from '@/fsd/shared';
import { usePhotoFilter } from '../model/PhotoFilterContext';
import { PhotoListRenderer } from './PhotoListRenderer';

const PHOTO_MODAL_PATTERN = /\/gallery\/photo\/\d+/;
const COLLECTION_PATH_PATTERN = /\/collections\/([^/]+)/;

const DEFAULT_SEARCH_PARAMS = {
	sort: PHOTO_DEFAULTS.SORT,
	q: PHOTO_DEFAULTS.QUERY,
} as const;

const TRENDING_SEARCH_PARAMS = {
	sort: TRENDING_PHOTO_DEFAULTS.SORT,
	q: PHOTO_DEFAULTS.QUERY,
} as const;

interface FilteredPhotoListProps {
	isTrending?: boolean;
}

export const FilteredPhotoList = ({ isTrending }: FilteredPhotoListProps) => {
	const pathname = usePathname();
	const { setSort, setCollectionId } = usePhotoFilter();

	useEffect(() => {
		const isModalActive = PHOTO_MODAL_PATTERN.test(pathname);
		if (!isModalActive) {
			const isTrendingPath = pathname.includes('/trending');
			setSort(isTrendingPath ? 'popular' : 'latest');

			const collectionMatch = pathname.match(COLLECTION_PATH_PATTERN);
			setCollectionId(collectionMatch ? collectionMatch[1] : undefined);
		}
	}, [pathname, setSort, setCollectionId]);

	const searchParamsDefaults = isTrending
		? TRENDING_SEARCH_PARAMS
		: DEFAULT_SEARCH_PARAMS;

	const { q, sort } = useSearchParamsState({
		defaults: searchParamsDefaults,
	});

	return <PhotoListRenderer sort={sort} q={q} />;
};

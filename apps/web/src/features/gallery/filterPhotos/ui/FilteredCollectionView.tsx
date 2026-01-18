'use client';

import { useEffect } from 'react';
import { PHOTO_DEFAULTS } from '@/fsd/entities/gallery';
import { useSearchParamsState } from '@/fsd/shared';
import { usePhotoFilter } from '../model/PhotoFilterContext';
import { PhotoListRenderer } from './PhotoListRenderer';

const SEARCH_PARAMS_DEFAULTS = {
	sort: PHOTO_DEFAULTS.SORT,
	q: PHOTO_DEFAULTS.QUERY,
} as const;

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
		defaults: SEARCH_PARAMS_DEFAULTS,
	});

	return <PhotoListRenderer sort={sort} q={q} />;
};

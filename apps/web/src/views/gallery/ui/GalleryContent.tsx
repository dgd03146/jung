'use client';

import { FilteredPhotoList } from '@/fsd/features/photo/filterPhotos';

export const GalleryContent = ({ isTrending }: { isTrending?: boolean }) => {
	return <FilteredPhotoList isTrending={isTrending} />;
};

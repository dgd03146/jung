'use client';

import { FilteredPhotoList } from '@/fsd/features/gallery/filterPhotos';

export const GalleryContent = ({ isTrending }: { isTrending?: boolean }) => {
	return <FilteredPhotoList isTrending={isTrending} />;
};

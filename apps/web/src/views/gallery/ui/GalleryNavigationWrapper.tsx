'use client';

import { usePathname } from 'next/navigation';
import { PhotoNavigation } from '@/fsd/features/gallery';

export const GalleryNavigationWrapper = () => {
	const pathname = usePathname();
	const isDetailPage =
		pathname.includes('/photo/') || pathname.includes('/collections/');

	if (isDetailPage) return null;

	return <PhotoNavigation />;
};

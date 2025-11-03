'use client';

import { PhotoNavigation } from '@/fsd/features/gallery';
import { usePathname } from 'next/navigation';

export const GalleryNavigationWrapper = () => {
	const pathname = usePathname();
	const isDetailPage =
		pathname.includes('/photo/') || pathname.includes('/collections/');

	if (isDetailPage) return null;

	return <PhotoNavigation />;
};

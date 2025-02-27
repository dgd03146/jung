import { usePhotoFilterStore } from '@/fsd/entities/photo';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function useGalleryRouteSync() {
	const pathname = usePathname();
	const { setSort, setCollectionId } = usePhotoFilterStore();

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
}

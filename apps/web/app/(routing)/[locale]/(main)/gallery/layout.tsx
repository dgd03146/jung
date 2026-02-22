import { PhotoFilterProvider } from '@/fsd/features/gallery';
import { GalleryNavigationWrapper } from '@/fsd/views/gallery';

interface GalleryLayoutProps {
	children: React.ReactNode;
}

export default function GalleryLayout({ children }: GalleryLayoutProps) {
	return (
		<>
			<GalleryNavigationWrapper />
			<PhotoFilterProvider>{children}</PhotoFilterProvider>
		</>
	);
}

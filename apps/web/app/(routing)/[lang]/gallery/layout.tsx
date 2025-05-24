import { PhotoFilterProvider } from '@/fsd/features/photo';
import { GalleryNavigationWrapper } from '@/fsd/views/gallery';

interface GalleryLayoutProps {
	children: React.ReactNode;
	modal: React.ReactNode;
}

export default function GalleryLayout({ children, modal }: GalleryLayoutProps) {
	return (
		<>
			<GalleryNavigationWrapper />
			<PhotoFilterProvider>
				{children}
				{modal}
			</PhotoFilterProvider>
		</>
	);
}

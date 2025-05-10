import {
	GalleryNavigationWrapper,
	PhotoFilterProvider,
} from '@/fsd/views/gallery';

interface GalleryLayoutProps {
	children: React.ReactNode;
	modal: React.ReactNode;
}

export default function GalleryLayout({ children, modal }: GalleryLayoutProps) {
	return (
		<>
			<GalleryNavigationWrapper />
			<PhotoFilterProvider>{children}</PhotoFilterProvider>
			{modal}
		</>
	);
}

import { GalleryNavigationWrapper } from '@/fsd/views/gallery';

interface GalleryLayoutProps {
	children: React.ReactNode;
	modal: React.ReactNode;
}

export default function GalleryLayout({ children, modal }: GalleryLayoutProps) {
	return (
		<>
			<GalleryNavigationWrapper />
			{children}
			{modal}
		</>
	);
}

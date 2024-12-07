interface GalleryLayoutProps {
	children: React.ReactNode;
	modal: React.ReactNode;
}

export default function GalleryLayout({ children, modal }: GalleryLayoutProps) {
	return (
		<>
			{children}
			{modal}
		</>
	);
}

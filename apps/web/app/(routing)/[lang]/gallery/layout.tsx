interface GalleryLayoutProps {
	children: React.ReactNode;
	modal: React.ReactNode;
}

export default function GalleryLayout({ children, modal }: GalleryLayoutProps) {
	console.log('Layout rendering, modal:', !!modal); // 디버깅용 로그
	return (
		<>
			{children}
			{modal}
		</>
	);
}

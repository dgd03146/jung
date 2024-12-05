import { PhotoNavigation } from '@/fsd/features';

export default function CollectionsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<PhotoNavigation />
			{children}
		</>
	);
}

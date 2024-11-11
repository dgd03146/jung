import { GalleryGrid } from '@/fsd/features/gallery/post';
// import { GalleryCardSkeleton } from '@/fsd/entities/gallery/post';
import { Container } from '@jung/design-system/components';
// import { Suspense } from 'react';

const GalleryPage = () => {
	return (
		<Container>
			{/* <Suspense fallback={<GalleryCardSkeleton count={12} />}> */}
			<GalleryGrid />
			{/* </Suspense> */}
		</Container>
	);
};

export default GalleryPage;

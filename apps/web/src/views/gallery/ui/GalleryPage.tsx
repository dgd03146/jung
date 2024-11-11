import { PhotoGrid } from '@/fsd/features/gallery/photos';

import { Container } from '@jung/design-system/components';
// import { Suspense } from 'react';

const GalleryPage = () => {
	return (
		<Container>
			{/* <Suspense fallback={<GalleryCardSkeleton count={12} />}> */}
			<PhotoGrid />
			{/* </Suspense> */}
		</Container>
	);
};

export default GalleryPage;

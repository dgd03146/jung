import { FeedList } from '@/fsd/features/gallery/feed';

import { Container } from '@jung/design-system/components';
// import { Suspense } from 'react';

const GalleryPage = () => {
	return (
		<Container>
			{/* <Suspense fallback={<GalleryCardSkeleton count={12} />}> */}
			<FeedList />
			{/* </Suspense> */}
		</Container>
	);
};

export default GalleryPage;

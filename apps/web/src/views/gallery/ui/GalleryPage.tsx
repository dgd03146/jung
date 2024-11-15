'use client';

import { PhotoList } from '@/fsd/features/gallery/photos';
import { LoadingSpinner } from '@/fsd/shared';
import {
	Box,
	Container,
	// Typography,
	Tabs,
} from '@jung/design-system/components';
import { Suspense } from 'react';

const GalleryPage = () => {
	return (
		<Container>
			<Tabs defaultValue='all' variant='secondary'>
				<Tabs.List marginBottom='4'>
					<Tabs.Trigger value='all'>Recent</Tabs.Trigger>
					<Tabs.Trigger value='collections'>Collections</Tabs.Trigger>
					<Tabs.Trigger value='favorites'>Favorites</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value='all'>
					<Suspense
						fallback={
							<Box
								display='flex'
								justifyContent='center'
								alignItems='center'
								height='80'
							>
								<LoadingSpinner size='large' />
							</Box>
						}
					>
						<PhotoList />
					</Suspense>
				</Tabs.Content>
				<Tabs.Content value='collections'>
					<Box>Collections Content</Box>
				</Tabs.Content>
				<Tabs.Content value='favorites'>
					<Box>Favorites Content</Box>
				</Tabs.Content>
			</Tabs>
		</Container>
	);
};

export default GalleryPage;

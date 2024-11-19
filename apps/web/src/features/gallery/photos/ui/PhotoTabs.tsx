'use client';

import { PhotoList } from '@/fsd/features/gallery/photos';
import { LoadingSpinner } from '@/fsd/shared';
import { Box, Tabs } from '@jung/design-system/components';
import { Suspense } from 'react';
import { TABS } from '../config/tabs';
import { usePhotoTabs } from '../model/usePhotoTabs';

const PhotoTabs = () => {
	const { currentTab, handleTabChange } = usePhotoTabs();

	return (
		<Tabs
			defaultValue={currentTab}
			variant='secondary'
			onValueChange={handleTabChange}
		>
			<Tabs.List marginBottom='4'>
				{TABS.map(({ value, label }) => (
					<Tabs.Trigger key={value} value={value}>
						{label}
					</Tabs.Trigger>
				))}
			</Tabs.List>

			{TABS.map(({ value }) => (
				<Tabs.Content key={value} value={value}>
					{value === 'recent' ? (
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
					) : (
						<Box>{value.charAt(0).toUpperCase() + value.slice(1)} Content</Box>
					)}
				</Tabs.Content>
			))}
		</Tabs>
	);
};

export default PhotoTabs;

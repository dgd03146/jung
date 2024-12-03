'use client';

import { PhotoList } from '@/fsd/features/gallery/photos';
import { LoadingSpinner } from '@/fsd/shared';
import { Box, Tabs } from '@jung/design-system/components';
import { Suspense } from 'react';
import { TABS } from '../config/tabs';
import { usePhotoTabs } from '../model/usePhotoTabs';
import { CollectionGrid } from './CollectionGrid';

export const MOCK_COLLECTIONS = [
	{
		id: '1',
		title: 'Nature',
		description: 'Capturing the beauty of the natural world',
		coverImage: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
		photoCount: 24,
	},
	{
		id: '2',
		title: 'Urban',
		description: 'City life and architecture',
		coverImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
		photoCount: 18,
	},
	{
		id: '3',
		title: 'Minimal',
		description: 'Less is more',
		coverImage: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85',
		photoCount: 15,
	},
	{
		id: '4',
		title: 'Black & White',
		description: 'Timeless monochrome photography',
		coverImage: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4',
		photoCount: 32,
	},
	{
		id: '5',
		title: 'Portrait',
		description: 'People and emotions',
		coverImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
		photoCount: 21,
	},
	{
		id: '6',
		title: 'Travel',
		description: 'Adventures around the world',
		coverImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',
		photoCount: 28,
	},
	{
		id: '7',
		title: 'Street',
		description: 'Life in the streets',
		coverImage: 'https://images.unsplash.com/photo-1517732306149-e8f829eb588a',
		photoCount: 19,
	},
	{
		id: '8',
		title: 'Abstract',
		description: 'Forms, colors, and patterns',
		coverImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab',
		photoCount: 16,
	},
];

const PhotoTabs = () => {
	const { currentTab, handleTabChange } = usePhotoTabs();

	const renderTabContent = (value: string) => {
		switch (value) {
			case 'recent':
				return (
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
				);
			case 'collections':
				return <CollectionGrid collections={MOCK_COLLECTIONS} />;
			default:
				return (
					<Box>{value.charAt(0).toUpperCase() + value.slice(1)} Content</Box>
				);
		}
	};

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
					{renderTabContent(value)}
				</Tabs.Content>
			))}
		</Tabs>
	);
};

export default PhotoTabs;

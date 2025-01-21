'use client';

import { LoadingSpinner } from '@/fsd/shared';
import { SearchBar } from '@/fsd/shared/ui';
import { Button, Flex } from '@jung/design-system/components';
import type { GetCategoryItem } from '@jung/shared/types';
import { Suspense, useState } from 'react';
import { IoGridOutline, IoMapOutline } from 'react-icons/io5';
import { CategoryFilter } from './CategoryFilter';
import { SpotContent } from './SpotContent';
import SpotListSkeleton from './SpotListSkeleton';

export function SpotList({ categories }: { categories: GetCategoryItem[] }) {
	const [isMapView, setIsMapView] = useState(false);
	const [isListVisible, setIsListVisible] = useState(false);

	return (
		<>
			<Flex gap='3' align='center'>
				<SearchBar />
				<Button
					variant='outline'
					height='10'
					borderRadius='lg'
					onClick={() => {
						setIsMapView(!isMapView);
						setIsListVisible(false);
					}}
				>
					{isMapView ? <IoGridOutline size={20} /> : <IoMapOutline size={20} />}
				</Button>
			</Flex>

			<CategoryFilter categories={categories} />

			<Suspense
				fallback={
					isMapView ? (
						<LoadingSpinner size='large' />
					) : (
						<SpotListSkeleton count={6} />
					)
				}
			>
				<SpotContent
					isListVisible={isListVisible}
					setIsListVisible={setIsListVisible}
					isMapView={isMapView}
				/>
			</Suspense>
		</>
	);
}

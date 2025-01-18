'use client';

import { LoadingSpinner } from '@/fsd/shared';
import { Button, Flex } from '@jung/design-system/components';
import { Suspense, useState } from 'react';
import { IoGridOutline, IoMapOutline } from 'react-icons/io5';
import { SearchBar } from '../../../shared/ui/SearchBar';
import { CategoryFilter } from './CategoryFilter';
import { SpotContent } from './SpotContent';
import SpotListSkeleton from './SpotListSkeleton';

export function SpotList() {
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

			<CategoryFilter />

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

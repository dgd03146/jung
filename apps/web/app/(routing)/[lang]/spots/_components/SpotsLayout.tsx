import { SpotListSkeleton } from '@/fsd/entities/spot';
import {
	FilterSpotCategory,
	FilterSpotCategorySkeleton,
	ToggleSpotViewButton,
} from '@/fsd/features/spot';
import { SearchBar, SearchBarSkeleton } from '@/fsd/shared';
import { SpotsContent } from '@/fsd/views';
import { Flex } from '@jung/design-system/components';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

interface SpotsLayoutProps {
	currentCategory?: string;
	children?: ReactNode;
}

export const SpotsLayout = ({ currentCategory }: SpotsLayoutProps) => {
	return (
		<>
			<Flex gap='3' align='center'>
				<Suspense fallback={<SearchBarSkeleton />}>
					<SearchBar />
				</Suspense>
				<ToggleSpotViewButton />
			</Flex>
			<Suspense fallback={<FilterSpotCategorySkeleton length={6} />}>
				<FilterSpotCategory currentCategory={currentCategory} />
			</Suspense>
			<Suspense fallback={<SpotListSkeleton count={6} />}>
				<SpotsContent />
			</Suspense>
		</>
	);
};

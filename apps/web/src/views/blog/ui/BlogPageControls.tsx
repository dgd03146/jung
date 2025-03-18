'use client';

import { useViewModeStore } from '@/fsd/entities/post';
import { SelectViewMode } from '@/fsd/features/post';
import { SearchBar } from '@/fsd/shared';
import { Flex } from '@jung/design-system/components';

export const BlogPageControls = () => {
	const { viewMode, setViewMode } = useViewModeStore();

	return (
		<Flex align='center' gap={{ mobile: '1', tablet: '2.5' }} marginBottom='2'>
			<SearchBar />
			<SelectViewMode selected={viewMode} onSelect={setViewMode} />
		</Flex>
	);
};

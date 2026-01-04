'use client';

import { Flex } from '@jung/design-system/components';
import { SelectViewMode, useViewMode } from '@/fsd/features/blog';
import { SearchBar } from '@/fsd/shared';

export const BlogPageControls = () => {
	const { viewMode, setViewMode } = useViewMode();

	return (
		<Flex align='center' gap={{ mobile: '1', tablet: '2.5' }} marginBottom='2'>
			<SearchBar />
			<SelectViewMode selected={viewMode} onSelect={setViewMode} />
		</Flex>
	);
};

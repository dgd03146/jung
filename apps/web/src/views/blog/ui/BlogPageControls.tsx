'use client';

import { SelectViewMode, useViewMode } from '@/fsd/features/post';
import { SearchBar } from '@/fsd/shared';
import { Flex } from '@jung/design-system/components';

export const BlogPageControls = () => {
	const { viewMode, setViewMode } = useViewMode();

	return (
		<Flex align='center' gap={{ mobile: '1', tablet: '2.5' }} marginBottom='2'>
			<SearchBar />
			<SelectViewMode selected={viewMode} onSelect={setViewMode} />
		</Flex>
	);
};

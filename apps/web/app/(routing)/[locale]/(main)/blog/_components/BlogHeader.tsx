'use client';

import { Flex } from '@jung/design-system/components';
import { SelectViewMode, useViewMode } from '@/fsd/features/blog';

export const BlogHeader = () => {
	const { viewMode, setViewMode } = useViewMode();
	return (
		<Flex justify='flex-end' marginBottom='2'>
			<SelectViewMode selected={viewMode} onSelect={setViewMode} />
		</Flex>
	);
};

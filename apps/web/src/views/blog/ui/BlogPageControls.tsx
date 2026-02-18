'use client';

import { Flex } from '@jung/design-system/components';
import { SelectViewMode, useViewMode } from '@/fsd/features/blog';

export const BlogPageControls = () => {
	const { viewMode, setViewMode } = useViewMode();

	return (
		<Flex align='center' justify='flex-end' marginBottom='4'>
			<SelectViewMode selected={viewMode} onSelect={setViewMode} />
		</Flex>
	);
};

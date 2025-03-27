'use client';

import { Box, Flex, Typography } from '@jung/design-system/components';
import { MdLocationOff } from 'react-icons/md';

interface EmptyStateProps {
	title?: string;
	description?: string;
}

export function SpotEmptyState({
	title = 'There are no places to display',
	description = 'There are no places to display',
}: EmptyStateProps) {
	return (
		<Flex
			direction='column'
			align='center'
			justify='center'
			gap='6'
			flex={1}
			marginY={{ base: '5', tablet: '10', laptop: '20' }}
		>
			<Box
				padding='6'
				borderRadius='full'
				background='primary50'
				color='primary'
			>
				<MdLocationOff size={36} />
			</Box>

			<Flex direction='column' align='center' gap='6'>
				<Typography.Heading level={4} color='black100'>
					{title}
				</Typography.Heading>

				<Typography.Text level={2} color='primary' fontWeight='medium'>
					{description}
				</Typography.Text>
			</Flex>
		</Flex>
	);
}

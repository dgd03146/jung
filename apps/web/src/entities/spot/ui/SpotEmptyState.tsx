'use client';

import { Box, Flex, Typography } from '@jung/design-system';
import { MdLocationOff } from 'react-icons/md';

interface EmptyStateProps {
	title?: string;
	description?: string;
	actionText?: string;
	actionLink?: string;
}

export function SpotEmptyState({
	title = 'There are no places to display',
	description = 'There are no places to display',
	actionText = 'Search for a different location',
	actionLink = '/spots',
}: EmptyStateProps) {
	return (
		<Flex
			direction='column'
			align='center'
			justify='center'
			gap='6'
			paddingY='16'
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

			{/* <Link href={actionLink}> */}
			{/* <Button variant="primary" size="lg" borderRadius="lg"> */}
			<Typography.Text fontWeight='medium'>{actionText}</Typography.Text>
			{/* </Button>
      </Link> */}
		</Flex>
	);
}

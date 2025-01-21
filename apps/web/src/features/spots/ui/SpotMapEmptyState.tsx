'use client';

import { Box, Button, Flex, Typography } from '@jung/design-system';
import Link from 'next/link';
import { MdLocationOff } from 'react-icons/md';

interface SpotMapEmptyStateProps {
	title?: string;
	description?: string;
	actionText?: string;
	actionLink?: string;
}

export function SpotMapEmptyState({
	title = '표시할 장소가 없습니다',
	description = '현재 지도에 표시할 수 있는 장소가 없습니다',
	actionText = '다른 장소 둘러보기',
	actionLink = '/spots',
}: SpotMapEmptyStateProps) {
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

			<Link href={actionLink}>
				<Button variant='primary' size='lg' borderRadius='lg'>
					<Typography.Text fontWeight='medium'>{actionText}</Typography.Text>
				</Button>
			</Link>
		</Flex>
	);
}

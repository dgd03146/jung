'use client';

import { Box, Flex, Typography } from '@jung/design-system/components';
import { useTranslations } from 'next-intl';
import { MdLocationOff } from 'react-icons/md';

export function PlaceEmptyState() {
	const t = useTranslations('empty');

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
					{t('places')}
				</Typography.Heading>
			</Flex>
		</Flex>
	);
}

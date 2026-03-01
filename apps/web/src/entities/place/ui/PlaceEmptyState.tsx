'use client';

import { Box, Flex, Typography } from '@jung/design-system/components';
import { MdLocationOff } from 'react-icons/md';

const EMPTY_STATE_ICON_SIZE = 24;

export function PlaceEmptyState() {
	return (
		<Flex
			direction='column'
			align='center'
			justify='center'
			gap='4'
			flex={1}
			marginY={{ base: '5', tablet: '8', laptop: '16' }}
		>
			<Box
				padding='4'
				borderRadius='full'
				background='primary50'
				color='primary'
			>
				<MdLocationOff size={EMPTY_STATE_ICON_SIZE} />
			</Box>

			<Typography.SubText level={2} color='black100'>
				No places to display
			</Typography.SubText>
		</Flex>
	);
}

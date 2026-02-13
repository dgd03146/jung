import { Box, Flex, Typography } from '@jung/design-system/components';
import { PlaceTable } from '@/fsd/features/places/ui';

const PLACEHOLDER_TOTAL_PLACES = 42;
const PLACEHOLDER_CATEGORIES = 8;

export const PlacePage = () => {
	return (
		<Flex direction='column' gap='4'>
			<Box
				display='grid'
				gap='4'
				style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
			>
				<Box
					background='white'
					borderRadius='lg'
					padding='5'
					borderColor='primary50'
					borderWidth='hairline'
					boxShadow='primary'
				>
					<Typography.SubText level={1} color='primary'>
						{PLACEHOLDER_TOTAL_PLACES}
					</Typography.SubText>
					<Typography.FootNote level={2} color='gray200'>
						Total Places
					</Typography.FootNote>
				</Box>
				<Box
					background='white'
					borderRadius='lg'
					padding='5'
					borderColor='primary50'
					borderWidth='hairline'
					boxShadow='primary'
				>
					<Typography.SubText level={1} color='primary'>
						{PLACEHOLDER_CATEGORIES}
					</Typography.SubText>
					<Typography.FootNote level={2} color='gray200'>
						Categories
					</Typography.FootNote>
				</Box>
			</Box>
			<PlaceTable />
		</Flex>
	);
};

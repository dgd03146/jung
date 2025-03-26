import { formatDate } from '@/fsd/shared/lib';
import {
	Badge,
	Box,
	Container,
	Flex,
	Stack,
	Typography,
} from '@jung/design-system/components';
import { IoLocationOutline } from 'react-icons/io5';
import * as styles from './SpotDetailCard.css';

import type { Spot } from '@jung/shared/types';
import { SpotTags } from './SpotTags';
import { SpotTips } from './SpotTips';

interface SpotDetailCardProps {
	spot: Spot;
	renderMedia?: () => React.ReactNode;
	renderActions?: () => React.ReactNode;
}

export const SpotDetailCard = ({
	spot,
	renderActions,
	renderMedia,
}: SpotDetailCardProps) => {
	return (
		<Container
			marginX='auto'
			boxShadow='primary'
			borderRadius='xl'
			marginY='10'
		>
			{renderMedia && (
				<Box className={styles.imageSection}>{renderMedia()}</Box>
			)}

			<Stack maxWidth='tablet' marginX='auto' padding='10' gap='5'>
				<Typography.Heading level={3}>{spot.title}</Typography.Heading>
				<Flex gap='1' alignItems='center'>
					<IoLocationOutline size={16} className={styles.locationIcon} />
					<Typography.SubText level={3} truncate='two' color='primary300'>
						{spot.address}
					</Typography.SubText>
				</Flex>
				<Flex
					justify='space-between'
					align='center'
					gap='4'
					className={styles.spotInfoContainer}
					borderColor='primary50'
					borderStyle='solid'
					paddingY='4'
				>
					<Badge variant='secondary'>
						<Typography.SubText level={3} color='primary' fontWeight='medium'>
							{formatDate(spot.created_at)}
						</Typography.SubText>
					</Badge>
					{renderActions && <Flex gap='2'>{renderActions()}</Flex>}
				</Flex>
				<Stack space='10'>
					<Typography.Text level={2} marginY='10'>
						{spot.description}
					</Typography.Text>
					<SpotTags tags={spot.tags ?? []} />
					<SpotTips tips={spot.tips ?? []} />
				</Stack>
			</Stack>
		</Container>
	);
};

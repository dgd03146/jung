import {
	Badge,
	Box,
	Container,
	Flex,
	Stack,
	Typography,
} from '@jung/design-system/components';
import type { Place } from '@jung/shared/types';
import { IoLocationOutline } from 'react-icons/io5';
import { formatDate } from '@/fsd/shared/lib';
import * as styles from './PlaceDetailCard.css';
import { PlaceTags } from './PlaceTags';
import { PlaceTips } from './PlaceTips';

interface PlaceDetailCardProps {
	place: Place;
	renderMedia?: () => React.ReactNode;
	renderActions?: () => React.ReactNode;
}

export const PlaceDetailCard = ({
	place,
	renderActions,
	renderMedia,
}: PlaceDetailCardProps) => {
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
				<Typography.Heading level={3}>{place.title}</Typography.Heading>
				<Flex gap='1' alignItems='center'>
					<IoLocationOutline size={16} className={styles.locationIcon} />
					<Typography.SubText level={3} truncate='two' color='primary300'>
						{place.address}
					</Typography.SubText>
				</Flex>
				<Flex
					justify='space-between'
					align='center'
					gap='4'
					className={styles.placeInfoContainer}
					borderColor='primary50'
					borderStyle='solid'
					paddingY='4'
				>
					<Badge variant='secondary'>
						<Typography.SubText level={3} color='primary' fontWeight='medium'>
							{formatDate(place.created_at)}
						</Typography.SubText>
					</Badge>
					{renderActions && <Flex gap='2'>{renderActions()}</Flex>}
				</Flex>
				<Stack space='10'>
					<Typography.Text level={2} marginY='10'>
						{place.description}
					</Typography.Text>
					<PlaceTags tags={place.tags ?? []} />
					<PlaceTips tips={place.tips ?? []} />
				</Stack>
			</Stack>
		</Container>
	);
};

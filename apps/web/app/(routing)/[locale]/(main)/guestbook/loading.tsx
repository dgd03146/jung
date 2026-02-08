import { Container, Stack, Typography } from '@jung/design-system/components';
import { MessageListSkeleton } from '@/fsd/entities/guestbook';

export default function Loading() {
	return (
		<Container position='relative' marginX='auto'>
			<Stack
				gap={{ base: '6', laptop: '10' }}
				align='center'
				marginY={{ base: '6', laptop: '10' }}
			>
				<Typography.Heading level={4} color='primary'>
					Leave Your Message 💙
				</Typography.Heading>
			</Stack>
			<MessageListSkeleton />
		</Container>
	);
}

import { Container, Stack } from '@jung/design-system/components';
import { MessageListSkeleton } from '@/fsd/entities/guestbook';
import { CreateMessageFormSkeleton } from '@/fsd/features/guestbook';

export default function Loading() {
	return (
		<Container position='relative' marginX='auto'>
			<Stack
				gap={{ base: '4', laptop: '6' }}
				align='center'
				marginY={{ base: '4', laptop: '6' }}
			>
				<CreateMessageFormSkeleton />
			</Stack>
			<MessageListSkeleton />
		</Container>
	);
}

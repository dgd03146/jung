import { MESSAGE_LIMIT, MessageListSkeleton } from '@/fsd/entities/message';
import { CreateMessageForm } from '@/fsd/features/message';
import { siteUrl } from '@/fsd/shared';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';
import { GuestbookContent } from '@/fsd/views';
import { Container, Stack, Typography } from '@jung/design-system/components';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Guestbook',
	description:
		'방명록에 여러분의 이야기를 남겨주세요. 소중한 방문의 흔적이 됩니다.',
	openGraph: {
		title: 'Guestbook',
		description:
			'방명록에 여러분의 이야기를 남겨주세요. 소중한 방문의 흔적이 됩니다.',
		type: 'website',
		siteName: 'JUNG',
		locale: 'ko_KR',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Guestbook',
		creator: '@jung',
		description:
			'방명록에 여러분의 이야기를 남겨주세요. 소중한 방문의 흔적이 됩니다.',
	},
	keywords: [
		'JUNG',
		'방명록',
		'게스트북',
		'메시지',
		'소통',
		'guestbook',
		'messages',
		'community',
	],
	alternates: {
		canonical: `${siteUrl}/guestbook`,
		languages: {
			en: `${siteUrl}/en/guestbook`,
			ko: `${siteUrl}/ko/guestbook`,
		},
	},
};

export const revalidate = 0;

export default function Page() {
	const queryClient = getQueryClient();
	queryClient.prefetchInfiniteQuery(
		trpc.guestbook.getAllMessages.infiniteQueryOptions({
			limit: MESSAGE_LIMIT,
		}),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Container position='relative' marginX='auto'>
				<Stack
					gap={{ base: '6', laptop: '10' }}
					align='center'
					marginY={{ base: '6', laptop: '10' }}
				>
					<Typography.Heading level={4} color='primary'>
						Leave Your Message 💙
					</Typography.Heading>
					<CreateMessageForm />
				</Stack>
				<Suspense fallback={<MessageListSkeleton />}>
					<GuestbookContent />
				</Suspense>
			</Container>
		</HydrationBoundary>
	);
}

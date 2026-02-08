import { Container, Stack, Typography } from '@jung/design-system/components';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { MESSAGE_LIMIT, MessageListSkeleton } from '@/fsd/entities/guestbook';
import { CreateMessageForm } from '@/fsd/features/guestbook';
import { getGoogleVerificationCode, SITE_URL } from '@/fsd/shared';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';
import { GuestbookContent } from '@/fsd/views';
import type { Locale } from '@/i18n/routing';

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
		canonical: `${SITE_URL}/guestbook`,
		languages: {
			en: `${SITE_URL}/en/guestbook`,
			ko: `${SITE_URL}/ko/guestbook`,
		},
	},
	verification: {
		google: getGoogleVerificationCode(),
	},
};

// Guestbook needs real-time data - use SSR instead of ISR
export const dynamic = 'force-dynamic';

interface Props {
	params: Promise<{ locale: Locale }>;
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
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

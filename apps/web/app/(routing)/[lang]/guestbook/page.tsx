import { MESSAGE_LIMIT } from '@/fsd/entities/message';
import { HydrateClient, trpc } from '@/fsd/shared/index.server';
import { GuestbookPage } from '@/fsd/views';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Guestbook',
	description:
		'JUNG의 방명록에 여러분의 이야기를 남겨주세요. 소중한 방문의 흔적이 됩니다.',
	openGraph: {
		title: 'Guestbook',
		description:
			'JUNG의 방명록에 여러분의 이야기를 남겨주세요. 소중한 방문의 흔적이 됩니다.',
		type: 'website',
		siteName: 'JUNG',
		locale: 'ko_KR',
		images: [
			{
				url: '/images/og/guestbook.jpg',
				width: 1200,
				height: 630,
				alt: 'JUNG Guestbook',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Guestbook',
		creator: '@jung',
		description:
			'JUNG의 방명록에 여러분의 이야기를 남겨주세요. 소중한 방문의 흔적이 됩니다.',
		images: ['/images/og/guestbook.jpg'],
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
		canonical: 'https://your-domain.com/guestbook',
		languages: {
			en: 'https://your-domain.com/en/guestbook',
			ko: 'https://your-domain.com/ko/guestbook',
		},
	},
};

export default async function Page() {
	void trpc.guestbook.getAllMessages.prefetchInfinite({ limit: MESSAGE_LIMIT });

	return (
		<HydrateClient>
			<GuestbookPage />
		</HydrateClient>
	);
}

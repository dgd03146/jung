import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import {
	ClientToastProvider,
	KakaoProvider,
	TRPCReactProvider,
} from '@/fsd/app/providers';

import '@/fsd/app/styles/global.css';

interface Props {
	params: Promise<{ locale: string }>;
	children: React.ReactNode;
}

export default async function LocaleLayout({ params, children }: Props) {
	const { locale } = await params;
	const messages = await getMessages();

	return (
		<TRPCReactProvider>
			<NextIntlClientProvider locale={locale} messages={messages}>
				<ClientToastProvider>
					<KakaoProvider />
					{children}
				</ClientToastProvider>
			</NextIntlClientProvider>
		</TRPCReactProvider>
	);
}

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import {
	ClientToastProvider,
	KakaoProvider,
	TRPCReactProvider,
} from '@/fsd/app/providers';
import { ChatbotWidget } from '@/fsd/features/chatbot';
import { routing } from '@/i18n/routing';

import '@/fsd/app/styles/global.css';

interface Props {
	params: Promise<{ locale: string }>;
	children: React.ReactNode;
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ params, children }: Props) {
	const { locale } = await params;

	// Enable static rendering - tells next-intl the locale without using cookies()
	setRequestLocale(locale);

	const messages = await getMessages();

	return (
		<TRPCReactProvider>
			<NextIntlClientProvider locale={locale} messages={messages}>
				<ClientToastProvider>
					<KakaoProvider />
					{children}
					<ChatbotWidget />
				</ClientToastProvider>
			</NextIntlClientProvider>
		</TRPCReactProvider>
	);
}

import {
	ClientToastProvider,
	DictionaryProvider,
	KakaoProvider,
	TRPCReactProvider,
} from '@/fsd/app/providers';

import '@/fsd/app/styles/global.css';
import { getDictionary } from '@/fsd/shared/config';

interface Props {
	params: Promise<{ lang: string }>;
	children: React.ReactNode;
}

export default async function RootLayout({ params, children }: Props) {
	const { lang } = await params;
	return (
		<TRPCReactProvider>
			<DictionaryProvider
				lang={lang}
				initialDictionary={await getDictionary(lang)}
			>
				<ClientToastProvider>
					<KakaoProvider />
					{children}
				</ClientToastProvider>
			</DictionaryProvider>
		</TRPCReactProvider>
	);
}

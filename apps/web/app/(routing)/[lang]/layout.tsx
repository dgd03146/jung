import {
	ClientToastProvider,
	DictionaryProvider,
	KakaoProvider,
	TrpcProvider,
} from '@/fsd/app/providers';
import { Layout } from '@/fsd/widgets';

import '@/fsd/app/styles/global.css';
import { getDictionary } from '@/fsd/shared/config';

interface Props {
	params: { lang: string };

	children: React.ReactNode;
}

export default async function RootLayout({ params, children }: Props) {
	return (
		<TrpcProvider>
			<DictionaryProvider
				lang={params.lang}
				initialDictionary={await getDictionary(params.lang)}
			>
				<ClientToastProvider>
					<KakaoProvider />
					<Layout>{children}</Layout>
				</ClientToastProvider>

				{/* Just for convenient switching between different routes */}
				{/* <NavigationLinks /> */}
			</DictionaryProvider>
		</TrpcProvider>
	);
}

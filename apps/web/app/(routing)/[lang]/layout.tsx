import '@/fsd/app/styles/global.css';
import { getDictionary } from '@/fsd/shared/config';
import { DictionaryProvider } from '@/src/app/providers';
import { TrpcProvider } from '@/src/app/providers/trpc/TrpcProvider';

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
				{children}
				{/* Just for convenient switching between different routes */}
				{/* <NavigationLinks /> */}
			</DictionaryProvider>
		</TrpcProvider>
	);
}

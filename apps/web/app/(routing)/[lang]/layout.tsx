import { DictionaryProvider } from '@/fsd/app/providers';
import { TrpcProvider } from '@/fsd/app/providers/trpc/TrpcProvider';
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
				{children}
				{/* Just for convenient switching between different routes */}
				{/* <NavigationLinks /> */}
			</DictionaryProvider>
		</TrpcProvider>
	);
}

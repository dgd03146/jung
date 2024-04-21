import DesignSystem from '@/components/DesignSystem';
import ExampleClientComponent from '@/components/ExampleClientComponent';
import LanguageChanger from '@/components/LanguageChanger';
import TranslationProvider from '@/components/TranslationsProvider';
import { Heading } from '@jung/design-system';
import initTranslations from '../i18n';

type Params = {
	params: {
		locale: string;
	};
};

const i18nNamespaces = ['home'];

export default async function Home({ params: { locale } }: Params) {
	const { t, resources } = await initTranslations(locale, i18nNamespaces);

	return (
		<div>
			<TranslationProvider
				locale={locale}
				resources={resources}
				namespaces={i18nNamespaces}
			>
				<ExampleClientComponent />
				<LanguageChanger />
			</TranslationProvider>
			<Heading as='h3' text={t('header')} />
			<DesignSystem />
		</div>
	);
}

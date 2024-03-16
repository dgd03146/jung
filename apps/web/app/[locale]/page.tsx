import ExampleClientComponent from "@/components/ExampleClientComponent";
import LanguageChanger from "@/components/LanguageChanger";
import TranslationProvider from "@/components/TranslationsProvider";
import { Button } from "@jung/design-system";
import Link from "next/link";
import initTranslations from "../i18n";

type Params = {
	params: {
		locale: string;
	};
};

const i18nNamespaces = ["home"];

export default async function Home({ params: { locale } }: Params) {
	const { t, resources } = await initTranslations(locale, i18nNamespaces);
	return (
		<div>
			<h1>Home</h1>
			<Link href="/about">About</Link>
			<Button />
			<h1>{t("header")}</h1>
			<TranslationProvider
				locale={locale}
				resources={resources}
				namespaces={i18nNamespaces}
			>
				<ExampleClientComponent />
				<LanguageChanger />
			</TranslationProvider>
		</div>
	);
}

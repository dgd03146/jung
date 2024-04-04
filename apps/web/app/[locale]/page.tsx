import { Badge, Box, Button, List, ListItem } from "@jung/design-system";

import ExampleClientComponent from "@/components/ExampleClientComponent";
import LanguageChanger from "@/components/LanguageChanger";
import PopularList from "@/components/PopularList";
import TranslationProvider from "@/components/TranslationsProvider";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import initTranslations from "../i18n";

type Params = {
	params: {
		locale: string;
	};
};

const i18nNamespaces = ["home"];

const SearchIcon = () => {
	return (
		<div>
			<CiSearch />
		</div>
	);
};

export default async function Home({ params: { locale } }: Params) {
	const { t, resources } = await initTranslations(locale, i18nNamespaces);
	return (
		<div>
			<h1>Home</h1>
			<Link href="/about">About</Link>
			<Button>div??</Button>
			<Box width="10" background="primary">
				hihi
			</Box>
			<Button variant="secondary">Secondary Button</Button>
			<Button variant="outline">Outline Button</Button>
			<Button rounded>Rounded Button</Button>
			<Button variant="ghost">Ghost Button</Button>
			<Button prefix={<SearchIcon />}>Button with Icon</Button>
			<Button prefix={<SearchIcon />} suffix={<SearchIcon />} href="hihi">
				Button with Icon
			</Button>
			<h1>{t("header")}</h1>
			<TranslationProvider
				locale={locale}
				resources={resources}
				namespaces={i18nNamespaces}
			>
				<ExampleClientComponent />
				<LanguageChanger />
			</TranslationProvider>
			<Link href="hihi">
				<Button>Link</Button>
			</Link>
			<Badge rounded>Badge</Badge>
			<PopularList />
		</div>
	);
}

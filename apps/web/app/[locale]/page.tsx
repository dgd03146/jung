import { Badge, Button, Input, Textarea } from '@jung/design-system';

import CardExampleComponent from '@/components/CardExampleComponent';
import ExampleClientComponent from '@/components/ExampleClientComponent';
import LanguageChanger from '@/components/LanguageChanger';
import PopularList from '@/components/PopularList';
import SelectComponent from '@/components/SelectComponent';
import TranslationProvider from '@/components/TranslationsProvider';
import { SearchIcon } from '@jung/design-system/icons';
import Link from 'next/link';
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
			<h1>Home</h1>

			<h1>Button들 모음</h1>
			<Button variant='secondary'>Secondary Button</Button>
			<Button variant='outline'>Outline Button</Button>
			<Button rounded>Rounded Button</Button>
			<Button variant='ghost'>Ghost Button</Button>
			<Button prefix={<SearchIcon />}>Button with Icon</Button>
			<Button prefix={<SearchIcon />} suffix={<SearchIcon />} href='hihi'>
				Button with Icon
			</Button>
			<h1>Link with Button</h1>
			<Link href='about'>
				<Button>Link</Button>
			</Link>
			<h1>i18n 적용</h1>
			<h3>{t('header')}</h3>
			<TranslationProvider
				locale={locale}
				resources={resources}
				namespaces={i18nNamespaces}
			>
				<ExampleClientComponent />
				<LanguageChanger />
			</TranslationProvider>
			<h1>Badge 컴포넌트</h1>
			<Badge rounded>Badge</Badge>
			<h1>List 컴포넌트</h1>
			<PopularList />
			<h1>Select 컴포넌트</h1>
			<SelectComponent />
			<h1>Input 컴포넌트</h1>
			<Input placeholder='primary' variant='primary' rounded />
			<Input placeholder='outline' variant='outline' />
			<Input placeholder='ghost' variant='ghost' />
			<h1>Textarea 컴포넌트</h1>
			<Textarea />
			<h1>Card 컴포넌트</h1>
			<CardExampleComponent />
		</div>
	);
}

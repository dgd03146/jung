import {
	Badge,
	Button,
	Heading,
	Input,
	Text,
	Textarea,
} from '@jung/design-system';

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
			<Heading text='Button' />
			<Button variant='secondary'>Secondary Button</Button>
			<Button variant='outline'>Outline Button</Button>
			<Button rounded>Rounded Button</Button>
			<Button variant='ghost'>Ghost Button</Button>
			<Button prefix={<SearchIcon />}>Button with Icon</Button>
			<Button prefix={<SearchIcon />} suffix={<SearchIcon />} href='hihi'>
				Button with Icon
			</Button>
			<Heading as='h2' text='Button with Link' />
			<Link href='about'>
				<Button>Link</Button>
			</Link>
			<Heading text='home' />
			<Heading as='h3' text={t('header')} />
			<TranslationProvider
				locale={locale}
				resources={resources}
				namespaces={i18nNamespaces}
			>
				<ExampleClientComponent />
				<LanguageChanger />
			</TranslationProvider>
			<Heading text='Badge 컴포넌트' />
			<Badge rounded>Badge</Badge>
			<Heading text='List 컴포넌트' />
			<PopularList />
			<Heading text='Select 컴포넌트' />
			<SelectComponent />
			<Heading text='Input 컴포넌트' />
			<Input placeholder='primary' variant='primary' rounded padding='2' />
			<Input placeholder='outline' variant='outline' />
			<Input placeholder='ghost' variant='ghost' />
			<Heading text='TextArea 컴포넌트' />
			<Textarea />
			<Heading text='Card 컴포넌트' />
			<CardExampleComponent />
			<Heading text='big' fontSize='10xl' lineHeight='big' />
			<Heading text='h1' />
			<Heading as='h2' text='h2' />
			<Heading as='h3' text='h3' />
			<Heading as='h4' text='h4' />
			<Text text='이건 p태그' />
		</div>
	);
}

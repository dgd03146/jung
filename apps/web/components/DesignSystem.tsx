'use client';

import {
	Badge,
	Button,
	Divider,
	Flex,
	Heading,
	Input,
	Spinner,
	Text,
	Textarea,
} from '@jung/design-system';

import { SearchIcon } from '@jung/design-system/icons';
import Link from 'next/link';
import CardExampleComponent from './CardExampleComponent';
import CheckBoxTest from './CheckBoxTest';
import PopularList from './PopularList';
import SelectComponent from './SelectComponent';

const DesignSystem = () => {
	return (
		<>
			<Heading as='h3' text='Button' />
			<Flex>
				<Button disabled>Disabled Button</Button>
				<Button variant='primary'>Primary Button</Button>
				<Button variant='secondary'>Secondary Button</Button>
				<Button rounded>Rounded Button</Button>
				<Button variant='ghost'>Ghost Button</Button>
				<Button loading>Loading Button</Button>
				<Button prefix={<SearchIcon />}>Button with Icon</Button>
				<Button prefix={<SearchIcon />} suffix={<SearchIcon />}>
					Button with Icon
				</Button>
				<Link href='about'>
					<Button>Button with Link</Button>
				</Link>
			</Flex>
			<Heading as='h3' text='Badge 컴포넌트' />
			<Flex>
				<Badge variant='primary'>Primary Badge</Badge>
				<Badge rounded>Rounded Badge</Badge>
			</Flex>
			<Heading as='h3' text='List 컴포넌트' />
			<PopularList />
			<Heading as='h3' text='Select 컴포넌트' />
			<SelectComponent />
			<Heading as='h3' text='Input 컴포넌트' />
			<Flex>
				<Input placeholder='primary' variant='primary' rounded padding='2' />
				<Input placeholder='ghost' variant='ghost' />
				<Input disabled placeholder='disabled' variant='primary' />
			</Flex>
			<Heading as='h3' text='TextArea 컴포넌트' />
			<Textarea />
			<Heading as='h3' text='Card 컴포넌트' />
			<CardExampleComponent />
			<Flex>
				<Heading text='big' fontSize='10xl' lineHeight='big' />
				<Heading text='h1' />
				<Heading as='h2' text='h2' />
				<Heading as='h3' text='h3' />
				<Heading as='h4' text='h4' />
				<Text text='이건 p태그' />
			</Flex>
			<Divider />
			<Spinner />
			<Heading as='h3' text='CheckBox 컴포넌트' />
			<CheckBoxTest />
		</>
	);
};

export default DesignSystem;

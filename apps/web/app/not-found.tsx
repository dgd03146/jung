/*
 * Not-Found page should have a layout as well, that's why it is placed directly
 * in the app/ folder together with the main layout.tsx
 * Unfortunately, the useDictionary hook cannot be used on this page
 * because the app/layout.tsx and app/not-found.tsx cannot be placed in app/(routing)/[lang]/ folder
 */
import {
	Box,
	Button,
	Container,
	Flex,
	Typography,
} from '@jung/design-system/components';
import Link from 'next/link';
import { MdOutlineSearchOff } from 'react-icons/md';

export default function NotFound() {
	return (
		<Container>
			<Flex
				direction='column'
				align='center'
				justify='center'
				gap='8'
				paddingY='32'
				minHeight='screenDvh'
			>
				<Box
					padding='4'
					borderRadius='half'
					background='primary50'
					color='primary'
				>
					<MdOutlineSearchOff size={48} />
				</Box>

				<Flex direction='column' align='center' gap='6' textAlign='center'>
					<Typography.Heading level={1} color='primary'>
						404
					</Typography.Heading>

					<Typography.Heading level={2} color='black100'>
						Can't find the page
					</Typography.Heading>

					<Typography.Text level={1} color='black100'>
						The page you requested has been deleted or the path is incorrect
					</Typography.Text>
				</Flex>

				<Link href='/'>
					<Button variant='primary' size='lg' borderRadius='lg'>
						<Typography.Text fontWeight='medium'>Go to home</Typography.Text>
					</Button>
				</Link>
			</Flex>
		</Container>
	);
}

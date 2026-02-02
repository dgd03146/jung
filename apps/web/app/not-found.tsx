import {
	Box,
	Button,
	Container,
	Flex,
	Typography,
} from '@jung/design-system/components';
import { getTranslations } from 'next-intl/server';
import { MdOutlineSearchOff } from 'react-icons/md';
import { Link } from '@/i18n/routing';

export default async function NotFound() {
	const t = await getTranslations('error');

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
						{t('notFound')}
					</Typography.Heading>

					<Typography.Text level={1} color='black100'>
						{t('notFoundDesc')}
					</Typography.Text>
				</Flex>

				<Link href='/'>
					<Button variant='primary' size='lg' borderRadius='lg'>
						<Typography.Text fontWeight='medium'>{t('goHome')}</Typography.Text>
					</Button>
				</Link>
			</Flex>
		</Container>
	);
}

'use client';

import { Box, Flex, Typography } from '@jung/design-system';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { capitalizeFirstLetter } from '../lib/capitalizeFirstLetter';

type EmptyType = 'blog' | 'gallery' | 'places';

interface EmptyStateProps {
	type?: EmptyType;
}

export function EmptyState({ type = 'blog' }: EmptyStateProps) {
	const t = useTranslations('empty');
	const searchParams = useSearchParams();

	const q = searchParams.get('q');
	const cat = searchParams.get('cat');

	const getDescription = () => {
		if (type === 'blog') {
			if (q) return t('blogSearch', { query: q });
			if (cat)
				return t('blogCategory', { category: capitalizeFirstLetter(cat) });
			return t('blog');
		}
		return t(type);
	};

	return (
		<Flex
			direction='column'
			align='center'
			justify='center'
			gap='8'
			marginY={{ base: '5', tablet: '10', laptop: '20' }}
		>
			<Box
				padding='6'
				borderRadius='full'
				background='primary50'
				color='primary'
			>
				<IoDocumentTextOutline size={36} />
			</Box>

			<Flex direction='column' align='center' gap='10'>
				<Typography.Text level={1} color='primary' fontWeight='medium'>
					{getDescription()}
				</Typography.Text>
			</Flex>
		</Flex>
	);
}

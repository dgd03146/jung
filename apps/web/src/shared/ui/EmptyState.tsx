'use client';

import { Box, Flex, Typography } from '@jung/design-system';
import { usePathname, useSearchParams } from 'next/navigation';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { capitalizeFirstLetter } from '../lib/capitalizeFirstLetter';

export function EmptyState({ content }: { content?: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const q = searchParams.get('q');
	const cat = searchParams.get('cat');

	const segment = pathname.split('/').filter(Boolean)[1];
	const contentType = capitalizeFirstLetter(segment ?? 'posts');

	const getDescription = () => {
		if (q) return `We couldn't find any results for "${q}"`;
		if (cat) {
			return `No ${content || segment} available in the ${capitalizeFirstLetter(
				cat,
			)} category yet`;
		}
		return `No ${content || segment} available at the moment`;
	};

	const getTitle = () => {
		return `No ${content || contentType} Found`;
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
				<Typography.Heading level={4} color='black100'>
					{getTitle()}
				</Typography.Heading>

				<Typography.Text level={1} color='primary' fontWeight='medium'>
					{getDescription()}
				</Typography.Text>
			</Flex>
		</Flex>
	);
}

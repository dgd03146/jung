'use client';

import { Box, Button, Flex, Typography } from '@jung/design-system';
import { IoDocumentTextOutline } from 'react-icons/io5';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { capitalizeFirstLetter } from '../lib/capitalizeFirstLetter';

export function EmptyState() {
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const q = searchParams.get('q');
	const cat = searchParams.get('cat');

	const segment = pathname.split('/').filter(Boolean)[1];
	const contentType = capitalizeFirstLetter(segment ?? 'posts');

	const getDescription = () => {
		if (q) return `We couldn't find any results for "${q}"`;
		if (cat) {
			return `No ${segment} available in the ${capitalizeFirstLetter(
				cat,
			)} category yet`;
		}
		return `No ${segment} available at the moment`;
	};

	const getTitle = () => {
		return `No ${contentType} Found`;
	};

	const getButtonText = () => {
		return `View All ${contentType}`;
	};

	const baseUrl = pathname.split('?')[0];

	return (
		<Flex
			direction='column'
			align='center'
			justify='center'
			gap='6'
			paddingY='16'
		>
			<Box
				padding='6'
				borderRadius='full'
				background='primary50'
				color='primary'
			>
				<IoDocumentTextOutline size={36} />
			</Box>

			<Flex direction='column' align='center' gap='6'>
				<Typography.Heading level={4} color='black100'>
					{getTitle()}
				</Typography.Heading>

				<Typography.Text level={2} color='primary' fontWeight='medium'>
					{getDescription()}
				</Typography.Text>
			</Flex>

			<Link href={baseUrl ?? '/'}>
				<Button variant='primary' size='lg' borderRadius='lg'>
					<Typography.Text fontWeight='medium'>
						{getButtonText()}
					</Typography.Text>
				</Button>
			</Link>
		</Flex>
	);
}

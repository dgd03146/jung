'use client';

import { Container, Flex, Tag } from '@jung/design-system/components';
import type { Category } from '@jung/shared/types';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const mockCategories: Category[] = [
	{
		id: '1',
		name: 'Frontend Development',
		type: 'blog',
		description:
			'All about frontend development including React, Vue, and Angular',
		parent_id: null,
		created_at: '2024-01-01T00:00:00Z',
		color: '#0142C0',
	},
	{
		id: '2',
		name: 'React',
		type: 'blog',
		description: 'Deep dive into React ecosystem and best practices',
		parent_id: '1',
		created_at: '2024-01-02T00:00:00Z',
		color: '#61DAFB',
	},
	{
		id: '3',
		name: 'Backend Development',
		type: 'blog',
		description: 'Server-side development with Node.js, Python, and more',
		parent_id: null,
		created_at: '2024-01-03T00:00:00Z',
		color: '#3C873A',
	},
	{
		id: '4',
		name: 'Node.js',
		type: 'blog',
		description: 'Building scalable applications with Node.js',
		parent_id: '3',
		created_at: '2024-01-04T00:00:00Z',
		color: '#68A063',
	},
	{
		id: '5',
		name: 'TypeScript',
		type: 'blog',
		description: 'TypeScript fundamentals and advanced concepts',
		parent_id: '1',
		created_at: '2024-01-05T00:00:00Z',
		color: '#007ACC',
	},
] as const;

const CategoryList = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (value === 'all') {
				params.delete('cat');
			} else {
				params.set(name, value);
			}
			return params.toString();
		},
		[searchParams],
	);

	const currentCategory = searchParams.get('cat') || 'all';

	return (
		<Container marginBottom='4'>
			<Flex flexWrap={{ mobile: 'wrap', miniTablet: 'nowrap' }} gap='1'>
				{mockCategories.map((category) => (
					<Link
						key={category.id}
						href={`${pathname}?${createQueryString('cat', category.name)}`}
					>
						<Tag
							borderRadius='lg'
							transitionDuration='500'
							borderColor={{ hover: 'primary200' }}
							background={
								currentCategory === category.name
									? 'primary'
									: { hover: 'primary200' }
							}
							color={
								currentCategory === category.name ? 'white' : { hover: 'white' }
							}
						>
							{category.name}
						</Tag>
					</Link>
				))}
			</Flex>
		</Container>
	);
};

export default CategoryList;

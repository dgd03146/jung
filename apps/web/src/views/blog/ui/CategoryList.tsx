'use client';

import { Container, Flex, Tag } from '@jung/design-system/components';

import { CATEGORIES } from '@jung/shared/constants';
import { getCategoryDisplayName } from '@jung/shared/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

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
				{CATEGORIES.map((category) => (
					<Link
						key={category.id}
						href={`${pathname}?${createQueryString('cat', category.name)}`}
					>
						<Tag
							rounded
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
							{getCategoryDisplayName(category, 'en')}
						</Tag>
					</Link>
				))}
			</Flex>
		</Container>
	);
};

export default CategoryList;

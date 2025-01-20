import { Box, Tag, Typography } from '@jung/design-system/components';
import type { GetCategoryItem } from '@jung/shared/types';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import * as styles from './CategoryFilter.css';

const CATEGORIES = [
	{ value: 'all', label: 'All' },
	{ value: 'nature', label: 'Nature' },
	{ value: 'landmark', label: 'Landmark' },
	{ value: 'historic', label: 'Historic' },
	{ value: 'culture', label: 'Culture' },
	{ value: 'night', label: 'Night View' },
	{ value: 'street', label: 'Street' },
	{ value: 'park', label: 'Park' },
	{ value: 'local', label: 'Local' },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]['value'];

export function CategoryFilter({
	categories,
}: {
	categories: GetCategoryItem[];
}) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// FIXME: 공용 함수로 빼기
	const createQueryString = useCallback(
		(value: string) => {
			const lowerCaseValue = value.toLowerCase();
			const params = new URLSearchParams(searchParams.toString());
			if (lowerCaseValue === 'all') {
				params.delete('cat');
			} else {
				params.set('cat', lowerCaseValue);
			}

			return params.toString();
		},
		[searchParams],
	);

	const currentCategory = searchParams.get('cat') || 'all';

	return (
		<Box className={styles.container}>
			<Link href={`${pathname}?${createQueryString('all')}`}>
				<Tag variant='secondary' selected={currentCategory === 'all'}>
					<Typography.SubText level={2} fontWeight='medium'>
						All
					</Typography.SubText>
				</Tag>
			</Link>
			{categories.map((category) => (
				<Link
					key={category.id}
					href={`${pathname}?${createQueryString(category.name)}`}
				>
					<Tag
						variant='secondary'
						selected={
							category.name.toLowerCase() === currentCategory.toLowerCase()
						}
					>
						<Typography.SubText level={2} fontWeight='medium'>
							{category.name}
						</Typography.SubText>
					</Tag>
				</Link>
			))}
		</Box>
	);
}

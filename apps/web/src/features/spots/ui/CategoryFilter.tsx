import { Box, Tag } from '@jung/design-system/components';
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

export function CategoryFilter() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (value === 'all') {
				params.delete('category');
			} else {
				params.set('category', value);
			}

			return params.toString();
		},
		[searchParams],
	);

	const currentCategory = searchParams.get('category') || 'all';

	return (
		<Box className={styles.container}>
			{CATEGORIES.map((category) => (
				<Link
					key={category.value}
					href={`${pathname}?${createQueryString(category.value)}`}
				>
					<Tag
						rounded
						className={styles.categoryTag({
							selected: category.value === currentCategory,
						})}
					>
						{category.label}
					</Tag>
				</Link>
			))}
		</Box>
	);
}

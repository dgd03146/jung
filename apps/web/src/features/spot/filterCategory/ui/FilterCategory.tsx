import { createQueryString, useSearchParamsState } from '@/fsd/shared';
import { Box, Tag, Typography } from '@jung/design-system/components';
import type { CategoryTree } from '@jung/shared/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as styles from './FilterCategory.css';

export const FilterCategory = ({
	categories,
}: {
	categories: CategoryTree[];
}) => {
	const pathname = usePathname();
	const { cat } = useSearchParamsState({
		defaults: {
			cat: 'all',
		} as const,
	});

	return (
		<Box className={styles.container}>
			<Link href={`${pathname}?${createQueryString('cat', 'all', 'all')}`}>
				<Tag variant='secondary' selected={cat === 'all'}>
					<Typography.SubText level={2} fontWeight='medium'>
						All
					</Typography.SubText>
				</Tag>
			</Link>
			{categories.map((category) => (
				<Link
					key={category.id}
					href={`${pathname}?${createQueryString('cat', category.name, 'all')}`}
				>
					<Tag
						variant='secondary'
						selected={category.name.toLowerCase() === cat.toLowerCase()}
					>
						<Typography.SubText level={2} fontWeight='medium'>
							{category.name}
						</Typography.SubText>
					</Tag>
				</Link>
			))}
		</Box>
	);
};

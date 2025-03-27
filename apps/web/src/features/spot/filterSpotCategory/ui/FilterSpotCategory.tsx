'use client';

import { useTRPC } from '@/fsd/app';
import { SPOT_DEFAULTS } from '@/fsd/entities/spot';
import { Box, Tag, Typography } from '@jung/design-system/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import * as styles from './FilterSpotCategory.css';

interface Props {
	currentCategory?: string;
}

export const FilterSpotCategory = ({
	currentCategory = SPOT_DEFAULTS.CAT,
}: Props) => {
	const trpc = useTRPC();
	const { data: categories } = useSuspenseQuery(
		trpc.category.getCategories.queryOptions(
			{ type: 'spots' },
			{
				staleTime: 1000 * 60 * 60 * 24, // 24시간
				gcTime: 1000 * 60 * 60 * 24 * 7, // 7일
			},
		),
	);

	return (
		<Box className={styles.container}>
			<Link href='/spots'>
				<Tag
					variant='secondary'
					selected={currentCategory === SPOT_DEFAULTS.CAT}
				>
					<Typography.SubText level={2} fontWeight='medium'>
						All
					</Typography.SubText>
				</Tag>
			</Link>
			{categories.map((category) => (
				<Link
					key={category.id}
					href={`/spots/categories/${category.name.toLowerCase()}`}
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
};

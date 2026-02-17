'use client';

import { Box, Tag, Typography } from '@jung/design-system/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PLACE_DEFAULTS } from '@/fsd/entities/place';
import { useTRPC } from '@/fsd/shared';
import { Link } from '@/i18n/routing';
import * as styles from './FilterPlaceCategory.css';

interface Props {
	currentCategory?: string;
}

export const FilterPlaceCategory = ({
	currentCategory = PLACE_DEFAULTS.CAT,
}: Props) => {
	const trpc = useTRPC();
	const { data: categories } = useSuspenseQuery(
		trpc.category.getCategories.queryOptions(
			{ type: 'places' },
			{
				staleTime: 1000 * 60 * 60 * 24, // 24시간
				gcTime: 1000 * 60 * 60 * 24 * 7, // 7일
			},
		),
	);

	return (
		<Box className={styles.container}>
			<Link href='/places'>
				<Tag
					variant='secondary'
					selected={currentCategory === PLACE_DEFAULTS.CAT}
				>
					<Typography.SubText level={2} fontWeight='medium'>
						All
					</Typography.SubText>
				</Tag>
			</Link>
			{categories.map((category) => (
				<Link
					key={category.id}
					href={`/places/categories/${category.name.toLowerCase()}`}
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

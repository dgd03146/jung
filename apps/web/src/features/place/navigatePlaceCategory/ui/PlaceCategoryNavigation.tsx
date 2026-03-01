'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { PLACE_CATEGORY_CACHE, PLACE_DEFAULTS } from '@/fsd/entities/place';
import { useTRPC } from '@/fsd/shared';
import { Link } from '@/i18n/routing';
import * as styles from './PlaceCategoryNavigation.css';

interface Props {
	currentCategory?: string;
}

export const PlaceCategoryNavigation = ({
	currentCategory = PLACE_DEFAULTS.CAT,
}: Props) => {
	const trpc = useTRPC();
	const { data: categories } = useSuspenseQuery(
		trpc.category.getCategories.queryOptions(
			{ type: 'places' },
			{
				staleTime: PLACE_CATEGORY_CACHE.STALE_TIME,
				gcTime: PLACE_CATEGORY_CACHE.GC_TIME,
			},
		),
	);

	const normalizedCategory = currentCategory.toLowerCase();
	const isAllActive = normalizedCategory === PLACE_DEFAULTS.CAT.toLowerCase();

	return (
		<nav className={styles.nav} aria-label='Places navigation'>
			<Link
				href='/places'
				scroll={false}
				className={isAllActive ? styles.tabActive : styles.tab}
				{...(isAllActive && { 'aria-current': 'page' as const })}
			>
				All
			</Link>
			{categories.map((category) => {
				const isActive = category.name.toLowerCase() === normalizedCategory;
				return (
					<Link
						key={category.id}
						href={`/places/categories/${category.name.toLowerCase()}`}
						scroll={false}
						className={isActive ? styles.tabActive : styles.tab}
						{...(isActive && { 'aria-current': 'page' as const })}
					>
						{category.name}
					</Link>
				);
			})}
		</nav>
	);
};

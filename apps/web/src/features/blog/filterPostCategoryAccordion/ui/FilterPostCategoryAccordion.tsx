'use client';

import { Accordion, Box, Typography } from '@jung/design-system/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { BLOG_DEFAULTS } from '@/fsd/entities/blog';
import { useTRPC } from '@/fsd/shared';
import { Link } from '@/i18n/routing';
import * as styles from './FilterPostCategoryAccordion.css';

const CACHE_TIME = {
	STALE_TIME_24H: 1000 * 60 * 60 * 24,
	GC_TIME_7D: 1000 * 60 * 60 * 24 * 7,
} as const;

interface Props {
	currentCategory?: string;
}

export const FilterPostCategoryAccordion = ({
	currentCategory = BLOG_DEFAULTS.CATEGORY,
}: Props) => {
	const trpc = useTRPC();

	const { data: categories } = useSuspenseQuery(
		trpc.category.getCategories.queryOptions(
			{ type: 'blog' },
			{
				staleTime: CACHE_TIME.STALE_TIME_24H,
				gcTime: CACHE_TIME.GC_TIME_7D,
			},
		),
	);

	const parentCategoryIndex = useMemo(() => {
		if (!categories || currentCategory === BLOG_DEFAULTS.CATEGORY) return -1;

		for (let i = 0; i < categories.length; i++) {
			const hasSubCategory = categories[i]?.subCategories.some(
				(sub) => sub.name.toLowerCase() === currentCategory.toLowerCase(),
			);

			if (hasSubCategory) return i + 2;
		}

		return -1;
	}, [categories, currentCategory]);

	return (
		<Box as='aside' className={styles.sidebar}>
			<Accordion type='multiple' initialOpenIndex={parentCategoryIndex}>
				<Link
					href='/blog'
					className={styles.categoryLink({
						active: currentCategory === BLOG_DEFAULTS.CATEGORY,
					})}
				>
					All
				</Link>

				{categories.map((category) => {
					// const isCategoryActive =
					// currentCategory.toLowerCase() === category.name.toLowerCase();
					return (
						<Accordion.Item
							key={category.id}
							itemId={`blog-category-${category.id}`}
						>
							<Accordion.Trigger
								hasPanel={category.subCategories.length > 0}
								// active={isCategoryActive}
							>
								{category.name}
							</Accordion.Trigger>

							<Accordion.Content>
								{category.subCategories.map((subCategory) => (
									<Link
										key={subCategory.id}
										href={`/blog/categories/${subCategory.name.toLowerCase()}`}
									>
										<Accordion.Panel
											active={
												currentCategory.toLowerCase() ===
												subCategory.name.toLowerCase()
											}
										>
											<span>{subCategory.name}</span>
											<Typography.SubText
												level={2}
												color='primary'
												background='primary50'
												paddingY='1'
												paddingX='2'
											>
												{subCategory.postCount}
											</Typography.SubText>
										</Accordion.Panel>
									</Link>
								))}
							</Accordion.Content>
						</Accordion.Item>
					);
				})}
			</Accordion>
		</Box>
	);
};

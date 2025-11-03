'use client';

import { useTRPC } from '@/fsd/app';
import { BLOG_DEFAULTS } from '@/fsd/entities/blog';
import { Accordion, Box, Typography } from '@jung/design-system/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useMemo } from 'react';
import * as styles from './FilterPostCategoryAccordion.css';

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
				staleTime: 1000 * 60 * 60 * 24, // 24시간
				gcTime: 1000 * 60 * 60 * 24 * 7, // 7일
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
						<Accordion.Item key={category.id}>
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

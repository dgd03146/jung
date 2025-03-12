'use client';

import { useTRPC } from '@/fsd/app';
import { BLOG_DEFAULTS } from '@/fsd/entities';
import { createQueryString, useSearchParamsState } from '@/fsd/shared';
import { Accordion, Box, Typography } from '@jung/design-system';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as styles from './FilterPostCategoryAccordion.css';

export const FilterPostCategoryAccordion = () => {
	const pathname = usePathname();
	const { cat } = useSearchParamsState({
		defaults: {
			cat: BLOG_DEFAULTS.CATEGORY,
		} as const,
	});

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

	return (
		<Box
			as='aside'
			className={styles.sidebar}
			display={{ mobile: 'none', tablet: 'block' }}
		>
			<Accordion type='multiple'>
				<Link
					href='/blog'
					className={styles.categoryLink({
						active: cat === 'all',
					})}
				>
					All
				</Link>

				{categories.map((category) => (
					<Accordion.Item key={category.id}>
						<Link
							href={`${pathname}?${createQueryString(
								'cat',
								category.name,
								'all',
							)}`}
						>
							<Accordion.Trigger
								hasPanel={category.subCategories.length > 0}
								active={cat.toLowerCase() === category.name.toLowerCase()}
							>
								{category.name}
							</Accordion.Trigger>
						</Link>

						<Accordion.Content>
							{category.subCategories.map((subCategory) => (
								<Link
									key={subCategory.id}
									href={`${pathname}?${createQueryString(
										'cat',
										subCategory.name,
										'all',
									)}`}
								>
									<Accordion.Panel
										active={cat === subCategory.name.toLowerCase()}
									>
										<span>{subCategory.name}</span>
										<Typography.SubText
											level={2}
											color='primary'
											background='primary50'
											paddingY='1'
											paddingX='2'
											display={{ mobile: 'none', tablet: 'block' }}
										>
											{subCategory.postCount}
										</Typography.SubText>
									</Accordion.Panel>
								</Link>
							))}
						</Accordion.Content>
					</Accordion.Item>
				))}
			</Accordion>
		</Box>
	);
};

'use client';

import { createQueryString, useSearchParamsState } from '@/fsd/shared';
import { Accordion, Box, Typography } from '@jung/design-system';
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
									<Accordion.Panel active={cat === subCategory.name}>
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

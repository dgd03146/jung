'use client';

import { Accordion, Box, Typography } from '@jung/design-system';
import type { GetCategoryItem } from '@jung/shared/types';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import * as styles from './CategoryNav.css';

type Props = {
	categories: GetCategoryItem[];
};

export const CategoryNav = ({ categories }: Props) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentCat = searchParams.get('cat') || 'all';

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

	return (
		<Box
			as='aside'
			className={styles.sidebar}
			display={{ mobile: 'none', tablet: 'block' }}
		>
			{/* FIXME: 모바일에선 일단 카테고리 안보여줌 */}
			{/* <Box
        display={{ mobile: 'flex', laptop: 'none' }}
        width="full"
        marginTop="2"
      >
        <CategoryGroup title="All" />
        {categories.map((category) => (
          <CategoryGroup
            key={category.id}
            title={category.name}
            items={category.subCategories}
          />
        ))}
      </Box> */}

			<Accordion type='multiple'>
				<Link
					href='/blog'
					className={styles.categoryLink({
						active: currentCat === 'all',
					})}
				>
					All
				</Link>

				{categories.map((category) => (
					<Accordion.Item key={category.id}>
						<Link href={`${pathname}?${createQueryString(category.name)}`}>
							<Accordion.Trigger
								hasPanel={category.subCategories.length > 0}
								active={
									currentCat.toLowerCase() === category.name.toLowerCase()
								}
							>
								{category.name}
							</Accordion.Trigger>
						</Link>

						<Accordion.Content>
							{category.subCategories.map((subCategory) => (
								<Link
									key={subCategory.id}
									href={`${pathname}?${createQueryString(subCategory.name)}`}
								>
									<Accordion.Panel active={currentCat === subCategory.name}>
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

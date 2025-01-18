'use client';

import { Accordion, Box, Typography } from '@jung/design-system';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useGetCategoryCounts } from '../api';
import { CATEGORY_CONFIG } from '../config/constants';
import { CategoryGroup } from './CategoryGroup';
import * as styles from './CategoryNav.css';

export const CategoryNav = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentCat = searchParams.get('cat') || 'all';
	const { data: categoryCounts } = useGetCategoryCounts();

	const createQueryString = useCallback(
		(value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (value === 'all') {
				params.delete('cat');
			} else {
				params.set('cat', value);
			}
			return params.toString();
		},
		[searchParams],
	);

	return (
		<aside className={styles.sidebar}>
			<Box
				display={{ mobile: 'flex', laptop: 'none' }}
				width='full'
				marginTop='2'
			>
				<CategoryGroup title='All' />
				{Object.entries(CATEGORY_CONFIG).map(([key, category]) => (
					<CategoryGroup
						key={key}
						title={category.title}
						items={category.items}
					/>
				))}
			</Box>

			<Box display={{ mobile: 'none', laptop: 'block' }}>
				<Accordion type='multiple'>
					<Link
						href='/blog'
						className={styles.categoryLink({
							active: currentCat === null,
						})}
					>
						All
					</Link>

					<Accordion.Item>
						<Accordion.Trigger>{CATEGORY_CONFIG.dev.title}</Accordion.Trigger>
						<Accordion.Content>
							{CATEGORY_CONFIG.travel.items.map((item) => (
								<Link key={item.slug} href={item.slug}>
									<Accordion.Panel active={currentCat === item.slug}>
										{item.name}
										<Typography.SubText
											level={2}
											color='primary'
											background='primary50'
											paddingY='1'
											paddingX='2'
											display={{ mobile: 'none', tablet: 'block' }}
										>
											{categoryCounts?.[item.slug] ?? 0}
										</Typography.SubText>
									</Accordion.Panel>
								</Link>
							))}
						</Accordion.Content>
					</Accordion.Item>

					<Accordion.Item>
						<Accordion.Trigger>{CATEGORY_CONFIG.life.title}</Accordion.Trigger>
						<Accordion.Content>
							{CATEGORY_CONFIG.travel.items.map((item) => (
								<Link
									key={item.slug}
									href={`${pathname}?${createQueryString(item.slug)}`}
								>
									<Accordion.Panel active={currentCat === item.slug}>
										<span>{item.name}</span>
										<Typography.SubText
											level={2}
											color='primary'
											background='primary50'
											paddingY='1'
											paddingX='2'
											display={{ mobile: 'none', tablet: 'block' }}
										>
											{categoryCounts?.[item.slug] ?? 0}
										</Typography.SubText>
									</Accordion.Panel>
								</Link>
							))}
						</Accordion.Content>
					</Accordion.Item>

					<Accordion.Item>
						<Accordion.Trigger>
							{CATEGORY_CONFIG.travel.title}
						</Accordion.Trigger>
						<Accordion.Content>
							{CATEGORY_CONFIG.travel.items.map((item) => (
								<Link
									key={item.slug}
									href={`${pathname}?${createQueryString(item.slug)}`}
								>
									<Accordion.Panel active={currentCat === item.slug}>
										<span>{item.name}</span>
										<Typography.SubText
											level={2}
											color='primary'
											background='primary50'
											paddingY='1'
											paddingX='2'
											display={{ mobile: 'none', tablet: 'block' }}
										>
											{categoryCounts?.[item.slug] ?? 0}
										</Typography.SubText>
									</Accordion.Panel>
								</Link>
							))}
						</Accordion.Content>
					</Accordion.Item>
				</Accordion>
			</Box>
		</aside>
	);
};

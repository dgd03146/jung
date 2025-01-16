'use client';

import { Accordion } from '@jung/design-system';
import { useMediaQuery } from '@jung/shared/hooks';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useGetCategoryCounts } from '../api';
import { CATEGORY_CONFIG } from '../config/constants';
import { CategoryGroup } from './CategoryGroup';
import * as styles from './CategoryNav.css';

const DesktopView = () => {
	return (
		<aside className={styles.sidebar}>
			<CategoryGroup title='All' />
			{Object.entries(CATEGORY_CONFIG).map(([key, category]) => (
				<CategoryGroup
					key={key}
					title={category.title}
					items={category.items}
				/>
			))}
		</aside>
	);
};

const MobileView = () => {
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
									<span className={styles.count}>
										{categoryCounts?.[item.slug] ?? 0}
									</span>
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
									<span className={styles.count}>
										{categoryCounts?.[item.slug] ?? 0}
									</span>
								</Accordion.Panel>
							</Link>
						))}
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item>
					<Accordion.Trigger>{CATEGORY_CONFIG.travel.title}</Accordion.Trigger>
					<Accordion.Content>
						{CATEGORY_CONFIG.travel.items.map((item) => (
							<Link
								key={item.slug}
								href={`${pathname}?${createQueryString(item.slug)}`}
							>
								<Accordion.Panel active={currentCat === item.slug}>
									<span>{item.name}</span>
									<span className={styles.count}>
										{categoryCounts?.[item.slug] ?? 0}
									</span>
								</Accordion.Panel>
							</Link>
						))}
					</Accordion.Content>
				</Accordion.Item>
			</Accordion>
		</aside>
	);
};

const CategoryNavComponent = () => {
	const [isMounted, setIsMounted] = useState(false);
	const isDesktop = useMediaQuery('(max-width: 1024px)');

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return isDesktop ? <DesktopView /> : <MobileView />;
};

export const CategoryNav = dynamic(
	() => Promise.resolve(CategoryNavComponent),
	{
		ssr: true,
	},
);

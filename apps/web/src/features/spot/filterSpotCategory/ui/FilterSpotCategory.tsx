import { useTRPC } from '@/fsd/app';
import { createQueryString, useSearchParamsState } from '@/fsd/shared';
import { Box, Tag, Typography } from '@jung/design-system/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as styles from './FilterSpotCategory.css';

export const FilterSpotCategory = () => {
	const pathname = usePathname();
	const { cat } = useSearchParamsState({
		defaults: {
			cat: 'all',
		} as const,
	});

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
			<Link href={`${pathname}?${createQueryString('cat', 'all', 'all')}`}>
				<Tag variant='secondary' selected={cat === 'all'}>
					<Typography.SubText level={2} fontWeight='medium'>
						All
					</Typography.SubText>
				</Tag>
			</Link>
			{categories.map((category) => (
				<Link
					key={category.id}
					href={`${pathname}?${createQueryString('cat', category.name, 'all')}`}
				>
					<Tag
						variant='secondary'
						selected={category.name.toLowerCase() === cat.toLowerCase()}
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

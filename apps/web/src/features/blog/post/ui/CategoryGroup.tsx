import { Box, Button, Flex, Typography } from '@jung/design-system';
import type { GetCategorySubItem } from '@jung/shared/types';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import * as styles from './CategoryGroup.css';

interface CategoryGroupProps {
	title: string;
	items?: GetCategorySubItem[];
}

export const CategoryGroup = ({ title, items }: CategoryGroupProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentCat = searchParams.get('cat') || 'all';

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
		<Flex position='relative' marginBottom='4' flex='1' width='full'>
			{title === 'All' ? (
				<Link
					href={'/blog'}
					className={`${styles.categoryHeader} ${styles.categoryHeaderLink({
						active: currentCat === null,
					})}`}
				>
					<Typography.SubText level={2} fontWeight='medium'>
						{title}
					</Typography.SubText>
				</Link>
			) : (
				<>
					<Button
						className={styles.categoryHeader}
						onClick={() => setIsOpen(!isOpen)}
						type='button'
					>
						<Typography.SubText level={2} fontWeight='medium'>
							{title}
						</Typography.SubText>
						<IoChevronDown
							size={16}
							className={styles.chevronIcon({ isOpen })}
							aria-hidden='true'
						/>
					</Button>

					<Box className={styles.categoryContent({ isOpen })}>
						{items?.map((item) => (
							<Link
								key={item.id}
								href={`${pathname}?${createQueryString(item.id)}`}
								className={styles.categoryItem({
									active: currentCat === item.id,
								})}
							>
								<span className={styles.categoryName}>{item.name}</span>
								<span className={styles.categoryCount}>{item.postCount}</span>
							</Link>
						))}
					</Box>
				</>
			)}
		</Flex>
	);
};

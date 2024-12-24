'use client';

import { Box } from '@jung/design-system/components';
import { useDebounce } from '@jung/shared/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import * as styles from './SearchBar.css';
interface SearchBarProps {
	initialValue?: string;
}

export function SearchBar({ initialValue = '' }: SearchBarProps) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const [value, setValue] = useState(
		initialValue || searchParams.get('q') || '',
	);

	const debouncedValue = useDebounce(value, 300);

	const handleSearch = useCallback(
		(searchValue: string) => {
			const params = new URLSearchParams(searchParams.toString());

			if (searchValue) {
				params.set('q', searchValue);
			} else {
				params.delete('q');
			}

			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		},
		[pathname, router, searchParams],
	);

	useEffect(() => {
		handleSearch(debouncedValue);
	}, [debouncedValue, handleSearch]);

	return (
		<Box className={styles.container}>
			<Box className={styles.searchWrapper} boxShadow='primary'>
				<Box className={styles.iconWrapper}>
					<IoSearchOutline size={18} />
				</Box>
				<Box
					as='input'
					type='text'
					value={value}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setValue(e.target.value)
					}
					placeholder='Search...'
					className={styles.input}
					aria-label='Search input'
				/>
				{value && (
					<Box
						as='button'
						className={styles.clearButton}
						onClick={() => {
							setValue('');
						}}
						aria-label='Clear search'
					>
						<IoCloseOutline size={16} />
					</Box>
				)}
			</Box>
		</Box>
	);
}

'use client';

import { Box } from '@jung/design-system/components';
import { useDebounce } from '@jung/shared/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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

	const debouncedValue = useDebounce(value, 200);

	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString());
		if (debouncedValue) {
			params.set('q', debouncedValue);
		} else {
			params.delete('q');
		}

		const newUrl = `${pathname}?${params.toString()}`;
		if (window.location.pathname + window.location.search !== newUrl) {
			router.push(newUrl);
		}
	}, [debouncedValue, pathname, router, searchParams]);

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

							router.push(`${pathname}?${createQueryString('q', '')}`);
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

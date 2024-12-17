'use client';

import { Box } from '@jung/design-system/components';
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

	const [debouncedValue, setDebouncedValue] = useState(value);

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (value) {
				params.set(name, value);
			} else {
				params.delete(name);
			}
			return params.toString();
		},
		[searchParams],
	);

	// FIXME: Debounce 공용 훅으로 변경경
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, 300);

		return () => {
			clearTimeout(handler);
		};
	}, [value]);

	useEffect(() => {
		router.push(`${pathname}?${createQueryString('q', debouncedValue)}`);
	}, [debouncedValue, pathname, router, createQueryString]);

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
					placeholder='Search places or locations'
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

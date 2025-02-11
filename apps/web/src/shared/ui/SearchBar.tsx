'use client';

import { Box, Button, Input } from '@jung/design-system/components';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import { useSearch } from '../model/useSearch';
import * as styles from './SearchBar.css';

interface SearchBarProps {
	initialValue?: string;
}

export function SearchBar({ initialValue = '' }: SearchBarProps) {
	const { value, setValue } = useSearch(initialValue);

	return (
		<Box className={styles.searchWrapper} boxShadow='primary'>
			<Box className={styles.iconWrapper}>
				<IoSearchOutline size={18} />
			</Box>
			<Input
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
				<Button
					className={styles.clearButton}
					onClick={() => {
						setValue('');
					}}
					aria-label='Clear search'
				>
					<IoCloseOutline size={16} />
				</Button>
			)}
		</Box>
	);
}

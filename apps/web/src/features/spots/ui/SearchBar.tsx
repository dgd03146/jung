import { Box } from '@jung/design-system/components';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import * as styles from './SearchBar.css';

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
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
						onChange(e.target.value)
					}
					placeholder='Search places or locations'
					className={styles.input}
				/>
				{value && (
					<Box
						as='button'
						className={styles.clearButton}
						onClick={() => onChange('')}
						aria-label='Clear search'
					>
						<IoCloseOutline size={16} />
					</Box>
				)}
			</Box>
		</Box>
	);
}

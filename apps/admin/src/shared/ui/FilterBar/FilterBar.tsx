import type { ChangeEvent, ReactNode } from 'react';
import * as styles from './FilterBar.css';

interface FilterSelectOption {
	value: string;
	label: string;
}

interface FilterSelectProps {
	label: string;
	options: FilterSelectOption[];
	value: string;
	onChange: (value: string) => void;
}

const FilterSelect = ({
	label,
	options,
	value,
	onChange,
}: FilterSelectProps) => (
	<select
		className={styles.select}
		value={value}
		onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
		aria-label={label}
	>
		{options.map((opt) => (
			<option key={opt.value} value={opt.value}>
				{opt.label}
			</option>
		))}
	</select>
);

interface FilterBarProps {
	children: ReactNode;
}

const FilterBarRoot = ({ children }: FilterBarProps) => (
	<div className={styles.filterBar}>{children}</div>
);

interface FilterGroupProps {
	children: ReactNode;
}

const FilterGroup = ({ children }: FilterGroupProps) => (
	<div className={styles.filterGroup}>{children}</div>
);

interface ClearButtonProps {
	onClick: () => void;
}

const ClearButton = ({ onClick }: ClearButtonProps) => (
	<button type='button' className={styles.clearButton} onClick={onClick}>
		Clear filters
	</button>
);

export const FilterBar = Object.assign(FilterBarRoot, {
	Select: FilterSelect,
	Group: FilterGroup,
	Clear: ClearButton,
});

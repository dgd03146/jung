import {
	type ChangeEvent,
	type HTMLAttributes,
	forwardRef,
	useId,
} from 'react';

import { Box, Typography } from '..';
import { CheckIcon } from '../../icons';
import type { AtomProps } from '../../types/atoms';
import * as styles from './Checkbox.css';

export interface CheckboxProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	checked?: boolean;
}

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
	({ children, disabled, checked, onChange, ...restProps }, ref) => {
		const checkBoxId = useId();

		return (
			<Box as='div' display='inline-block' ref={ref} {...restProps}>
				<Box
					as='label'
					htmlFor={checkBoxId}
					className={styles.label({ disabled })}
				>
					<Box
						as='input'
						className={styles.input}
						type='checkbox'
						id={checkBoxId}
						data-testid='checkbox'
						disabled={disabled}
						checked={checked}
						aria-checked={checked}
						aria-disabled={disabled}
						aria-labelledby={checkBoxId}
						onChange={onChange}
					/>
					<Box as='div' className={styles.iconWrapper({ checked })}>
						{checked && <CheckIcon />}
					</Box>
					<Typography.FootNote color={disabled ? 'primary100' : 'primary'}>
						{children}
					</Typography.FootNote>
				</Box>
			</Box>
		);
	},
);

'use client';

import {
	type ChangeEvent,
	forwardRef,
	type HTMLAttributes,
	useEffect,
	useId,
	useRef,
} from 'react';
import { CheckIcon } from '../../icons';
import type { AtomProps } from '../../types/atoms';
import { Box, Typography } from '..';
import * as styles from './Checkbox.css';

export interface CheckboxProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	checked?: boolean;
	indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
	(
		{ children, disabled, checked, indeterminate, onChange, ...restProps },
		ref,
	) => {
		const checkBoxId = useId();
		const inputRef = useRef<HTMLInputElement>(null);

		useEffect(() => {
			if (inputRef.current) {
				inputRef.current.indeterminate = !!indeterminate;
			}
		}, [indeterminate]);

		return (
			<Box as='div' display='inline-block' ref={ref} {...restProps}>
				<Box
					as='label'
					htmlFor={checkBoxId}
					className={styles.label({ disabled })}
				>
					<input
						ref={inputRef}
						className={styles.input}
						type='checkbox'
						id={checkBoxId}
						data-testid='checkbox'
						disabled={disabled}
						checked={checked}
						aria-checked={indeterminate ? 'mixed' : checked}
						aria-disabled={disabled}
						onChange={onChange}
					/>
					<Box
						as='div'
						className={styles.iconWrapper({
							checked: checked || indeterminate,
						})}
					>
						{indeterminate ? (
							<Box
								as='span'
								display='block'
								style={{
									width: '10px',
									height: '2px',
									backgroundColor: 'currentColor',
								}}
							/>
						) : checked ? (
							<CheckIcon />
						) : null}
					</Box>
					<Typography.FootNote color={disabled ? 'primary100' : 'primary'}>
						{children}
					</Typography.FootNote>
				</Box>
			</Box>
		);
	},
);

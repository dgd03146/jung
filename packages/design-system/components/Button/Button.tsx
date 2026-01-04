import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import type { AtomProps } from '../../types/atoms';
import { Box } from '..';
import * as styles from './Button.css';

export interface ButtonProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'prefix' | 'color'>,
		AtomProps {
	variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
	size?: 'sm' | 'md' | 'lg' | 'zero';
	selected?: boolean;
	prefix?: ReactNode;
	suffix?: ReactNode;
	loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = 'primary',
			size = 'md',
			selected = false,
			disabled = false,
			prefix,
			suffix,
			loading = false,
			children,
			...restProps
		},
		ref,
	) => {
		return (
			<Box
				as='button'
				className={styles.button({
					variant,
					size,
					disabled,
					loading,
					selected,
				})}
				disabled={disabled || loading}
				aria-pressed={selected}
				aria-busy={loading}
				ref={ref}
				{...restProps}
			>
				{loading && <ClipLoader color={'#0142C0'} size={14} role='status' />}
				{prefix && prefix}
				{children}
				{suffix && suffix}
			</Box>
		);
	},
);

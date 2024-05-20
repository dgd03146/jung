import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import { button } from './Button.css';

export interface ButtonProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'prefix' | 'color'>,
		AtomProps {
	variant?: 'primary' | 'secondary' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	rounded?: boolean;
	prefix?: ReactNode;
	suffix?: ReactNode;
	loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant,
			size,
			rounded,
			disabled,
			prefix,
			suffix,
			loading,
			children,
			...restProps
		},
		ref,
	) => {
		return (
			<Box
				as='button'
				display='flex'
				alignItems='center'
				columnGap='1'
				className={button({ variant, size, rounded, disabled, loading })}
				disabled={disabled || loading}
				aria-busy={loading}
				ref={ref}
				{...restProps}
			>
				{loading && (
					<ClipLoader color={'#0142C0'} size={14} aria-hidden='true' />
				)}
				{prefix}
				{children}
				{suffix}
			</Box>
		);
	},
);

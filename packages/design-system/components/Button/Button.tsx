import { button } from './Button.css';

import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';

import { Box, Spinner } from '..';
import type { OmitAtomProps } from '../../types/atoms';

interface ButtonProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'prefix' | 'color'>,
		OmitAtomProps {
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
		const buttonClass = button({ variant, size, rounded, disabled, loading });

		return (
			<Box
				as='button'
				display='flex'
				alignItems='center'
				columnGap='1'
				className={buttonClass}
				disabled={disabled}
				ref={ref}
				{...restProps}
			>
				{loading && <Spinner />}
				{prefix}
				{children}
				{suffix}
			</Box>
		);
	},
);

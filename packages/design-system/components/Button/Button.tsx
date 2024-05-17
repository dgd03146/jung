import { Spinner } from '@nextui-org/spinner';
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import { button } from './Button.css';

interface Props
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'prefix' | 'color'>,
		AtomProps {
	variant?: 'primary' | 'secondary' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	rounded?: boolean;
	prefix?: ReactNode;
	suffix?: ReactNode;
	loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
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
				{loading && <Spinner aria-hidden='true' />}
				{prefix}
				{children}
				{suffix}
			</Box>
		);
	},
);

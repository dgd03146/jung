import { button } from './Button.css';

import {
	type ButtonHTMLAttributes,
	type PropsWithChildren,
	type ReactNode,
	forwardRef,
} from 'react';

import { Box, type BoxProps, Spinner } from '..';

interface Props
	extends PropsWithChildren<
		Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'prefix'>
	> {
	variant?: 'primary' | 'secondary' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	rounded?: boolean;
	prefix?: ReactNode;
	suffix?: ReactNode;
	loading?: boolean;
}

type ButtonProps = BoxProps<'button', Props>;
export type ButtonComponent = (props: ButtonProps) => ReactNode;

export const Button: ButtonComponent = forwardRef(
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
		ref?,
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

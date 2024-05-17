import { type InputHTMLAttributes, forwardRef } from 'react';
import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import * as S from './Input.css';

interface Props
	extends Omit<
			InputHTMLAttributes<HTMLInputElement>,
			'size' | 'width' | 'height' | 'color'
		>,
		AtomProps {
	variant?: 'primary' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	rounded?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(
	({ variant, disabled, size, rounded, ...restProps }, ref?) => {
		return (
			<Box
				as='input'
				className={S.input({ variant, size, rounded, disabled })}
				ref={ref}
				disabled={disabled}
				{...restProps}
			/>
		);
	},
);

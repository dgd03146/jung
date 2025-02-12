import { type InputHTMLAttributes, forwardRef } from 'react';
import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import * as S from './Input.css';

export interface InputProps
	extends Omit<
			InputHTMLAttributes<HTMLInputElement>,
			'size' | 'width' | 'height' | 'color'
		>,
		AtomProps {
	variant?: 'primary' | 'secondary' | 'ghost';
	size?: 'sm' | 'md' | 'lg' | 'zero';
	error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ variant, disabled, size, error, ...restProps }, ref?) => {
		return (
			<Box
				as='input'
				className={S.input({ variant, size, disabled, error })}
				ref={ref}
				disabled={disabled}
				{...restProps}
			/>
		);
	},
);

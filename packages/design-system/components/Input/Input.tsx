import { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { Box, type BoxProps } from '..';
import * as styles from './Input.css';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	variant?: 'primary' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	rounded?: boolean;
}

type InputProps = BoxProps<'input', Props>;
type InputComponent = (props: InputProps) => ReactNode;

export const Input: InputComponent = forwardRef(
	({ variant, disabled, size, rounded, ...restProps }, ref?) => {
		const inputStyle = styles.input({ variant, size, rounded, disabled });

		return (
			<Box
				as='input'
				className={inputStyle}
				ref={ref}
				disabled={disabled}
				{...restProps}
			/>
		);
	},
);

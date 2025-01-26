import { type TextareaHTMLAttributes, forwardRef } from 'react';
import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import * as S from './Textarea.css';

export interface TextareaProps
	extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'color'>,
		AtomProps {
	variant?: 'primary' | 'secondary' | 'ghost';
	size?: 'sm' | 'md' | 'lg' | 'base';
	rounded?: boolean;
	error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	(
		{ disabled, variant, size, rows, cols, rounded, error, ...restProps },
		ref?,
	) => {
		return (
			<Box
				as='textarea'
				className={S.textarea({ variant, size, rounded, disabled, error })}
				cols={cols || 30}
				rows={rows || 5}
				disabled={disabled}
				ref={ref}
				{...restProps}
			/>
		);
	},
);

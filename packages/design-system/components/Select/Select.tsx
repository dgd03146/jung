'use client';

import { type HTMLAttributes, forwardRef } from 'react';
import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import SelectProvider from './context/SelectProvider';

export interface SelectProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	placeHolder?: string;
	onValueChange?: (value: string) => void;
	defaultValue?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
	({ children, defaultValue, onValueChange, ...restProps }, ref?) => {
		const valueProps = {
			defaultValue,
			onValueChange,
		};

		return (
			<SelectProvider valueProps={valueProps}>
				<Box as='div' ref={ref} {...restProps}>
					{children}
				</Box>
			</SelectProvider>
		);
	},
);

import { forwardRef, type HTMLAttributes } from 'react';
import type { AtomProps } from '../../types/atoms';
import { Box } from '..';
import SelectProvider from './context/SelectProvider';

export interface SelectProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	placeHolder?: string;
	onValueChange?: (value: string) => void;
	defaultValue?: string;
}

export const SelectRoot = forwardRef<HTMLDivElement, SelectProps>(
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

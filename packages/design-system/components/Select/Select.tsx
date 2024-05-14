'use client';

import { type HTMLAttributes, forwardRef } from 'react';
import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import { SelectItem } from './SelectItem';
import { SelectLabel } from './SelectLabel';
import { SelectMenu } from './SelectMenu';
import SelectProvider from './SelectProvider';
import { SelectTrigger } from './SelectTrigger';

interface Props
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	placeHolder?: string;
	onValueChange?: (value: string) => void;
	defaultValue?: string;
}

const Select = forwardRef<HTMLDivElement, Props>(
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

const SelectCompound = Object.assign(Select, {
	Trigger: SelectTrigger,
	Menu: SelectMenu,
	Item: SelectItem,
	Label: SelectLabel,
});
export { SelectCompound as Select };

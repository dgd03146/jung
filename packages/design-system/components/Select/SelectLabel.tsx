import { forwardRef, type LabelHTMLAttributes } from 'react';
import type { AtomProps } from '../../types/atoms';
import { Box } from '..';

export interface Props
	extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'color'>,
		AtomProps {}

export const SelectLabel = forwardRef<HTMLLabelElement, Props>(
	({ children, ...restProps }, ref?) => {
		return (
			<Box as='label' id='label' ref={ref} {...restProps}>
				{children}
			</Box>
		);
	},
);

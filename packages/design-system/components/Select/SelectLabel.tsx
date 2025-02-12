import { type LabelHTMLAttributes, forwardRef } from 'react';

import { Box } from '..';
import type { AtomProps } from '../../types/atoms';

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

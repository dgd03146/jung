import { type HTMLAttributes, forwardRef } from 'react';

import { Box } from '..';
import type { AtomProps } from '../../types/atoms';

export interface Props
	extends Omit<HTMLAttributes<HTMLParagraphElement>, 'color'>,
		AtomProps {}

export const CardDescription = forwardRef<HTMLParagraphElement, Props>(
	({ children, ...restProps }, ref?) => {
		return (
			<Box ref={ref} {...restProps}>
				{children}
			</Box>
		);
	},
);

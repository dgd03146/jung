import { forwardRef, type HTMLAttributes } from 'react';
import type { AtomProps } from '../../types/atoms';
import { Box } from '..';

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

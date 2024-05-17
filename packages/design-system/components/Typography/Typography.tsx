import { Box } from 'components/Box/Box';
import { type HTMLAttributes, forwardRef } from 'react';
import type { AtomProps } from 'types/atoms';

export interface TypographyProps
	extends Omit<HTMLAttributes<HTMLElement>, 'color'>,
		AtomProps {}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
	({ children, ...restProps }, ref) => {
		return (
			<Box as='article' ref={ref} {...restProps}>
				{children}
			</Box>
		);
	},
);

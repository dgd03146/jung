import { forwardRef } from 'react';
import { Box } from '..';
import type { CardProps } from './types/card';

export interface Props extends CardProps {}

export const CardActions = forwardRef<HTMLDivElement, Props>(
	({ children, ...restProps }, ref?) => {
		return (
			<Box
				as='div'
				display='flex'
				columnGap='1'
				alignItems='center'
				ref={ref}
				{...restProps}
			>
				{children}
			</Box>
		);
	},
);

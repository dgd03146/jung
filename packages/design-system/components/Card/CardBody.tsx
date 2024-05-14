import { forwardRef } from 'react';
import { Box } from '..';
import type { CardProps } from './types/card';

export interface Props extends CardProps {}

export const CardBody = forwardRef<HTMLDivElement, Props>(
	({ children, ...restProps }, ref) => {
		return (
			<Box
				as='div'
				display='flex'
				flexDirection='column'
				rowGap='1'
				ref={ref}
				{...restProps}
			>
				{children}
			</Box>
		);
	},
);

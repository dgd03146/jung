import { type HTMLAttributes, forwardRef } from 'react';
import { Box } from '..';
import type { AtomProps } from '../../types/atoms';

interface Props
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {}

export const Divider = forwardRef<HTMLDivElement, Props>(
	({ ...restProps }, ref?) => {
		return (
			<Box
				as='div'
				borderWidth='hairline'
				borderColor='primary'
				borderStyle='solid'
				borderTopWidth='hairline'
				ref={ref}
				{...restProps}
			/>
		);
	},
);

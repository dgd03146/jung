import { type HTMLAttributes, forwardRef } from 'react';

import { Box, type BoxProps } from '..';

interface Props extends HTMLAttributes<HTMLDivElement> {}

type DividerProps = BoxProps<'div', Props>;
type DividerComponent = (props: DividerProps) => React.ReactNode;

export const Divider: DividerComponent = forwardRef(
	({ ...restProps }, ref?) => {
		return (
			<Box
				as='div'
				borderWidth='hairline'
				borderColor='primary'
				borderStyle='solid'
				ref={ref}
				{...restProps}
			/>
		);
	},
);

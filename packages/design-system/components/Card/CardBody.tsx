import { type HTMLAttributes, forwardRef } from 'react';

import { Box, type BoxProps } from '..';

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

type CardBodyWithBoxProps = BoxProps<'div', CardBodyProps>;
type CardBodyComponent = (props: CardBodyWithBoxProps) => React.ReactNode;

export const CardBody: CardBodyComponent = forwardRef(
	({ children, ...restProps }, ref?) => {
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

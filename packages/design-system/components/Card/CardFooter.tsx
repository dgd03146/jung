import { type HTMLAttributes, forwardRef } from 'react';

import { Box, type BoxProps } from '..';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

type CardFooterWithBoxProps = BoxProps<'div', CardFooterProps>;
type CardFooterComponent = (props: CardFooterWithBoxProps) => React.ReactNode;

export const CardFooter: CardFooterComponent = forwardRef(
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

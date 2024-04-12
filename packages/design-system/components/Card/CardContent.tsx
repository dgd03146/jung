import { type HTMLAttributes, forwardRef } from 'react';

import { Box, type BoxProps } from '..';

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

type CardContentWithBoxProps = BoxProps<'div', CardContentProps>;
type CardContentComponent = (props: CardContentWithBoxProps) => React.ReactNode;

export const CardContent: CardContentComponent = forwardRef(
	({ children, ...restProps }, ref?) => {
		return (
			<Box
				as='div'
				display='flex'
				flexDirection='column'
				rowGap='1'
				padding='2.5'
				ref={ref}
				{...restProps}
			>
				{children}
			</Box>
		);
	},
);

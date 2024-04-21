import { type HTMLAttributes, forwardRef } from 'react';
import { Box, type BoxProps } from '..';

type Heading = 'h1' | 'h2' | 'h3' | 'h4';

interface HeadingProps extends HTMLAttributes<HTMLHeadElement> {
	text?: string;
	as?: Heading;
}

type HeadingPropsWithBox = BoxProps<Heading, HeadingProps>;

type HeadingComponent = (props: HeadingPropsWithBox) => React.ReactNode;

export const Heading: HeadingComponent = forwardRef(
	({ as, text, children, ...restProps }, ref?) => {
		return (
			<Box as={as || 'h1'} ref={ref} {...restProps}>
				{text}
				{children}
			</Box>
		);
	},
);

import { type HTMLAttributes, forwardRef } from 'react';
import { Box } from '..';

import type { AtomProps } from '../../types/atoms';

type Heading = 'h1' | 'h2' | 'h3' | 'h4';

interface Props
	extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>,
		AtomProps {
	text?: string;
	as?: Heading;
}

export const Heading = forwardRef<HTMLHeadingElement, Props>(
	({ as, text, children, ...restProps }, ref) => {
		return (
			<Box as={as || 'h1'} ref={ref} {...restProps}>
				{text}
				{children}
			</Box>
		);
	},
);

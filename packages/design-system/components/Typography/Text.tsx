import { type HTMLAttributes, forwardRef } from 'react';
import { Box } from '..';

import type { AtomProps } from '../../types/atoms';

type Text = 'span' | 'p';

interface Props
	extends Omit<HTMLAttributes<HTMLParagraphElement | HTMLSpanElement>, 'color'>,
		AtomProps {
	text?: string;
	as?: Text;
}

export const Text = forwardRef<HTMLParagraphElement, Props>(
	({ as, text, children, ...restProps }, ref) => {
		return (
			<Box as={as || 'p'} ref={ref} {...restProps}>
				{text}
				{children}
			</Box>
		);
	},
);

import { type HTMLAttributes, forwardRef } from 'react';

import { Typography } from '..';
import type { AtomProps } from '../../types/atoms';

export interface Props
	extends Omit<HTMLAttributes<HTMLParagraphElement>, 'color'>,
		AtomProps {
	level?: 1 | 2 | 3;
}

export const CardTitle = forwardRef<HTMLParagraphElement, Props>(
	({ children, level, ...restProps }, ref) => {
		return (
			<Typography.Text level={level || 1} ref={ref} {...restProps}>
				{children}
			</Typography.Text>
		);
	},
);

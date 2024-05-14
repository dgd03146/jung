import { type LiHTMLAttributes, type ReactNode, forwardRef } from 'react';

import { Box } from '..';
import type { AtomProps } from '../../types/atoms';

interface Props
	extends Omit<LiHTMLAttributes<HTMLLIElement>, 'prefix' | 'color'>,
		AtomProps {
	prefix?: ReactNode;
	suffix?: ReactNode;
}

export const ListItem = forwardRef<HTMLLIElement, Props>(
	({ prefix, suffix, children, ...restProps }, ref) => {
		return (
			<Box as='li' display='flex' columnGap='1' ref={ref} {...restProps}>
				{prefix}
				{children}
				{suffix}
			</Box>
		);
	},
);
